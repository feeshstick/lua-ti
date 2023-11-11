import {Container, ExpressionContainer, NodeKind} from "../components/types.js";
import {Variable} from "../table/symbol-table.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";
import {ChunkContainer} from "../components/nodes/meta/chunk-container.js";
import fs from "fs";

export enum LuaTiErrorKind {
    Internal,
    Syntax
}

export class LuaTiError extends Error {
    constructor(
        public readonly _kind: LuaTiErrorKind,
        public readonly _message: string
    ) {
        super();
    }
    
    private static location(node: Container) {
        const path = node.find<ChunkContainer>(NodeKind.Chunk)?.sourceFile.path
        if (path) {
            return 'file:///' + fs.realpathSync(path).replaceAll(/\\/gm, '/') + ':' + node.errLoc
        } else {
            return node.errLoc
        }
    }
    
    static noEntry(target: ExpressionContainer, message?: string): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `tried to access undefined entry of expression $${target.id} ${target.text} ${message} ${LuaTiError.location(target)}`)
    }
    
    static noVarargs(target: Container, message?: string): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Syntax, `tried to access undefined entry of expression ${message} ${LuaTiError.location(target)}`)
    }
    
    static illegalParameterDeclaration(): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, 'illegal parameter-declaration')
    }
    
    static overwriteEntry(target: ExpressionContainer, value?: ExpressionContainer, message?: string): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `entry of node $${target.id} would be overwritten by $${value?.id} ${LuaTiError.location(target)} ${value?LuaTiError.location(value):''} ${message ? ' ' + message : ''}`)
    }
    
    static overwriteEntryDirect(target: ExpressionContainer, value: Variable): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `entry of node $${target.id} would be overwritten by ${value}`)
    }
    
    static duplicateDeclaration(target: Container, previous: Variable, current: Variable) {
        return new LuaTiError(LuaTiErrorKind.Syntax, `previous=[${previous?.declarations.map(x => x.text).join(',')}], current=[${current?.declarations.map(x => x.text).join(', ')}] ${LuaTiError.location(target)}`)
    }
    
    static cannotFindName(ident: IdentifierContainer, message?: string) {
        return new LuaTiError(LuaTiErrorKind.Syntax, `cannot find name '${ident.name}' ${message} ${this.location(ident)}`);
    }
    
    static tableIndexIsNil(key: ExpressionContainer) {
        return new LuaTiError(LuaTiErrorKind.Syntax, 'table index is nil')
    }
}