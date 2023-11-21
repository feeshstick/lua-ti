import {Container, ExpressionContainer, ParameterContainer} from "../components/container-types.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {StringBuilder} from "../utility/string-builder.js";
import {LuaTiErrorHelper} from "../error/lua-ti-error.js";
import {VariableContainer} from "../components/nodes/expression/variable-container.js";
import {AssignContainer} from "../components/nodes/statement/assign/assign-container.js";
import chalk from "chalk";


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
    
    protected constructor() {
        this.tid = AbstractTable.tid_c++
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
            this.entries.set(name, symbol)
            symbol.setParent(this as never)
            return symbol
        }
    }
}

interface FunctionTypeGuide {
    type: 'function'
    parameter: (...args: ParameterContainer[]) => void
}

export type TypeGuide =
    | [string, TypeGuide]
    | FunctionTypeGuide

export class Token extends AbstractTable {
    
    private _parent: Token | SymbolTable | undefined
    public readonly declarations: Container[]
    public table: SymbolTable | undefined
    public readonly properties: {
        typeGuide?: TypeGuide[]
        immutable?: boolean
        instance?: any
        type?: string
    } = {}
    
    constructor(
        ...declarations: Container[]
    ) {
        super()
        this.declarations = declarations
    }
    
    override enter(name: string, symbol: Token): Token {
        const token = super.enter(name, symbol)
        if (this.properties.typeGuide) {
            for (let entry of this.properties.typeGuide) {
                if (entry instanceof Array && name === entry[0]) {
                    token.properties.typeGuide = [entry[1]]
                }
            }
        }
        return token
    }
    
    get parent(): Token | SymbolTable | undefined {
        return this._parent
    }
    
    setParent(parent: Token | SymbolTable) {
        this._parent = parent
    }
    
    setEntries(entries: Map<string, Token>) {
        for (let [key, value] of entries) {
            this.entries.set(key, value)
        }
    }
    
    getText(out: StringBuilder) {
        out.namedBlock('token tid=' + this.tid, () => {
            out.namedBlock('properties:', () => {
                out.println('└ attribute', SymbolAttribute[this.attribute])
                if (typeof this.properties.instance !== 'undefined') {
                    const instance = this.properties.instance
                    const instanceString = instance.toString()
                    if (instanceString.includes('\n')) {
                        out.println('└ instance')
                        if (typeof this.properties.instance === 'function') {
                            out.printBypassIndent(chalk.yellowBright(instanceString))
                        } else {
                            out.printBypassIndent(chalk.yellowBright(instanceString))
                        }
                    } else {
                        if(typeof instance === 'object'){
                            out.println('└ instance', chalk.yellowBright(JSON.stringify(instance)))
                        } else {
                            out.println('└ instance', chalk.yellowBright(instanceString))
                        }
                    }
                    out.println(`└ ${chalk.italic('typeof')} instance`, typeof instance)
                }
                if (this.properties.type) out.println(`└ type`, this.properties.type)
                if (this.properties.typeGuide) {
                    out.println('└ type-guide', JSON.stringify(this.properties.typeGuide, (key, value) => {
                        if (typeof value === 'function') {
                            return value.toString().replace(/\s+/gm, ' ')
                        } else {
                            return value
                        }
                    }))
                }
            })
            if (this.entries.size > 0) {
                out.namedBlock('member', () => {
                    for (let [key, value] of this.entries) {
                        out.namedBlock(chalk.bold.cyanBright(key), () => {
                            value.getText(out)
                        })
                    }
                })
            }
            if (this.declarations.length > 0) {
                out.namedBlock('declarations', () => {
                    for (let i = 0; i < this.declarations.length; i++) {
                        let declaration = this.declarations[i];
                        out.println(i, `${LuaTiErrorHelper.location(declaration)}`)
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
                        out.namedBlock(chalk.bold.cyanBright.underline(key), () => {
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
    
    getAssignmentsByContainerDeep(container: AssignContainer): SymbolTable['_assignments'] {
        return [
            ...this._assignments.filter(x => x[0].id === container.id),
            ...this._children.flatMap(x => x[1].getAssignmentsByContainerDeep(container))
        ]
    }
    
    getAssignments() {
        return this._assignments
    }
    
    getAssignmentsDeep(): SymbolTable['_assignments'] {
        return [
            ...this._assignments,
            ...this._children.flatMap(x => x[1].getAssignmentsDeep())
        ]
    }
    
    setInstances(Env: Object) {
        for (let key of Object.keys(Env)) {
            if (this.has(key)) {
                this.lookup(key)!.setInstances(Env[key])
            }
        }
    }
}