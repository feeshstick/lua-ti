import {LogicalExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../types.js";

export class LogicalExpressionContainer extends AbstractExpressionContainer<NodeKind.LogicalExpression> {
    public readonly left: ExpressionContainer
    public readonly right: ExpressionContainer
    public readonly kind = NodeKind.LogicalExpression
    
    constructor(
        public readonly node: LogicalExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.left = createContainer(node.left, this, this.scope) as ExpressionContainer
        this.right = createContainer(node.right, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.left)
        node(this.right)
    }
}