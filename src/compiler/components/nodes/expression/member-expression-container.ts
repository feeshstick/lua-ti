import {MemberExpression} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "./literal/identifier-container.js";
import {AbstractExpressionContainer} from "./abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {Scope} from "../../scope.js";

export class MemberExpressionContainer extends AbstractExpressionContainer<NodeKind.MemberExpression> {
    public readonly base: ExpressionContainer;
    public readonly identifier: IdentifierContainer;
    public readonly kind = NodeKind.MemberExpression;
    
    constructor(
        public readonly node: MemberExpression,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
        this.base = createContainer(node.base, this, this.scope) as ExpressionContainer;
        this.identifier = createContainer(node.identifier, this, this.scope) as IdentifierContainer;
    }
    
    get indexer(): MemberExpression['indexer'] {
        return this.node.indexer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.base)
        node(this.identifier)
    }
}
