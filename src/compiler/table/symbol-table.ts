import {Container, ExpressionContainer} from "../components/container-types.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {Injectable} from "./injector/Injector.js";
import {StringBuilder} from "../utility/string-builder.js";
import {LuaTiErrorHelper} from "../error/lua-ti-error.js";
import {VariableContainer} from "../components/nodes/expression/variable-container.js";
import {AssignContainer} from "../components/nodes/statement/assign/assign-container.js";


export enum SymbolAttribute {
    Undefined,
    FunctionBody,
    Function,
    ParameterDeclaration,
    UpValue,
}

export abstract class AbstractTable {
    private static tid_c: number = 0
    public readonly tid: number
    
    public attribute: SymbolAttribute = SymbolAttribute.Undefined
    
    protected readonly entries: Map<string, Token> = new Map()
    
    public abstract readonly parent?: Token | SymbolTable
    protected injectable: Injectable | undefined
    
    protected constructor() {
        this.tid = AbstractTable.tid_c++
    }
    
    setInjectable(injectable: Injectable) {
        this.injectable = injectable
    }
    
    lookup(name: string): Token | undefined {
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
    
    enter(name: string, symbol: Token): Token {
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

export class Token extends AbstractTable {
    
    private _parent: Token | SymbolTable | undefined
    public readonly declarations: Container[]
    public readonly accessor: [Container, Token][] = []
    public table: SymbolTable | undefined
    public readonly properties: {
        instance?: any;
        immutable?: boolean
        
        onBeforeParentInit?: (parent: SymbolTable | Token) => void
        onAfterParentInit?: (parent: SymbolTable | Token) => void
        
        onAccess: (container: Container) => Token
        onAssign: (variables: ExpressionContainer[]) => void
        
        allowCustomMember?: boolean
        
        symbolConstructor: (container: Container) => Token
        
        isList?: boolean
        
    } = {
        symbolConstructor: (container: Container) => new Token(container),
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
    
    get parent(): Token | SymbolTable | undefined {
        return this._parent
    }
    
    setParent(parent: Token | SymbolTable) {
        if (this.properties.onBeforeParentInit) {
            this.properties.onBeforeParentInit(parent)
        }
        this._parent = parent
        if (this.properties.onAfterParentInit) {
            this.properties.onAfterParentInit(parent)
        }
    }
    
    access(container: Container): Token {
        const symbol = this.properties.onAccess(container)
        this.accessor.push([container, symbol])
        return symbol
    }
    
    setEntries(entries: Map<string, Token>) {
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
    
    getText(out: StringBuilder) {
        out.namedBlock('token tid=' + this.tid, () => {
            out.namedBlock('properties:', () => {
                out.println('└ attribute', SymbolAttribute[this.attribute])
                if (typeof this.properties.instance !== 'undefined') out.println('└ instance',this.properties.instance)
            })
            if (this.entries.size > 0) {
                out.namedBlock('member', () => {
                    for (let [key, value] of this.entries) {
                        out.namedBlock(key, () => {
                            value.getText(out)
                        })
                    }
                })
            }
            out.namedBlock('declarations', () => {
                for (let i = 0; i < this.declarations.length; i++) {
                    let declaration = this.declarations[i];
                    out.println(i, `${LuaTiErrorHelper.location(declaration)}`)
                }
            })
            if (this.accessor.length > 0) {
                out.namedBlock('accessor', () => {
                    for (let [key, value] of this.accessor) {
                        out.namedBlock(key.text, () => {
                            value.getText(out)
                        })
                    }
                })
            }
        })
    }
    
    setInstances(obj: any) {
        if (typeof obj === 'object' && obj) {
            for (let key of Object.keys(obj)) {
                this.lookup(key)?.setInstances(obj[key])
            }
        }
        this.properties.instance = obj
    }
}

export class SymbolTable extends AbstractTable {
    private readonly _escapeReturnList: ReturnStatementContainer[] = []
    private readonly _escapeExitList: ReturnStatementContainer[] = []
    private readonly _children: [Container, SymbolTable][] = []
    private readonly _assignments: [AssignContainer, VariableContainer[], ExpressionContainer][] = []
    
    constructor(
        public readonly parent?: SymbolTable,
        public readonly declaration?: Container
    ) {
        super()
    }
    
    create(container: Container): SymbolTable {
        const child = new SymbolTable(this, container)
        this._children.push([container, child])
        return child
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
    
    asSymbol(): Token {
        const symbol = new Token()
        symbol.setEntries(this.entries)
        return symbol
    }
    
    getText(out: StringBuilder) {
        const declarationPath = this.declaration ? LuaTiErrorHelper.location(this.declaration) : undefined
        out.namedBlock('table tid=' + this.tid + (declarationPath ? ' ' + declarationPath : ''), () => {
            out.namedBlock('properties', () => {
                out.println('└ attribute', SymbolAttribute[this.attribute])
            })
            if (this.entries.size !== 0) {
                out.namedBlock('entries', () => {
                    for (let [key, value] of this.entries) {
                        out.namedBlock(key, () => {
                            value.getText(out)
                        })
                    }
                })
            }
            if (this._children.length > 0) {
                out.namedBlock('child-tables', () => {
                    for (let i = 0; i < this._children.length; i++) {
                        let [, child] = this._children[i];
                        child.getText(out)
                    }
                })
            }
            if (this._assignments.length > 0) {
                out.namedBlock('assignments', () => {
                    for (let i = 0; i < this._assignments.length; i++) {
                        let [assignContainer, variables, expression] = this._assignments[i];
                        if (variables.length === 1) {
                            out.println(i, variables[0].text + ' = ' + expression.text)
                        } else {
                            out.println(i, '[' + variables.map(x => x.text) + ']' + ' = ' + expression.text)
                        }
                    }
                })
            }
        })
    }
    
    clear() {
        this.entries.clear()
        this._children.splice(0, this._children.length)
        this.attribute = SymbolAttribute.UpValue
    }
    
    enterAssignment(container: AssignContainer, param: VariableContainer[], expression: ExpressionContainer) {
        this._assignments.push([container, param, expression])
    }
    
    getAssignmentsByContainer(container: AssignContainer): SymbolTable['_assignments'] {
        return this._assignments.filter(x => x[0].id === container.id)
    }
    
    getAssignments() {
        return this._assignments
    }
    
    setInstances(Env: Object) {
        for (let key of Object.keys(Env)) {
            if (this.has(key)) {
                this.lookup(key)!.setInstances(Env[key])
            }
        }
    }
}