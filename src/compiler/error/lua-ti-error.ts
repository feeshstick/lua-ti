import fs from "fs";
import {Container, ExpressionContainer, NodeKind} from "../components/container-types.js";
import {LuaTiErrorCode} from "./lua-ti-error-code.js";
import {LuaTiErrorLevel} from "./lua-ti-error-level.js";
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
    CannotAssignUndefinedSymbol(node: ExpressionContainer) {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAssignUndefinedSymbol, `Cannot assign undefined symbol ${node.text} ${this.location(node)}`, this.createErrorContext(node))
    },
    CannotAccessCompilerOptionsOfRootFile() {
        return new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.CannotAccessCompilerOptionsOfRootFile, `Cannot access compiler-options of root-file`)
    },
    location(node: Container) {
        const path = node.chunk.context.path
        const file = node.chunk.context.file
        if (path) {
            if(fs.existsSync(path)){
                return 'file:///' + fs.realpathSync(path).replaceAll(/\\/gm, '/') + '/' + file + ':' + node.errLoc
            } else {
                return node.errLoc
            }
        } else {
            return node.errLoc
        }
    },
    createErrorContext(node: Container) {
        return {
            source: node.chunk.context.source,
            location: node.node.loc!,
            file: node.chunk.context.path
        }
    }
}
