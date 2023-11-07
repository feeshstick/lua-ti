import chalk from "chalk";
import {NamedType, Primitive, StaticTypeComparison, Type} from "../type/type-system.js";

export enum EntryKind {
    VariableEntry,
    ParameterEntry,
    ReturnEntry,
    FunctionEntry
}

export interface Entry<E extends EntryKind> {
    readonly kind: E
    
    print(out: (text: string) => void, context?: any)
}

export type SymbolEntryKind = EntryKind.ParameterEntry | EntryKind.VariableEntry

export abstract class AbstractSymbolEntry<E extends SymbolEntryKind> implements Entry<E> {
    public abstract readonly kind: E
    public functionEntry: FunctionEntry | undefined
    public type: Type = Primitive.Any
    
    constructor(
        public readonly members: Map<string, SymbolEntry> = new Map<string, SymbolEntry>()
    ) {
    }
    
    enter<E extends SymbolEntry>(key: string, entry: E) {
        this.members.set(key, entry)
        return entry
    }
    
    print(out, context) {
        if (this.functionEntry) {
            this.functionEntry.print(out)
        } else {
            if (this.members.size > 0) {
                for (let [key, value] of this.members) {
                    out(context.isStatic
                        ? chalk.hex('#EFC090')(key)
                        : chalk.hex('#BED6FF')(key)
                        + ` [${EntryKind[value.kind]}]`)
                    value.print(text => out('    ' + text), context)
                }
            } else {
                out('type: ' + this.type.asString)
            }
        }
    }
    
    isVariable(): this is VariableEntry {
        return this.kind === EntryKind.VariableEntry
    }
    
    isParameter(): this is ParameterEntry {
        return this.kind === EntryKind.ParameterEntry
    }
    
    /**
     * lookup entry, if it exists it must be `E['kind']`
     * returns that type as E | undefined
     * @param name
     * @param kind Expected Type, if lookup kind doesn't match kind throws Error
     * @throws Error
     */
    lookupExpectTypeOrUndefined<E extends SymbolEntry>(name: string, kind: E['kind']): E | undefined {
        const entry = this.lookup(name)
        if (entry) {
            if (entry.kind === kind) {
                return entry as E
            } else {
                console.error('expected-type=' + EntryKind[kind] + ' actual-type=' + EntryKind[entry.kind])
                throw new Error()
            }
        } else {
            return undefined
        }
    }
    
    lookup(name: string): SymbolEntry | undefined {
        return this.members.get(name)
    }
}

export class VariableEntry extends AbstractSymbolEntry<EntryKind.VariableEntry> {
    public readonly kind = EntryKind.VariableEntry
    
    static from(entry: FunctionEntry): VariableEntry {
        const variable = new VariableEntry()
        variable.functionEntry = entry
        return variable
    }
    
    constructor(
        member?: Map<string, VariableEntry>,
        type?: Type
    ) {
        super(member);
        this.type = type || Primitive.Any
    }
    
}

interface ParameterEntryConfig {
    offset?: number;
    optional?: boolean;
    type?: Type
}

export class ParameterEntry extends AbstractSymbolEntry<EntryKind.ParameterEntry> {
    public readonly kind = EntryKind.ParameterEntry
    
    public offset: number = 0;
    
    public optional: boolean = false;
    
    constructor({offset = 0, optional = false, type = Primitive.Any}: ParameterEntryConfig) {
        super();
        this.optional = optional;
        this.offset = offset;
        this.type = type
    }
    
    override print(out: (text: string) => void) {
        out('  offset = ' + this.offset)
    }
}

export class FunctionEntry implements Entry<EntryKind.FunctionEntry> {
    public readonly kind = EntryKind.FunctionEntry
    
    constructor(
        public readonly parameter: Map<string, ParameterEntry> = new Map<string, ParameterEntry>(),
        public readonly returns: ReturnEntry[]
    ) {
        for (let returnEntry of returns) {
            returnEntry._fromRef = this
        }
    }
    
    getParameterAtOffset(offset: number) {
        for (let [key, value] of this.parameter) {
            if (value.offset === offset) {
                return value
            }
        }
        return undefined
    }
    
    print(out: (text: string) => void) {
        out(`(${
            Array.from(this.parameter.entries())
                .map(([key, val]) => `${key} : ${
                    val.type.asString
                }`).join(', ')
        }) => ${
            this.returns.length === 0
                ? 'void'
                : this.returns.length === 1
                    ? this.returns[0].entry.type.asString
                    : this.returns.map(x => x.entry.type.asString)
        }`)
    }
    
}

export class ReturnEntry implements Entry<EntryKind.ReturnEntry> {
    public readonly kind = EntryKind.ReturnEntry
    public _fromRef!: FunctionEntry
    
    constructor(
        public readonly entry: SymbolEntry = new VariableEntry(),
        public readonly type: Type = Primitive.Any
    ) {
    }
    
    print(out: (text: string) => void) {
    }
}

