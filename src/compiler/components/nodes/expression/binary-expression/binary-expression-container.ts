import {BinaryExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {
    BinaryExpressionOperator,
    Container,
    createContainer,
    ExpressionContainer,
    NodeKind
} from "../../../container-types.js";

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
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.left)
        node(this.right)
    }
    
    get operator(): BinaryExpressionOperator {
        return this.node.operator as BinaryExpressionOperator
    }
}