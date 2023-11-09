import {Container, ExpressionContainer} from "../components/types.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";
import {VarargLiteralContainer} from "../components/nodes/expression/literal/vararg-literal-container.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";

export type ObjectMap<E> = { [key: string | number]: E }

export enum LSymbolTableKind {
    GlobalEnvironment,
    LocalEnvironment,
    Variable
}

interface AbstractSymbol<E extends LSymbolTableKind> {
    kind: E
}

export interface AbstractSymbolTable<E extends LSymbolTableKind> extends AbstractSymbol<E> {
    parent: SymbolTable | undefined
    kind: E
    name?: string
    member: ObjectMap<Variable>
    parameter: ObjectMap<Variable>
    semi: ObjectMap<Variable>
    
    lookup<Err extends Error>(name: string, err: Err): Variable
    
    has(name: string): boolean
    
    enter<Err extends Error>(name: string, table: Variable, err: Err): Variable
    
    enterParameter<Err>(name: string, table: Variable, err?: Err): Variable
    
    enterSemi<Err>(name: string, table: Variable, err?: Err): Variable
    
    create(): LocalTable
    
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
    declaration: CallExpressionContainer
    returns: Variable
}

export interface SignatureParameter {
    symbol: Variable
    declarations: Array<IdentifierContainer | VarargLiteralContainer>
}

export interface FunctionSignature {
    functionBodyTable: SymbolTable
    parameter: Array<SignatureParameter>
    declarations: Array<FunctionExpressionContainer>
    returns: Array<{
        declaration: ReturnStatementContainer,
        arguments: Variable[]
    }>
}

export interface Variable extends AbstractSymbol<LSymbolTableKind.Variable> {
    name?: string
    kind: LSymbolTableKind.Variable
    flag: SymbolFlag
    declarations: Array<Container>
    member: ObjectMap<Variable>
    calls: Array<Call>
    functionSignature?: FunctionSignature
    offset?: number
}

export enum SymbolFlag {
    None,
    ArithmeticBinaryExpression,
    StringConcat,
    CompareBinaryExpression,
    EqualityBinaryExpression,
    LogicalOr,
    LogicalAnd,
    StringLiteral,
    NilLiteral,
    NumberLiteral,
    BoolLiteral,
    String,
    Nil,
    Number,
    Bool,
    VarargLiteral,
    Function,
    IndexPair,
    ValuePair,
    KeyPair,
    TypeOf,
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

export function addMemberToVariable(base: ExpressionContainer, right: ExpressionContainer, name: string): Variable {
    if (!base.__symbol) {
        base.__symbol = createVariable(base)
    }
    if (base.__symbol.member[name]) {
        const prev = base.__symbol.member[name]
        prev.declarations.push(right)
        return prev
    } else {
        base.__symbol.member[name] = createVariable(right, name)
    }
    return base.__symbol.member[name]
}

export function createVariable(container: Container, name?: string): Variable {
    return {
        kind: LSymbolTableKind.Variable,
        flag: SymbolFlag.None,
        member: {},
        declarations: [container],
        name: name,
        calls: [],
        functionSignature: undefined,
        offset: undefined
    }
}

export function createHiddenVariable(name?: string): Variable {
    return createVariable(undefined as unknown as Container)
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
            create(): LocalTable {
                return createTable(this as LocalTable)
            },
            has(name: string): boolean {
                return !!this.parameter[name] || !!this.member[name] || this.parent?.has(name)
            },
            enter<Err extends Error>(name: string, table: Variable, err: Err): Variable {
                if (this.member[name]) {
                    throw err
                } else {
                    this.member[name] = table
                    return table
                }
            },
            enterSemi<Err>(name: string, semi: Variable, err?: Err) {
                if (this.semi[name]) {
                    if (err) {
                        throw err
                    }
                } else {
                    this.semi[name] = semi
                }
                return semi
            },
            enterParameter<Err>(name: string, parameter: Variable, err?: Err) {
                if (this.parameter[name]) {
                    if (err) {
                        throw err
                    }
                } else {
                    parameter.offset = Object.keys(this.parameter).length
                    this.parameter[name] = parameter
                }
                return parameter
            },
            lookup<Err extends Error>(name: string, err: Err): Variable {
                if (this.parameter[name]) {
                    return this.parameter[name]
                } else if (this.semi[name]) {
                    return this.semi[name]
                } else if (this.member[name]) {
                    return this.member[name]
                } else if (this.parent) {
                    return this.parent.lookup(name, err)
                } else {
                    throw err
                }
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