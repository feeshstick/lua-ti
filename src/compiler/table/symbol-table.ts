import {Container, ExpressionContainer} from "../components/container-types.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {Injectable} from "./injector/Injector.js";


export enum SymbolAttribute {
    Undefined,
    FunctionBody,
    Function,
    ParameterDeclaration
}

export abstract class AbstractTable {
    private static tid_c: number = 0
    public readonly tid: number
    
    public attribute: SymbolAttribute = SymbolAttribute.Undefined
    
    protected readonly entries: Map<string, _Symbol> = new Map()
    
    public abstract readonly parent?: _Symbol | SymbolTable
    protected injectable: Injectable | undefined
    
    protected constructor() {
        this.tid = AbstractTable.tid_c++
    }
    
    setInjectable(injectable: Injectable) {
        this.injectable = injectable
    }
    
    lookup(name: string): _Symbol | undefined {
        if (this.entries.has(name)) {
            return this.entries.get(name)!
        } else if (this.parent) {
            return this.parent.lookup(name)
        } else {
            return undefined
        }
    }
    
    has(name: string) {
        return this.entries.has(name)
    }
    
    enter(name: string, symbol: _Symbol): _Symbol {
        if (this.entries.has(name)) {
            throw new Error()
        } else {
            if (this.injectable && this.injectable.isInjector()) {
                if (this.injectable.entries.has(name)) {
                    symbol.setInjectable(this.injectable.entries.get(name)!)
                }
            }
            this.entries.set(name, symbol)
            symbol.setParent(this as never)
            return symbol
        }
    }
}

export class _Symbol extends AbstractTable {
    
    private _parent: _Symbol | SymbolTable | undefined
    public readonly declarations: Container[]
    public readonly accessor: [Container, _Symbol][] = []
    public table: SymbolTable | undefined
    public readonly properties: {
        
        onBeforeParentInit?: (parent: SymbolTable | _Symbol) => void
        onAfterParentInit?: (parent: SymbolTable | _Symbol) => void
        
        onAccess: (container: Container) => _Symbol
        onAssign: (variables: ExpressionContainer[]) => void
        
        allowCustomMember?: boolean
        
        symbolConstructor: (container: Container) => _Symbol
        
        isList?: boolean
        
    } = {
        symbolConstructor: (container: Container) => new _Symbol(container),
        onAccess: (container) => {
            return this.properties.symbolConstructor(container)
        },
        onAssign: (variables) => {
        
        }
    }
    
    constructor(
        ...declarations: Container[]
    ) {
        super()
        this.declarations = declarations
    }
    
    override setInjectable(injection: Injectable) {
        super.setInjectable(injection)
        if (this.injectable && this.injectable.isInjection()) {
            this.injectable.emitSetInjection(this)
        }
    }
    
    get parent(): _Symbol | SymbolTable | undefined {
        return this._parent
    }
    
    setParent(parent: _Symbol | SymbolTable) {
        if (this.properties.onBeforeParentInit) {
            this.properties.onBeforeParentInit(parent)
        }
        this._parent = parent
        if (this.properties.onAfterParentInit) {
            this.properties.onAfterParentInit(parent)
        }
    }
    
    access(container: Container): _Symbol {
        const symbol = this.properties.onAccess(container)
        this.accessor.push([container, symbol])
        return symbol
    }
    
    setEntries(entries: Map<string, _Symbol>) {
        for (let [key, value] of entries) {
            this.entries.set(key, value)
        }
    }
    
    isList(): boolean {
        return !!this.properties.isList
    }
    
    assign(variables: ExpressionContainer[]) {
        this.properties.onAssign(variables)
    }
}

export class SymbolTable extends AbstractTable {
    private readonly _escapeReturnList: ReturnStatementContainer[] = []
    private readonly _escapeExitList: ReturnStatementContainer[] = []
    
    constructor(
        public readonly parent?: SymbolTable
    ) {
        super()
    }
    
    create(): SymbolTable {
        return new SymbolTable(this)
    }
    
    get global(): SymbolTable {
        if (this.parent) {
            return this.parent
        } else {
            return this
        }
    }
    
    escapeReturn(container: ReturnStatementContainer) {
        if (this.attribute === SymbolAttribute.FunctionBody) {
            this._escapeReturnList.push(container)
        } else if (this.parent) {
            this.parent.escapeReturn(container)
        } else {
            this._escapeExitList.push(container)
        }
    }
    
    asSymbol(): _Symbol {
        const symbol = new _Symbol()
        symbol.setEntries(this.entries)
        return symbol
    }
    
}