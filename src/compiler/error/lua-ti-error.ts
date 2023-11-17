import fs from "fs";
import {Container, ExpressionContainer, NodeKind} from "../components/container-types.js";
import {ChunkContainer} from "../components/nodes/meta/chunk-container.js";
import {LuaTiErrorCode} from "./lua-ti-error-code.js";
import {LuaTiErrorLevel} from "./lua-ti-error-level.js";
import {BubbleBreak, GlobalTable, MemberKind, Symbol} from "../table/symbol-table.js";
import {Type, TypeKind} from "../type/type.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";
import {entries} from "../table/table-builder.js";

export class LuaTiError extends Error {
    constructor(
        level: LuaTiErrorLevel,
        kind: LuaTiErrorCode,
        message: string
    ) {
        super(`LuaTi ${LuaTiErrorLevel[level]} ${LuaTiErrorCode[kind]} : ${message}`);
        Object.setPrototypeOf(Error, LuaTiError.prototype)
        console.log(this.cause)
    }
}

export function typeToString(right: Type | undefined) {
    if (right) {
        switch (right.kind) {
            case TypeKind.Any:
                return `any`
            case TypeKind.Vararg:
                return `vararg`
            case TypeKind.Null:
                return `null/nil`
            case TypeKind.Number:
                return `number`
            case TypeKind.Boolean:
                return `bool/boolean`
            case TypeKind.String:
                return `string`
            case TypeKind.NumberLiteral:
                return `${right.value}`
            case TypeKind.StringLiteral:
                return `${right.value}`
            case TypeKind.BooleanLiteral:
                return `${right.value}`
            case TypeKind.Name:
                return `${right.name}`
            case TypeKind.List:
                return `${right.list.map(x => typeToString(x)).join(', ')}`
            case TypeKind.Union:
                return `(${right.list.map(x => typeToString(x)).join(' | ')})`
            case TypeKind.Array:
                return `Array<${typeToString(right.baseType)}>`
            case TypeKind.Function:
                return `fun(${right.parameter.map(x => typeToString(x)).join(', ')}) : ${typeToString(right.returns)}`
            case TypeKind.Class:
                return `${right.name}`
            case TypeKind.Parameter:
                return `${right.name}${right.isOptional ? '?' : ''} : ${typeToString(right.type)}`
            case TypeKind.ClassMember:
                return
        }
        return 'undefined'
    } else {
        return 'undefined'
    }
}

export const LuaTiErrorHelper = {
    overwriteSymbol(node: Container, left: Symbol, right: Symbol, message?: string): LuaTiError {
        return new LuaTiError(
            LuaTiErrorLevel.Internal,
            LuaTiErrorCode.OverwriteSymbol,
            `symbol-overwrite left=${left.id} right=${right.id} node=${node.id};${NodeKind[node.kind]} ${this.location(node)}`
        )
    },
    noSymbol(node: ExpressionContainer, message?: string): LuaTiError {
        return new LuaTiError(
            LuaTiErrorLevel.Internal,
            LuaTiErrorCode.NoSymbol,
            `tried to access undefined container symbol ${NodeKind[node.kind]} $${node.id} ${node.text} ${this.location(node)}`
        )
    },
    location(node: Container) {
        const path = node.find<ChunkContainer>(NodeKind.Chunk)?.sourceFile.path
        if (path) {
            return 'file:///' + fs.realpathSync(path).replaceAll(/\\/gm, '/') + ':' + node.errLoc
        } else {
            return node.errLoc
        }
    },
    duplicateDeclarationAsParameter(node: ExpressionContainer, symbol: Symbol, symbolKind: MemberKind, bubbles: BubbleBreak[]) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} kind="${symbolKind}" ${bubbles.join(',')} ${this.location(node)} ${this.location(node)}`)
    },
    duplicateDeclarationAsForLoopVariable(node: ExpressionContainer, symbol: Symbol, symbolKind: MemberKind, bubbles: BubbleBreak[]) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} kind="${symbolKind}" ${bubbles.join(',')} ${this.location(node)} ${this.location(node)}`)
    },
    duplicateDeclarationAsLocalVariable(node: ExpressionContainer, symbol: Symbol, symbolKind: MemberKind, bubbles: BubbleBreak[]) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} kind="${symbolKind}" ${bubbles.join(',')} ${this.location(node)} ${this.location(node)}`)
    },
    memberKindMismatch(node: ExpressionContainer, symbol: Symbol, actualKind: MemberKind, expectedKind: MemberKind, bubbles: BubbleBreak[]) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} actual=${actualKind} expected="${expectedKind}" ${bubbles.join(',')} ${this.location(node)}`)
    },
    CallUndefinedSymbol(node: ExpressionContainer): LuaTiError {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.CallUndefinedSymbol, `${node.text} has no symbol, 'undefined' symbol cannot be called ${this.location(node)} ${this.location(node)}`)
    },
    CannotAssignUndefinedSymbol(node: ExpressionContainer) {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAssignUndefinedSymbol, `Cannot assign undefined symbol ${node.id}`)
    },
    CannotAccessCompilerOptionsOfRootFile() {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAccessCompilerOptionsOfRootFile, `Cannot access compiler-options of root-file`)
    },
    AnnotationError(message?: string, location?: Container) {
        return new LuaTiError(LuaTiErrorLevel.Annotation, LuaTiErrorCode.AnnotationError, `${message || 'unspecified'}${location ? ' at ' + this.location(location) : ''}`)
    },
    PropertyXDoesNotExistOnTypeY(node: Container, left: string, right: Type) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.PropertyXDoesNotExistOnTypeY, `Property '${left}' does not exist on type '${typeToString(right)}'. ${this.location(node)}`)
    },
    AssignToConstant(node: IdentifierContainer) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.AssignToConstant, `Cannot assign to '${node.text}' because it is a constant. ${this.location(node)}`)
    },
    OverwriteTypeOnImmutable(abstractExpressionContainer: ExpressionContainer) {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.OverwriteImmutable, `Cannot set type on immutable ${this.location(abstractExpressionContainer)}`)
    }
}
