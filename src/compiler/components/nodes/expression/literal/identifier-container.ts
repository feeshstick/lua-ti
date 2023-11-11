import {Identifier} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, ExpressionType, NodeKind} from "../../../types.js";

export class IdentifierContainer extends AbstractExpressionContainer<NodeKind.Identifier> {
    public type = ExpressionType.Unknown
    public readonly kind = NodeKind.Identifier;
    
    constructor(
        public readonly node: Identifier,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope)
    }
    
    get name(): string {
        return this.node.name
    }
    
    forEachChild(node: (node: Container) => void) {
    }
    
}