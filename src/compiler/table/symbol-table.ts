import {Container, ExpressionContainer} from "../components/container-types.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {
    StringCallExpressionContainer
} from "../components/nodes/expression/call-expression/string-call-expression-container.js";
import {
    TableCallExpressionContainer
} from "../components/nodes/expression/call-expression/table-call-expression-container.js";
import {ClassType, Type} from "../type/type.js";
import {CompilerOptions} from "../compiler-options/compiler-options.js";
import {entries} from "./table-builder.js";

export type ObjectMap<E> = { [key: string | number]: E }

export enum LSymbolTableKind {
    GlobalEnvironment,
    LocalEnvironment,
    Variable
}

interface AbstractSymbol<E extends LSymbolTableKind> {
    kind: E
}

export enum BubbleBreak {
    LocalBubble,
    FunctionBubble,
    GlobalBubble
}

export type MemberKind = 'member' | 'parameter' | 'semi'

export interface AbstractSymbolTable<E extends LSymbolTableKind> extends AbstractSymbol<E> {
    parent: SymbolTable | undefined
    kind: E
    name?: string
    member: ObjectMap<Symbol>
    constant: ObjectMap<Symbol>
    parameter?: ObjectMap<Symbol>
    semi?: ObjectMap<Symbol>
    bubbleBreak: BubbleBreak
    
    entries(): [string, Symbol][]
    
    kindEntries(): [MemberKind | 'constant', string, Symbol][]
    
    lookup(name: string, bubbles?: BubbleBreak): Symbol | undefined
    
    lookupTrack(name: string): [Symbol, MemberKind, BubbleBreak[]] | undefined
    
    has(name: string, bubbles?: BubbleBreak): boolean
    
    enter(name: string, set: Symbol, location: MemberKind, compilerOptions: CompilerOptions): Symbol
    
    create(): LocalTable
    
    getSemi(): ObjectMap<Symbol>
    
    getParameter(): ObjectMap<Symbol>
    
    global: SymbolTable
}

export interface LocalTable extends AbstractSymbolTable<LSymbolTableKind.LocalEnvironment> {
    parent: SymbolTable
}

export interface GlobalTable extends AbstractSymbolTable<LSymbolTableKind.GlobalEnvironment> {
    parent: undefined
}

export type SymbolTable = LocalTable | GlobalTable

export interface CallArgument {
    symbol: Symbol
    declaration: ExpressionContainer
}

export interface Call {
    arguments: Array<CallArgument>
    declaration: CallExpressionContainer | StringCallExpressionContainer | TableCallExpressionContainer
    returns: Symbol
}

export interface ParameterDeclaration {
    symbol: Symbol
}

export interface FunctionDeclaration {
    functionBodyTable: SymbolTable
    parameter: Array<ParameterDeclaration>
    declaration?: FunctionExpressionContainer
    returns: Array<{
        declaration?: ReturnStatementContainer,
        arguments: Symbol[]
    }>
}

export interface ObjectData {
    type: ClassType
    properties: {
        [key: string]: any
    }
}

export interface Symbol extends AbstractSymbol<LSymbolTableKind.Variable> {
    object: ObjectData | undefined
    id: number
    name?: string
    kind: LSymbolTableKind.Variable
    flag: SymbolFlag
    declarations: Array<Container>
    member?: ObjectMap<Symbol>
    indexedMember: {
        key: Symbol
        value: Symbol
    }[]
    calls?: Array<Call>
    functionDeclaration?: FunctionDeclaration
    offset?: number
    type: Type | undefined
}

export interface ObjectSymbol extends Symbol {
    object: ObjectData
}

export function addCallToVariable(variable: Symbol, call: Call) {
    if (variable.calls) {
        variable.calls.push(call)
    } else {
        variable.calls = [call]
    }
}

export function addMemberToVariable(name: string, variable: Symbol, member: Symbol): Symbol {
    if (variable.member) {
        variable.member[name] = member
    } else {
        variable.member = {[name]: member}
    }
    return member
}

export enum SymbolFlag {
    None = "None",
    ArithmeticBinaryExpression = "ArithmeticBinaryExpression",
    StringConcat = "StringConcat",
    CompareBinaryExpression = "CompareBinaryExpression",
    EqualityBinaryExpression = "EqualityBinaryExpression",
    LogicalOr = "LogicalOr",
    LogicalAnd = "LogicalAnd",
    StringLiteral = "StringLiteral",
    NilLiteral = "NilLiteral",
    NumberLiteral = "NumberLiteral",
    BoolLiteral = "BoolLiteral",
    String = "String",
    Nil = "Nil",
    Number = "Number",
    Bool = "Bool",
    VarargLiteral = "VarargLiteral",
    Function = "Function",
    IndexPair = "IndexPair",
    ValuePair = "ValuePair",
    KeyPair = "KeyPair",
    TypeOf = "TypeOf",
    Indexed = "Indexed",
    Table = "Table",
}

export type LiteralSymbolFlag =
    | SymbolFlag.StringLiteral
    | SymbolFlag.NilLiteral
    | SymbolFlag.NumberLiteral
    | SymbolFlag.BoolLiteral

export function isLiteralSymbolFlag(flag: SymbolFlag): flag is LiteralSymbolFlag {
    return flag === SymbolFlag.StringLiteral
        || flag === SymbolFlag.NilLiteral
        || flag === SymbolFlag.NumberLiteral
        || flag === SymbolFlag.BoolLiteral
}

