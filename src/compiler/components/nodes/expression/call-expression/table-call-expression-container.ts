import {TableCallExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../container-types.js";

export class TableCallExpressionContainer extends AbstractExpressionContainer<NodeKind.TableCallExpression> {
    public readonly base: ExpressionContainer
    public readonly arguments: ExpressionContainer
    public readonly kind = NodeKind.TableCallExpression;
    
    constructor(
        public readonly node: TableCallExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.base = createContainer(node.base, this, this.scope) as ExpressionContainer
        this.arguments = createContainer(node.arguments, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.base)
        node(this.arguments)
    }
}