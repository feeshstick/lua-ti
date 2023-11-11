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
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.index)
        node(this.base)
    }
}