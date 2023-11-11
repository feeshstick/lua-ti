import {Container, ExpressionContainer} from "../components/types.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {
    StringCallExpressionContainer
} from "../components/nodes/expression/call-expression/string-call-expression-container.js";
import {
    TableCallExpressionContainer
} from "../components/nodes/expression/call-expression/table-call-expression-container.js";

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

export interface AbstractSymbolTable<E extends LSymbolTableKind> extends AbstractSymbol<E> {
    parent: SymbolTable | undefined
    kind: E
    name?: string
    member: ObjectMap<Variable>
    parameter?: ObjectMap<Variable>
    semi?: ObjectMap<Variable>
    bubbleBreak: BubbleBreak
    
    lookup(name: string, bubbles?: BubbleBreak): Variable | undefined
    
    has(name: string, bubbles?: BubbleBreak): boolean
    
    enter<Err extends Error>(name: string, table: Variable, err: Err): Variable
    
    create(): LocalTable
    
    getSemi(): ObjectMap<Variable>
    
    getParameter(): ObjectMap<Variable>
    
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
    symbol: Variable
    declaration: ExpressionContainer
}

export interface Call {
    arguments: Array<CallArgument>
    declaration: CallExpressionContainer | StringCallExpressionContainer | TableCallExpressionContainer
    returns: Variable
}

export interface SignatureParameter {
    symbol: Variable
}

export interface FunctionSignature {
    functionBodyTable: SymbolTable
    parameter: Array<SignatureParameter>
    declaration: FunctionExpressionContainer
    returns: Array<{
        declaration: ReturnStatementContainer,
        arguments: Variable[]
    }>
}

export interface Variable extends AbstractSymbol<LSymbolTableKind.Variable> {
    id: number
    name?: string
    kind: LSymbolTableKind.Variable
    flag: SymbolFlag
    declarations: Array<Container>
    member?: ObjectMap<Variable>
    indexedMember: {
        key: Variable
        value: Variable
    }[]
    calls?: Array<Call>
    functionSignature?: FunctionSignature
    offset?: number
}

export function addCallToVariable(variable: Variable, call: Call) {
    if (variable.calls) {
        variable.calls.push(call)
    } else {
        variable.calls = [call]
    }
}

export function addMemberToVariable(name: string, variable: Variable, member: Variable): Variable {
    if (variable.member) {
        variable.member[name] = member
    } else {
        variable.member = {[name]: member}
    }
    return member
}

export function getMemberOrElse(name: string, variable: Variable, orElse: () => Variable): Variable {
    if (variable.member) {
        if (variable.member[name]) {
            return variable.member[name]
        }
    } else {
        variable.member = {}
    }
    variable.member[name] = orElse()
    return variable.member[name]
}

export function createVariable(container: Container, id: number, name?: string): Variable {
    return {
        id: id,
        kind: LSymbolTableKind.Variable,
        flag: SymbolFlag.None,
        declarations: [container],
        name: name,
        indexedMember: [],
        functionSignature: undefined,
        offset: undefined
    }
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
            parameter: {},
            semi: {},
            bubbleBreak: BubbleBreak.LocalBubble,
            create(): LocalTable {
                return createTable(this as LocalTable)
            },
            has(name: string, bubbles: BubbleBreak): boolean {
                return !!this.lookup(name, bubbles)
            },
            enter<Err extends Error>(name: string, table: Variable, err: Err): Variable {
                if (this.member[name]) {
                    throw err
                } else {
                    this.member[name] = table
                    return table
                }
            },
            lookup(name, bubbles = BubbleBreak.GlobalBubble) {
                if (this.parameter && this.parameter[name]) {
                    return this.parameter[name]
                } else if (this.semi && this.semi[name]) {
                    return this.semi[name]
                } else if (this.member && this.member[name]) {
                    return this.member[name]
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
            getSemi(): ObjectMap<Variable> {
                if (!this.semi) {
                    this.semi = {}
                }
                return this.semi
            },
            getParameter(): ObjectMap<Variable> {
                if (!this.parameter) {
                    this.parameter = {}
                }
                return this.parameter
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