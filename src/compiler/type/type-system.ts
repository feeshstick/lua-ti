export enum PrimitiveTypeKind {
    Number,
    Bool,
    String,
    Nil,
    Table,
    Thread,
    Userdata,
    _Function,
    Undefined,
    Any,
}

export enum StaticTypeComparison {
    Mismatch,
    Extends,
    Equal
}

export enum TypeKind {
    Primitive,
    Name,
}

export abstract class AbstractType<E extends TypeKind> {
    public abstract readonly kind: E
    public abstract readonly mutable: boolean
    
    public abstract get asString()
    
    abstract compareStatic(left: Type): StaticTypeComparison
}

export abstract class AbstractPrimitiveType<E extends PrimitiveTypeKind> extends AbstractType<TypeKind.Primitive> {
    public abstract readonly baseType: E
    public readonly kind = TypeKind.Primitive
    public readonly mutable = false
    public abstract readonly isPseudo: boolean
    public abstract readonly isAtomic: boolean
}

export class NumberLiteralType {
    constructor(
        public readonly value: number
    ) {
    }
}

export class NumberType extends AbstractPrimitiveType<PrimitiveTypeKind.Number> {
    public readonly isPseudo = false
    public readonly isAtomic = true
    public readonly baseType = PrimitiveTypeKind.Number
    public literal: NumberLiteralType | undefined
    
    get asString() {
        return 'number'
    }
    
    override compareStatic(left: Type) {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class BoolLiteralType {
    constructor(
        public readonly bool: boolean
    ) {
    }
}

export class BoolType extends AbstractPrimitiveType<PrimitiveTypeKind.Bool> {
    public readonly isPseudo = false
    public readonly isAtomic = true
    public readonly baseType = PrimitiveTypeKind.Bool
    public literal: BoolLiteralType | undefined
    
    get asString() {
        return 'bool'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

class StringLiteralType {
    constructor(
        public readonly value: string
    ) {
    }
}

export class StringType extends AbstractPrimitiveType<PrimitiveTypeKind.String> {
    public readonly isPseudo = false
    public readonly isAtomic = true
    public readonly baseType = PrimitiveTypeKind.String
    public literal: StringLiteralType | undefined
    
    get asString() {
        return 'string'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class NilType extends AbstractPrimitiveType<PrimitiveTypeKind.Nil> {
    public readonly isPseudo = false
    public readonly isAtomic = true
    public readonly baseType = PrimitiveTypeKind.Nil
    
    get asString() {
        return 'nil'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class TableSignatureType {
    public readonly members: Map<string, Type> = new Map()
}

export class TableType extends AbstractPrimitiveType<PrimitiveTypeKind.Table> {
    public readonly isPseudo = false
    public readonly isAtomic = false
    public readonly baseType = PrimitiveTypeKind.Table
    public readonly signature: TableSignatureType | undefined
    
    get asString() {
        return 'table'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class FunctionSignatureType {
    public readonly parameterTypes: Type[] = []
    public readonly returnType: Type[] = []
}

export class FunctionType extends AbstractPrimitiveType<PrimitiveTypeKind._Function> {
    public readonly isPseudo = false
    public readonly isAtomic = false
    public readonly baseType = PrimitiveTypeKind._Function
    public signature: FunctionSignatureType | undefined
    
    get asString() {
        return 'function'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class ThreadType extends AbstractPrimitiveType<PrimitiveTypeKind.Thread> {
    public readonly isPseudo = false
    public readonly isAtomic = false
    public readonly baseType = PrimitiveTypeKind.Thread
    
    get asString() {
        return 'thread'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class UserdataType extends AbstractPrimitiveType<PrimitiveTypeKind.Userdata> {
    public readonly isPseudo = false
    public readonly isAtomic = false
    public readonly baseType = PrimitiveTypeKind.Userdata
    
    get asString() {
        return 'userdata'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class UndefinedType extends AbstractPrimitiveType<PrimitiveTypeKind.Undefined> {
    public readonly isPseudo = true
    public readonly isAtomic = true
    public readonly baseType = PrimitiveTypeKind.Undefined
    
    get asString() {
        return 'undefined'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.baseType === this.baseType) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export class AnyType extends AbstractPrimitiveType<PrimitiveTypeKind.Any> {
    public readonly isPseudo = true
    public readonly isAtomic = false
    public readonly baseType = PrimitiveTypeKind.Any
    
    get asString() {
        return 'any'
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        return StaticTypeComparison.Extends
    }
}

export type PrimitiveType =
    | NumberType
    | BoolType
    | StringType
    | NilType
export type ReferenceType =
    | TableType
    | FunctionType
    | ThreadType
    | UserdataType
export type PseudoType =
    | AnyType
    | UndefinedType
export type BaseType =
    | PrimitiveType
    | ReferenceType
    | PseudoType


/**
 * todo, replace with structured type in future maybe
 */
export class NamedType extends AbstractType<TypeKind.Name> {
    public readonly kind = TypeKind.Name
    readonly mutable: boolean = false;
    
    constructor(
        public readonly name: string
    ) {
        super();
    }
    
    get asString() {
        return this.name
    }
    
    override compareStatic(left: Type): StaticTypeComparison {
        if (left.kind === this.kind && left.name === this.name) {
            return StaticTypeComparison.Equal
        } else {
            return StaticTypeComparison.Mismatch
        }
    }
}

export type Type =
    | NamedType
    | BaseType

export const Primitive = {
    Number: new NumberType(),
    Bool: new BoolType(),
    String: new StringType(),
    Nil: new NilType(),
    Table: new TableType(),
    Function: new FunctionType(),
    Thread: new ThreadType(),
    Userdata: new UserdataType(),
    Any: new AnyType(),
    Undefined: new UndefinedType(),
}