import {Container, ExpressionContainer, ParameterContainer} from "../components/container-types.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {StringBuilder} from "../utility/string-builder.js";
import {LuaTiErrorHelper} from "../error/lua-ti-error.js";
import {VariableContainer} from "../components/nodes/expression/variable-container.js";
import {AssignContainer} from "../components/nodes/statement/assign/assign-container.js";
import chalk from "chalk";
import * as util from "util";
import {
    ReducedInstance,
    ReducedReference,
    ReducedSymbolTable,
    ReducedToken,
    ReducedTypeGuide
} from "../shared/share.js";
import prettier from "prettier";


export enum SymbolAttribute {
    Undefined,
    FunctionBody,
    Function,
    ParameterDeclaration,
    UpValue,
}

export abstract class AbstractTable {
    public readonly tid: number
    
    public attribute: SymbolAttribute = SymbolAttribute.Undefined
    
    protected readonly entries: Map<string, Token> = new Map()
    
    public abstract readonly parent?: Token | SymbolTable
    
    protected constructor(
        public readonly idProvider: () => number
    ) {
        this.tid = idProvider()
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

export interface FunctionTypeGuide {
    type: 'function'
    parameter: (...args: ParameterContainer[]) => void
}

export type TypeGuide =
    | [string, TypeGuide]
    | FunctionTypeGuide

export class Token extends AbstractTable {
    
    private static reduceInstance(instance: any, typeContext: string | undefined, reductionContext: Set<number>): ReducedInstance {
        switch (typeof instance) {
            case "undefined":
                return {
                    kind: 'undefined',
                    value: undefined
                }
            case "object":
                if (instance) {
                    if (instance instanceof Array) {
                        return {
                            kind: 'array',
                            list: instance.map(item => this.reduceInstance(item, typeContext, reductionContext))
                        }
                    } else if (instance instanceof Token) {
                        return {
                            kind: 'symbol',
                            symbol: instance.reduce(reductionContext)
                        }
                    } else {
                        return {
                            kind: 'object',
                            entries: Object.entries(instance).map(([key, value]) => {
                                return {
                                    key: key,
                                    value: this.reduceInstance(value, typeContext, reductionContext)
                                }
                            })
                        }
                    }
                } else {
                    return {
                        kind: 'null',
                        value: null
                    }
                }
            case "boolean":
                return {
                    kind: 'boolean',
                    value: instance
                }
            case "number":
                return {
                    kind: 'number',
                    value: instance
                }
            case "string":
                return {
                    kind: 'string',
                    value: instance
                }
            case "function": {
                let string = instance.toString() as string
                if (string.startsWith('function')) {
                    string = prettier.format(string, {
                        parser: 'babel'
                    })
                } else if (/^\w+/gm.exec(string)) {
                    string = prettier.format('function ' + string, {
                        parser: 'babel'
                    })
                } else if (string.includes('=>')) {
                    string = prettier.format(' (' + string + ')', {
                        parser: 'babel'
                    })
                }
                return {
                    kind: 'function',
                    value: string
                }
            }
            case "symbol":
            case "bigint":
                throw new Error()
        }
    }
    
    private static reduceTypeGuide(typeGuide: TypeGuide[]): ReducedTypeGuide {
        const reduction: ReducedTypeGuide = {
            type: 'list',
            elements: []
        }
        for (let element of typeGuide) {
            reduction.elements.push(_reduceTypeGuide(element))
        }
        
        return reduction
        
        function _reduceTypeGuide(element: TypeGuide): ReducedTypeGuide {
            if (element instanceof Array) {
                return {
                    type: 'member',
                    name: element[0],
                    member: _reduceTypeGuide(element[1])
                }
            } else {
                return {
                    type: 'function',
                    parameter: element.parameter.toString()
                }
            }
        }
    }
    
    static typeGuard(obj: any): Token {
        if (obj instanceof Token) {
            return obj
        } else {
            if (typeof obj === 'object') {
                throw new Error(`${util.inspect(obj, {colors: true, depth: 1})} is not instance of Token`)
            } else {
                throw new Error(`Type of ${obj} (${typeof obj}) is not a Token`)
            }
        }
    }
    
    static isToken(obj: any): obj is Token {
        return obj instanceof Token
    }
    
    private _parent: Token | SymbolTable | undefined
    private readonly declarations: Container[]
    
    public table: SymbolTable | undefined
    
    public readonly properties: {
        typeGuide?: TypeGuide[]
        immutable?: boolean
        instance?: any
        type?: string
        nullCheck?: boolean
        typeByUsage?: Set<string>
    } = {}
    
    constructor(
        idProvider: () => number,
        ...declarations: Container[]
    ) {
        super(idProvider)
        this.declarations = declarations
    }
    
    addDeclaration(container: Container) {
        if (this.declarations.filter(x => x.id === container.id).length == 0) {
            this.declarations.push(container)
        }
    }
    
    getDeclaration(): ReadonlyArray<Container> {
        return this.declarations
    }
    
    reduce(reductionContext: Set<number>): ReducedToken | ReducedReference {
        if (reductionContext.has(this.tid)) {
            return {
                type: 'reference',
                reference: this.tid
            }
        } else {
            reductionContext.add(this.tid)
            return {
                type: 'token',
                tid: this.tid,
                properties: {
                    typeGuide: this.properties.typeGuide
                        ? Token.reduceTypeGuide(this.properties.typeGuide)
                        : undefined,
                    immutable: !!this.properties.immutable,
                    instance: typeof this.properties.instance !== 'undefined'
                        ? Token.reduceInstance(this.properties.instance, this.properties.type, reductionContext)
                        : undefined,
                    type: this.properties.type,
                    typeByUsage: Array.from((this.properties.typeByUsage || new Set()).values())
                },
                declarations: this.declarations.map(x => x.id),
                token: Array.from(this.entries).map(([key, value]) => {
                    return {
                        key: key,
                        value: value.reduce(reductionContext)
                    }
                })
            }
        }
    }
    
    createEmpty(): Token {
        return new Token(this.idProvider)
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
                            out.println(chalk.italic(instanceString))
                        } else {
                            out.println(chalk.italic(instanceString))
                        }
                    } else {
                        if (typeof instance === 'object') {
                            out.namedBlock('└ instance', () => {
                                printObj(instance)
                                
                                function printObj(obj: any) {
                                    for (let [key, value] of Object.entries(obj)) {
                                        if (key !== '_parent' && key !== 'declarations') {
                                            if (typeof value === 'object') {
                                                out.namedBlock(chalk.italic(key), () => {
                                                    printObj(value)
                                                })
                                            } else {
                                                out.println('└ ' + chalk.bold(key), chalk.italic(value))
                                            }
                                        }
                                    }
                                }
                            }, '|')
                        } else {
                            out.println('└ instance', chalk.yellowBright(instanceString))
                        }
                    }
                    out.println(`└ ${chalk.italic('typeof')} instance`, typeof instance)
                }
                if (this.properties.type) out.println(`└ type`, this.properties.type)
                if (this.properties.typeGuide) {
                    out.println('└ type-guide', util.inspect(this.properties.typeGuide, {
                        colors: true,
                        compact: true,
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
    
    get reference() {
        if (typeof this.properties.instance !== 'undefined') {
            if (this.properties.instance instanceof Token) {
                return this.properties.instance.reference
            } else {
                return this.properties.instance
            }
        }
    }
    
    setInstances(obj: any) {
        if (typeof obj === 'object' && obj) {
            for (let key of Object.keys(obj)) {
                this.lookup(key)?.setInstances(obj[key])
            }
        }
        this.properties.instance = obj
    }
    
    emitError(message: string, ...data: any[]) {
        if (this.declarations.length > 0) {
            this.declarations[this.declarations.length - 1].emitError(message, ...[...data, 'token=' + this.tid])
        } else if (this.parent) {
            this.parent.emitError(message, ...[...data, 'token=' + this.tid])
        } else {
            console.error('no err-path found')
        }
    }
}

export class SymbolTable extends AbstractTable {
    private static createIdProvider(): () => number {
        let currentId = 0
        return () => {
            return currentId++
        }
    }
    
    private readonly _escapeReturnList: ReturnStatementContainer[] = []
    private readonly _escapeExitList: ReturnStatementContainer[] = []
    private readonly _children: [Container, SymbolTable][] = []
    
    private readonly _assignments: [AssignContainer, VariableContainer[], ExpressionContainer][] = []
    
    constructor(
        public readonly parent?: SymbolTable,
        public readonly declaration?: Container,
    ) {
        super(parent?.idProvider || SymbolTable.createIdProvider())
    }
    
    reduce(reductionContext: Set<number>): ReducedSymbolTable | ReducedReference {
        if (reductionContext.has(this.tid)) {
            return {
                type: 'reference',
                reference: this.tid
            }
        } else {
            reductionContext.add(this.tid)
            return {
                type: 'table',
                tid: this.tid,
                container: this.declaration ? this.declaration.id : undefined,
                token: Array.from(this.entries).map(([key, value]) => {
                    return {
                        key: key,
                        value: value.reduce(reductionContext)
                    }
                }),
                table: this._children.map(([, table]) => {
                    return table.reduce(reductionContext)
                })
            }
        }
    }
    
    create(container: Container): SymbolTable {
        const child = new SymbolTable(this, container)
        this._children.push([container, child])
        return child
    }
    
    emitError(message: string, ...data: any[]) {
        if (this.declaration) {
            this.declaration.emitError(message, ...[...data, 'symbol-table=' + this.tid])
        }
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
        const symbol = new Token(this.idProvider)
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
                        let [assignContainer, variables, expression] = this._assignments[i]
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
    
    createToken(container?: Container) {
        if (container) {
            return new Token(this.idProvider, container)
        } else {
            return new Token(this.idProvider)
        }
    }
}