import {NodeKind} from "../components/container-types.js";
import {Tree} from "../../utility/tree.js";

export type ReducedTypeGuide = {
    type: 'list',
    elements: ReducedTypeGuide[]
} | {
    type: 'member',
    name: string,
    member: ReducedTypeGuide
} | {
    type: 'function',
    parameter: string
}
export type ReducedReference = {
    type: 'reference'
    reference: number
}
export type InstanceKind =
    | 'object'
    | 'number'
    | 'undefined'
    | 'null'
    | 'boolean'
    | 'string'
    | 'function'
    | 'array'
    | 'symbol'

export interface AbstractValue<E extends InstanceKind> {
    kind: E
}

export interface AbstractPrimitive<E extends InstanceKind, A> extends AbstractValue<E> {
    value: A
}

export type ReducedNumber = AbstractPrimitive<'number', number>
export type ReducedString = AbstractPrimitive<'string', string>
export type ReducedBoolean = AbstractPrimitive<'boolean', boolean>
export type ReducedNull = AbstractPrimitive<'null', null>
export type ReducedFunction = AbstractPrimitive<'function', string>
export type ReducedUndefined = AbstractPrimitive<'undefined', undefined>

export interface ReducedObject extends AbstractValue<'object'> {
    entries: {
        key: string
        value: ReducedInstance
    }[]
}

export interface ReducedArray extends AbstractValue<'array'> {
    list: ReducedInstance[]
}

export interface ReducedSymbol extends AbstractValue<'symbol'> {
    symbol: ReducedToken | ReducedReference
}

export type ReducedInstance =
    | ReducedNumber
    | ReducedString
    | ReducedBoolean
    | ReducedNull
    | ReducedFunction
    | ReducedUndefined
    | ReducedObject
    | ReducedArray
    | ReducedSymbol
export type ReducedToken = {
    type: 'token'
    tid: number
    properties: {
        typeGuide: ReducedTypeGuide | undefined
        immutable: boolean
        instance: ReducedInstance | undefined
        typeByUsage: string[]
        type: string | undefined
    }
    declarations: number[]
    token: {
        key: string
        value: ReducedToken | ReducedReference
    }[]
}
export type ReducedSymbolTable = {
    type: 'table'
    tid: number
    container: number | undefined
    token: {
        key: string
        value: ReducedToken | ReducedReference
    }[]
    table: (ReducedSymbolTable | ReducedReference)[]
}
export type SymbolCoverageNode = {
    containerID: number
    containerKind: NodeKind
    symbol: {
        hasSymbol: boolean
        text?: string
    } | undefined
    children: {
        key: string
        value: SymbolCoverageNode[]
    }[]
}

export type DeclarationType = 'variable' | 'function'
export type Range = [number, number]
export type CardID = number
export type DeclarationID = number
export type CardDirectory =
    | 'official'
    | 'unofficial'
export type AbstractDeclaration<E extends DeclarationType> = {
    type: E
    id: DeclarationID
    location: {
        [A in CardDirectory]: [CardID, Range[]][]
    }
}

export interface VariableDeclaration extends AbstractDeclaration<'variable'> {
    name: string
    path: string
    file: string
    isLocal: boolean
    nameList: string[]
}

export interface FunctionDeclaration extends AbstractDeclaration<'function'> {
    name: string
    nameList: string[]
    path: string
    file: string
    parameter: {
        name: string
    }[]
    isLocal: boolean
}

export type Declaration = VariableDeclaration | FunctionDeclaration
export type AssetMap = Tree<Asset>
export type Asset = {
    type: 'asset',
    path: string
    name: string
    declarations: Tree<Declaration>
}

export interface CardInfo {
    id: number
    name: string
    desc: string
    str: string[]
    flag?: 'Pre-Errata' | 'Anime' | 'VG' | 'TFG' | 'Manga'
    alias: number
    setcode: number
    type: number
    atk: number
    def: number
    level: number
    attribute: number
    category: number
    declarations?: {
        declaration: Declaration
        ranges: Range[]
    }[]
    source?: string
}

export interface GetCardConfig {
    getSourceCode?: boolean
    getDeclarations?: boolean
}

export interface GetAllCardsConfig {
    pageIndex: number
    pageSize: number
}

export interface Request {
    path: string
    id: string
    args: any[]
}

export interface Response<E> {
    request: Request
    data: E
}

export type RequestProcessor<E> = (...args: any) => Promise<Response<E>['data']>
export type RequestProcessorEntry = {
    [key: string]: RequestProcessorEntry | RequestProcessor<any>
}

export interface CompilerResult {
    errors: [string, ...any[]][]
    coverage: SymbolCoverageNode | undefined
    symbols: ReducedSymbolTable | undefined
}