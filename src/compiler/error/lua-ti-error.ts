import fs from "fs";
import {Container, ExpressionContainer, NodeKind} from "../components/container-types.js";
import {LuaTiErrorCode} from "./lua-ti-error-code.js";
import {LuaTiErrorLevel} from "./lua-ti-error-level.js";
import {Type, TypeKind} from "../type/type.js";
import {Token} from "../table/symbol-table.js";
import {ErrorContext, errorPrettyPrint} from "../../utility/error-pretty-print.js";

export class LuaTiError extends Error {
    constructor(
        level: LuaTiErrorLevel,
        kind: LuaTiErrorCode,
        message: string,
        data?: ErrorContext
    ) {
        super(message);
        if (data) {
            console.log(errorPrettyPrint(data))
        }
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
                return `[${right.list.map(x => typeToString(x)).join(', ')}]`
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
            case TypeKind.Conditional:
                return `${typeToString(right.left)} || ${typeToString(right.right)}`
            case TypeKind.TypeRef:
                break;
            case TypeKind.ClassMember:
                return
        }
        return 'undefined'
    } else {
        return 'undefined'
    }
}

export const LuaTiErrorHelper = {
    overwriteSymbol(node: Container, left: Token, right: Token, message?: string): LuaTiError {
        return new LuaTiError(
            LuaTiErrorLevel.Internal,
            LuaTiErrorCode.OverwriteSymbol,
            `symbol-overwrite left=${left.tid} right=${right.tid} node=${node.id};${NodeKind[node.kind]} ${this.location(node)}`
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
        const path = node.chunk.context.path
        const file = node.chunk.context.file
        if (path) {
            return 'file:///' + fs.realpathSync(path).replaceAll(/\\/gm, '/') + '/' + file + ':' + node.errLoc
        } else {
            return node.errLoc
        }
    },
    duplicateDeclarationAsParameter(node: ExpressionContainer, symbol: Token) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} ${this.location(node)} ${this.location(node)}`, this.createErrorContext(node))
    },
    duplicateDeclarationAsForLoopVariable(node: ExpressionContainer, symbol: Token) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} ${this.location(node)} ${this.location(node)}`, this.createErrorContext(node))
    },
    duplicateDeclarationAsLocalVariable(node: ExpressionContainer, symbol: Token) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} ${this.location(node)} ${this.location(node)}`, this.createErrorContext(node))
    },
    memberKindMismatch(node: ExpressionContainer, symbol: Token, actualKind: Token) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.DuplicateDeclarationAsParameter, `symbol=${symbol} actual=${actualKind} ${this.location(node)}`, this.createErrorContext(node))
    },
    CallUndefinedSymbol(node: ExpressionContainer): LuaTiError {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.CallUndefinedSymbol, `${node.text} has no symbol, 'undefined' symbol cannot be called ${this.location(node)}`, this.createErrorContext(node))
    },
    CannotAssignUndefinedSymbol(node: ExpressionContainer) {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAssignUndefinedSymbol, `Cannot assign undefined symbol ${node.text} ${this.location(node)}`, this.createErrorContext(node))
    },
    CannotAccessCompilerOptionsOfRootFile() {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAccessCompilerOptionsOfRootFile, `Cannot access compiler-options of root-file`)
    },
    AnnotationError(message?: string, location?: Container) {
        return new LuaTiError(LuaTiErrorLevel.Annotation, LuaTiErrorCode.AnnotationError, `${message || 'unspecified'}${location ? ' at ' + this.location(location) : ''}`)
    },
    PropertyXDoesNotExistOnTypeY(node: Container, left: string, right: Type) {
        return new LuaTiError(LuaTiErrorLevel.Syntax, LuaTiErrorCode.PropertyXDoesNotExistOnTypeY, `Property '${left}' does not exist on type '${typeToString(right)}'. ${this.location(node)}`, this.createErrorContext(node))
    },
    createErrorContext(node: Container) {
        return {
            source: node.chunk.context.source,
            location: node.node.loc!,
            file: node.chunk.context.path
        }
    }
}
