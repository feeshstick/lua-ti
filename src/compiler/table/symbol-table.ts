import {Container} from "../components/container-types.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";


export enum SymbolAttribute {
    Undefined,
    FunctionBody,
    Function,
    FunctionMember,
    Member,
    Table
}

export abstract class AbstractTable {
    private static tid_c: number = 0
    public readonly tid: number
    
    private _attribute: SymbolAttribute = SymbolAttribute.Undefined
    
    protected readonly entries: Map<string, _Symbol> = new Map()
    
    public abstract readonly parent?: _Symbol | SymbolTable
    
    protected constructor() {
        this.tid = AbstractTable.tid_c++
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
    
    enter(name: string, symbol: _Symbol): _Symbol {
        if (this.entries.has(name)) {
            throw new Error()
        } else {
            this.entries.set(name, symbol)
            symbol.setParent(this as never)
            return symbol
        }
    }
    
    set attribute(attribute: SymbolAttribute) {
        this._attribute = attribute
    }
    
    get attribute() {
        return this._attribute
    }
}

export class _Symbol extends AbstractTable {
    private _parent: _Symbol | SymbolTable | undefined
    public readonly declarations: Container[]
    public readonly accessor: [Container, _Symbol][] = []
    public table: SymbolTable | undefined
    
    constructor(
        ...declarations: Container[]
    ) {
        super()
        this.declarations = declarations
    }
    
    get parent(): _Symbol | SymbolTable | undefined {
        return this._parent
    }
    
    setParent(parent: _Symbol | SymbolTable) {
        this._parent = parent
    }
    
    access(container: Container): _Symbol {
        const symbol = new _Symbol()
        this.accessor.push([container, symbol])
        return symbol
    }
    
    setEntries(entries: Map<string, _Symbol>) {
        for (let [key, value] of entries) {
            this.entries.set(key, value)
        }
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