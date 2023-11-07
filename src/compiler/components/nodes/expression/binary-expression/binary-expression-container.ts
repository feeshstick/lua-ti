import {BinaryExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../types.js";

export class BinaryExpressionContainer extends AbstractExpressionContainer<NodeKind.BinaryExpression> {
    public readonly left: ExpressionContainer
    public readonly right: ExpressionContainer
    public readonly kind = NodeKind.BinaryExpression
    
    constructor(
        public readonly node: BinaryExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.left = createContainer(node.left, this, this.scope) as ExpressionContainer
        this.right = createContainer(node.right, this, this.scope) as ExpressionContainer
    }
    
    get operator(): BinaryExpression['operator'] {
        return this.node.operator
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.left)
        node(this.right)
    }
}