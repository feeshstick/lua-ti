import {IndexExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope/scope.js";
import {AbstractExpressionContainer} from "./abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../types.js";

export class IndexExpressionContainer extends AbstractExpressionContainer<NodeKind.IndexExpression> {
    public readonly base: ExpressionContainer
    public readonly index: ExpressionContainer
    public readonly kind = NodeKind.IndexExpression;
    
    constructor(
        public readonly node: IndexExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.base = createContainer(node.base, this, this.scope) as ExpressionContainer
        this.index = createContainer(node.index, this, this.scope) as ExpressionContainer
        switch (this.base.kind){
            case NodeKind.StringLiteral:
                break;
            case NodeKind.Identifier:
                break;
            case NodeKind.NumericLiteral:
                break;
            case NodeKind.BooleanLiteral:
                break;
            case NodeKind.NilLiteral:
                break;
            case NodeKind.VarargLiteral:
                break;
            case NodeKind.TableConstructorExpression:
                break;
            case NodeKind.BinaryExpression:
                break;
            case NodeKind.LogicalExpression:
                break;
            case NodeKind.UnaryExpression:
                break;
            case NodeKind.MemberExpression:
                break;
            case NodeKind.IndexExpression:
                break;
            case NodeKind.CallExpression:
                break;
            case NodeKind.TableCallExpression:
                break;
            case NodeKind.StringCallExpression:
                break;
            case NodeKind.FunctionDeclaration:
                throw new Error('cannot index FunctionDeclaration')
        }
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.index)
        node(this.base)
    }
}