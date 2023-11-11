export enum TypeKind {
    Number,
    Bool,
    Nil,
    String,
    NumberLiteral,
    BoolLiteral,
    NilLiteral,
    StringLiteral,
    ImplicitTable,
    ImplicitFunction
}

export interface Type<E extends TypeKind> {
    kind: E
}