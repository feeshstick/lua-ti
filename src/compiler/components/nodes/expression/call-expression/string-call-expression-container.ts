import {StringCallExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../container-types.js";

export class StringCallExpressionContainer extends AbstractExpressionContainer<NodeKind.StringCallExpression> {
    public readonly base: ExpressionContainer
    public readonly argument: ExpressionContainer
    public readonly kind = NodeKind.StringCallExpression;
    
    constructor(
        public readonly node: StringCallExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.base = createContainer(node.base, this, this.scope) as ExpressionContainer
        this.argument = createContainer(node.argument, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.base)
        node(this.argument)
    }
}