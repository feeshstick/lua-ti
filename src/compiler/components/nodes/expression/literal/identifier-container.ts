import {Identifier} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";

export class IdentifierContainer extends AbstractExpressionContainer<NodeKind.Identifier> {
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