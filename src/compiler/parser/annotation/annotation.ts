import {BooleanType, NumberType, StringType, Type, TypeKind, UnionType} from "../../type/type.js";

export enum AnnotationKind {
    Parameter,
    Field,
    Alias,
    See,
    Return,
    Description,
    Class,
    Name,
    Signature,
}

export interface AbstractAnnotation<E extends AnnotationKind> {
    kind: E
    location?: {
        start: { offset: number, line: number, column: number },
        end: { offset: number, line: number, column: number }
    }
}

export interface ParameterAnnotation extends AbstractAnnotation<AnnotationKind.Parameter> {
    name: string
    isOptional: boolean
    type: Type
}

export interface FieldAnnotation extends AbstractAnnotation<AnnotationKind.Field> {
    name: string
    isOptional: boolean
    type: Type
}

export interface AliasAnnotation extends AbstractAnnotation<AnnotationKind.Alias> {
    name: string
    type: UnionType
}

export interface SeeAnnotation extends AbstractAnnotation<AnnotationKind.See> {
    name: string
}

export interface ReturnAnnotation extends AbstractAnnotation<AnnotationKind.Return> {
    type: Type
}

export interface DescriptionAnnotation extends AbstractAnnotation<AnnotationKind.Description> {
    text: string
}

export interface ClassAnnotation extends AbstractAnnotation<AnnotationKind.Class> {
    description: DescriptionAnnotation | undefined
    name: string
    fields: FieldAnnotation[]
}

export interface SignatureAnnotation extends AbstractAnnotation<AnnotationKind.Signature> {
    name: NameAnnotation | undefined
    description: DescriptionAnnotation | undefined
    parameter: ParameterAnnotation[]
    returns: ReturnAnnotation
}

export interface NameAnnotation extends AbstractAnnotation<AnnotationKind.Name> {
    name: string
}

export type Annotation =
    | ParameterAnnotation
    | FieldAnnotation
    | AliasAnnotation
    | SeeAnnotation
    | ReturnAnnotation
    | DescriptionAnnotation
    | ClassAnnotation
    | NameAnnotation

export const LuaBasicType = {
    Number: {kind: TypeKind.Number} as NumberType,
    Boolean: {kind: TypeKind.Boolean} as BooleanType,
    String: {kind: TypeKind.String} as StringType,
}