import {UnaryExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../scope.js";
import {AbstractExpressionContainer} from "./abstract-expression-container.js";

import {
    Container,
    createContainer,
    ExpressionContainer,
    NodeKind,
    UnaryExpressionOperator
} from "../../container-types.js";

export class UnaryExpressionContainer extends AbstractExpressionContainer<NodeKind.UnaryExpression> {
    public readonly argument: ExpressionContainer
    public readonly kind = NodeKind.UnaryExpression
    
    constructor(
        public readonly node: UnaryExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.argument = createContainer(node.argument, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.argument)
    }
    
    get operator(): UnaryExpressionOperator {
        return UnaryExpressionOperator[this.node.operator]
    }
}