export type BinaryExpressionSymbolFlag =
    | SymbolFlag.ArithmeticBinaryExpression
    | SymbolFlag.StringConcat
    | SymbolFlag.CompareBinaryExpression
    | SymbolFlag.EqualityBinaryExpression

export function isBinaryExpressionSymbolFlag(symbolFlag: SymbolFlag): symbolFlag is BinaryExpressionSymbolFlag {
    return symbolFlag === SymbolFlag.ArithmeticBinaryExpression
        || symbolFlag === SymbolFlag.StringConcat
        || symbolFlag === SymbolFlag.CompareBinaryExpression
        || symbolFlag === SymbolFlag.EqualityBinaryExpression
}

export function createTable(): GlobalTable
export function createTable(parent: SymbolTable): LocalTable
export function createTable(parent?: SymbolTable): SymbolTable {
    if (parent) {
        return _createTable<LocalTable>(LSymbolTableKind.LocalEnvironment, parent) as LocalTable
    } else {
        return _createTable<GlobalTable>(LSymbolTableKind.GlobalEnvironment, undefined) as GlobalTable
    }
    
    function _createTable<E extends SymbolTable>(kind: E['kind'], parent: E['parent']): AbstractSymbolTable<E['kind']> {
        return {
            kind: kind,
            parent: parent,
            member: {},
            constant: {},
            parameter: {},
            semi: {},
            bubbleBreak: BubbleBreak.LocalBubble,
            create(): LocalTable {
                return createTable(this as LocalTable)
            },
            has(name: string, bubbles: BubbleBreak): boolean {
                return !!this.lookup(name, bubbles)
            },
            enter(name: string, table: Symbol, location: 'member' | 'parameter' | 'semi', compilerOptions: CompilerOptions): Symbol {
                if (this.has(name, BubbleBreak.GlobalBubble)) {
                    throw new Error()
                }
                switch (location) {
                    case "member":
                        if (compilerOptions.fileFlag === 'constants') {
                            this.constant[name] = table
                        } else {
                            this.member[name] = table
                        }
                        break;
                    case "parameter":
                        this.getParameter()[name] = table
                        break;
                    case "semi":
                        this.getSemi()[name] = table
                        break;
                }
                return table
            },
            lookupTrack(name: string) {
                if (this.parameter && this.parameter[name]) {
                    return [this.parameter[name], 'parameter', [this.bubbleBreak]]
                } else if (this.semi && this.semi[name]) {
                    return [this.semi[name], 'semi', [this.bubbleBreak]]
                } else if (this.member && this.member[name]) {
                    return [this.member[name], 'member', [this.bubbleBreak]]
                } else if (this.constant && this.constant[name]) {
                    return [this.constant[name], 'member', [this.bubbleBreak]]
                } else if (this.parent) {
                    const variable = this.parent.lookupTrack(name)
                    if (variable) {
                        variable[2].unshift(this.bubbleBreak)
                        return variable
                    }
                }
                return undefined
            },
            lookup(name, bubbles = BubbleBreak.GlobalBubble) {
                if (this.parameter && this.parameter[name]) {
                    return this.parameter[name]
                } else if (this.semi && this.semi[name]) {
                    return this.semi[name]
                } else if (this.member && this.member[name]) {
                    return this.member[name]
                } else if (this.constant && this.constant[name]) {
                    return this.constant[name]
                } else if (bubbles && this.parent) {
                    if (bubbles === BubbleBreak.FunctionBubble && this.bubbleBreak === BubbleBreak.FunctionBubble) {
                        return undefined
                    } else {
                        return this.parent.lookup(name, bubbles)
                    }
                } else {
                    return undefined
                }
            },
            getSemi(): ObjectMap<Symbol> {
                if (!this.semi) {
                    this.semi = {}
                }
                return this.semi
            },
            getParameter(): ObjectMap<Symbol> {
                if (!this.parameter) {
                    this.parameter = {}
                }
                return this.parameter
            },
            entries(): [string, Symbol][] {
                return [
                    ...entries(this.parameter || {}),
                    ...entries(this.semi || {}),
                    ...entries(this.member)
                ] as [string, Symbol][]
            },
            kindEntries() {
                const _entries: [MemberKind | 'constant', string, Symbol][] = []
                if (this.parameter) {
                    for (let [key, val] of entries(this.parameter)) {
                        _entries.push(['parameter', key as string, val])
                    }
                }
                if (this.member) {
                    for (let [key, val] of entries(this.member)) {
                        _entries.push(['member', key as string, val])
                    }
                }
                if (this.constant) {
                    for (let [key, val] of entries(this.constant)) {
                        _entries.push(['constant', key as string, val])
                    }
                }
                if (this.semi) {
                    for (let [key, val] of entries(this.semi)) {
                        _entries.push(['semi', key as string, val])
                    }
                }
                return _entries
            },
            get global(): GlobalTable {
                if (this.kind === LSymbolTableKind.GlobalEnvironment) {
                    return this as GlobalTable
                } else {
                    return this.parent!.global as GlobalTable
                }
            }
        }
    }
}

export function hasOwnProperty<E>(element: E, key: keyof E | string): key is keyof E {
    // @ts-ignore
    return typeof element[key] !== 'undefined'
}