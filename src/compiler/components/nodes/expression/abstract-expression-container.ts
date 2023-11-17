import {ExpressionContainer, NodeKind} from "../../container-types.js";
import {BaseContainer} from "../../base-container.js";
import {Symbol} from "../../../table/symbol-table.js";
import {LuaTiErrorHelper} from "../../../error/lua-ti-error.js";
import {Type} from "../../../type/type.js";

export type ExpressionContainerKind =
    | NodeKind.Identifier
    | NodeKind.StringLiteral
    | NodeKind.NumericLiteral
    | NodeKind.BooleanLiteral
    | NodeKind.NilLiteral
    | NodeKind.VarargLiteral
    | NodeKind.TableConstructorExpression
    | NodeKind.BinaryExpression
    | NodeKind.LogicalExpression
    | NodeKind.UnaryExpression
    | NodeKind.MemberExpression
    | NodeKind.IndexExpression
    | NodeKind.CallExpression
    | NodeKind.TableCallExpression
    | NodeKind.StringCallExpression
    | NodeKind.FunctionDeclaration
    | NodeKind.TableKey
    | NodeKind.TableValue
    | NodeKind.TableKeyString

export abstract class AbstractExpressionContainer<E extends ExpressionContainerKind> extends BaseContainer<E> {
    private __symbol: Symbol | undefined
    private __type: Type | undefined
    private __narrow
    private __immutable: boolean = false
    
    set symbol(symbol: Symbol) {
        if (symbol) {
            if (this.__symbol) {
                throw LuaTiErrorHelper.overwriteSymbol(this as ExpressionContainer, this.__symbol, symbol)
            } else {
                this.__symbol = symbol
            }
        } else {
            // Just in case; should be impossible.
            throw LuaTiErrorHelper.CannotAssignUndefinedSymbol(this as ExpressionContainer)
        }
    }
    
    set immutable(immutable: boolean) {
        this.__immutable = immutable
    }
    
    get immutable() {
        return this.__immutable
    }
    
    get symbol(): Symbol {
        if (!this.__symbol) {
            throw LuaTiErrorHelper.noSymbol(this as ExpressionContainer)
        } else {
            return this.__symbol
        }
    }
    
    set type(type: Type | undefined) {
        if (this.__immutable) {
            throw LuaTiErrorHelper.OverwriteTypeOnImmutable(this as ExpressionContainer)
        }
        this.__type = type
    }
    
    get type(): Type | undefined {
        return this.__type
    }
    
}