export type EntryLike =
    | FunctionEntry
    | ReturnEntry
    | SymbolEntry

export type SymbolEntry =
    | VariableEntry
    | ParameterEntry

export class SymbolTable {
    protected readonly local: Map<string, SymbolEntry> = new Map<string, SymbolEntry>()
    protected readonly global: Map<string, SymbolEntry>
    
    constructor(
        public readonly parent?: SymbolTable
    ) {
        if (!this.parent) {
            this.global = new Map<string, SymbolEntry>()
        } else {
            this.global = this.parent.global
        }
    }
    
    initializeEnvironment() {
        if (this.parent) {
            console.error('local environments not supported.')
            throw new Error()
        }
    }
    
    createSymbolTable() {
        return new SymbolTable(this)
    }
    
    createFunctionBody(
        signature: FunctionEntry
    ) {
        return new FunctionBodyTable(this, signature)
    }
    
    lookup(name: string): SymbolEntry | undefined {
        return this.local.get(name)
            || this.parent?.lookup(name)
            || this.global.get(name)
    }
    
    lookupLocal(name: string): SymbolEntry | undefined {
        return this.local.get(name)
    }
    
    /**
     * lookup entry, if it exists it must be `E['kind']`
     * returns that type as E | undefined
     * @param name
     * @param kind Expected Type, if lookup kind doesn't match kind throws Error
     * @throws Error
     */
    lookupExpectTypeOrUndefined<E extends SymbolEntry>(name: string, kind: E['kind']): E | undefined {
        const entry = this.lookup(name)
        if (entry) {
            if (entry.kind === kind) {
                return entry as E
            } else {
                console.error('expected-type=' + EntryKind[kind] + ' actual-type=' + EntryKind[entry.kind])
                throw new Error()
            }
        } else {
            return undefined
        }
    }
    
    enter<E extends SymbolEntry>(name: string, entry: E, isLocal: boolean): E {
        if (isLocal) {
            return this.enterLocal(name, entry)
        } else {
            return this.enterGlobal(name, entry)
        }
    }
    
    enterLocal<E extends SymbolEntry>(name: string, entry: E): E {
        this.local.set(name, entry)
        return entry
    }
    
    enterGlobal<E extends SymbolEntry>(name: string, entry: E): E {
        this.global.set(name, entry)
        return entry
    }
    
    print() {
        if (this.parent) {
            this.parent.print()
            this.printLocalTable(text => console.log(text))
        } else {
            this._print(text => console.log(text))
        }
    }
    
    _print(out: (text: string) => void) {
        if (!this.parent) {
            out('<global>')
            for (let [key, value] of this.global) {
                out(chalk.hex('#EFC090')(key) + ` [${EntryKind[value.kind]}]`)
                value.print(text => out('    ' + text), {isStatic: true})
            }
        }
        this.printLocalTable(out)
    }
    
    private printLocalTable(out: (text: string) => void) {
        if (this.local.size === 0) return
        console.log('<local>')
        for (let [key, value] of this.local) {
            out(chalk.hex('#BED6FF')(key) + ` [${EntryKind[value.kind]}]`)
            value.print(text => out('    ' + text), {isStatic: false})
        }
    }
    
    isFunctionTable(): this is FunctionBodyTable {
        return false
    }
    
    // resolveSuperType(name: string) {
    //     console.log('find super type ' + name)
    //     const types: [string, Map<string, SymbolEntry>][] = []
    //     for (let [key, value] of this.global) {
    //         if (value.kind === EntryKind.VariableEntry) {
    //             if (value.members.has(name)) {
    //                 types.push([key, value.members])
    //             }
    //         }
    //     }
    //     return types
    // }
    /**
     *
     */
    getGlobalSelfReferencingFunctions() {
        console.warn(this.getGlobalSelfReferencingFunctions.name, '[WARN] : search is shallow, wip')
        const results: [string, string, SymbolEntry][] = []
        for (let [key, value] of this.global) {
            if (value.members) {
                for (let [memberKey, memberValue] of value.members) {
                    if (memberValue.functionEntry) {
                        const parameter = memberValue.functionEntry.getParameterAtOffset(0)
                        if (parameter) {
                            if (parameter.type.compareStatic(new NamedType(key)) === StaticTypeComparison.Equal) {
                                results.push([key, memberKey, memberValue])
                            }
                        }
                    }
                }
            }
        }
        return results
    }
}

export class FunctionBodyTable extends SymbolTable {
    constructor(
        parent: SymbolTable,
        public readonly entry: FunctionEntry
    ) {
        super(parent);
    }
    
    override lookupLocal(name: string): SymbolEntry | undefined {
        return this.local.get(name)
            || this.entry.parameter.get(name)
    }
    
    override lookup(name: string): SymbolEntry | undefined {
        return this.local.get(name)
            || this.entry.parameter.get(name)
            || this.parent?.lookup(name)
            || this.global.get(name)
    }
    
    override isFunctionTable(): this is FunctionBodyTable {
        return true
    }
}