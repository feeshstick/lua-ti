import {ExpressionContainer, NodeKind} from "../../container-types.js";
import {BaseContainer} from "../../base-container.js";
import {LuaTiErrorHelper} from "../../../error/lua-ti-error.js";
import {SymbolAttribute, Token} from "../../../table/symbol-table.js";

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
    private __symbol: Token | undefined
    private __narrow
    public attribute: SymbolAttribute = SymbolAttribute.Undefined
    __immutable: boolean = false
    
    get hasSymbol(): boolean {
        return !!this.__symbol
    }
    
    set symbol(symbol: Token) {
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
    
    get symbol(): Token {
        if (!this.__symbol) {
            throw LuaTiErrorHelper.noSymbol(this as ExpressionContainer)
        } else {
            return this.__symbol
        }
    }
    
}
