export enum TypeKind {
    Any,
    Null,
    Number,
    Boolean,
    String,
    NumberLiteral,
    StringLiteral,
    BooleanLiteral,
    Name,
    List,
    Union,
    Array,
    Vararg,
    Void,
    Function,
    Parameter,
    Class,
    ClassMember,
    Conditional,
    TypeRef,
}

export interface AbstractType<E extends TypeKind> {
    kind: E
    location?: {
        start: { offset: number, line: number, column: number },
        end: { offset: number, line: number, column: number }
    }
}

export interface VoidType extends AbstractType<TypeKind.Void> {
}

export interface NullType extends AbstractType<TypeKind.Null> {
}

export interface NumberType extends AbstractType<TypeKind.Number> {
}

export interface StringType extends AbstractType<TypeKind.String> {
}

export interface BooleanType extends AbstractType<TypeKind.Boolean> {
}

export interface NumberLiteralType extends AbstractType<TypeKind.NumberLiteral> {
    value: number | BigInt
}

export interface StringLiteralType extends AbstractType<TypeKind.StringLiteral> {
    value: string
}

export interface BooleanLiteralType extends AbstractType<TypeKind.BooleanLiteral> {
    value: boolean
}

export interface AnyType extends AbstractType<TypeKind.Any> {
}

export interface VarargType extends AbstractType<TypeKind.Vararg> {
    baseType?: Type,
    min?: number
    max?: number
}

export interface NameType extends AbstractType<TypeKind.Name> {
    name: string
}

export interface ListType extends AbstractType<TypeKind.List> {
    list: Type[]
}

export interface UnionType extends AbstractType<TypeKind.Union> {
    list: Type[]
}

export interface ArrayType extends AbstractType<TypeKind.Array> {
    baseType: Type
}

export interface FunctionType extends AbstractType<TypeKind.Function> {
    parameter: ParameterType[]
    returns: Type
}

export interface ParameterType extends AbstractType<TypeKind.Parameter> {
    name: string
    isOptional: boolean
    type: Type
}

export interface ClassMemberType extends AbstractType<TypeKind.ClassMember> {
    name: string
    isOptional: boolean
    type?: Type
}

export interface ClassType extends AbstractType<TypeKind.Class> {
    name: string;
    member: { [key: string]: ClassMemberType }
}

export interface ConditionalType extends AbstractType<TypeKind.Conditional> {
    left: Type | undefined
    right: Type | undefined
}

export interface TypeRef extends AbstractType<TypeKind.TypeRef> {
    type: Type
}

export type Type =
    | AnyType
    | VarargType
    | NullType
    | NumberType
    | BooleanType
    | StringType
    | NumberLiteralType
    | StringLiteralType
    | BooleanLiteralType
    | NameType
    | ListType
    | UnionType
    | ArrayType
    | FunctionType
    | ClassType
    | ParameterType
    | ConditionalType
    | TypeRef
    | ClassMemberType