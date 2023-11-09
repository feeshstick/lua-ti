import {NodeKind} from "../../types.js";
import {BaseContainer} from "../../base-container.js";
import {Variable} from "../../../table/symbol-table.js";

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

export abstract class AbstractExpressionContainer<E extends ExpressionContainerKind> extends BaseContainer<E> {
    __symbol: Variable | undefined
    
    getEntry<E extends Error>(err: E) {
        if (!this.__symbol) {
            throw err
        } else {
            return this.__symbol
        }
    }
    
    setEntry<E extends Error>(variable: Variable, err: E) {
        if (this.__symbol) {
            throw err
        } else {
            this.__symbol = variable
        }
    }
    
    hasEntry() {
        return !!this.__symbol
    }
}
