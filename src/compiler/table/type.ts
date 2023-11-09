export enum TypeKind {
    _Function
}

export interface Type<E extends TypeKind> {
    kind: E
}

export interface FunctionType extends Type<TypeKind._Function> {
}