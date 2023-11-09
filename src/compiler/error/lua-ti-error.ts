import {ExpressionContainer} from "../components/types.js";
import {Variable} from "../table/symbol-table.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";

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
    
    static noEntry(target: ExpressionContainer, message?: string): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `tried to access undefined entry of expression $${target.id} ${target.text} ${message}`)
    }
    
    static noVarargs(message?: string): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Syntax, `tried to access undefined entry of expression ${message}`)
    }
    
    static illegalParameterDeclaration(): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, 'illegal parameter-declaration')
    }
    
    static overwriteEntry(target: ExpressionContainer, value: ExpressionContainer): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `entry of node $${target.id} would be overwritten by $${value.id}`)
    }
    
    static overwriteEntryDirect(target: ExpressionContainer, value: Variable): LuaTiError {
        return new LuaTiError(LuaTiErrorKind.Internal, `entry of node $${target.id} would be overwritten by ${value}`)
    }
    
    static duplicateDeclaration(previous: Variable, current: Variable) {
        return new LuaTiError(LuaTiErrorKind.Syntax, `previous=[${previous?.declarations.map(x => x.text).join(',')}], current=[${current?.declarations.map(x => x.text).join(', ')}]`)
    }
    
    static cannotFindName(ident: IdentifierContainer, message?: string) {
        return new LuaTiError(LuaTiErrorKind.Syntax, `cannot find name '${ident.name}' ${message}`);
    }
}