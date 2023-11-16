import {BooleanLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";

export class BooleanLiteralContainer extends AbstractExpressionContainer<NodeKind.BooleanLiteral> {
    public readonly kind = NodeKind.BooleanLiteral
    
    constructor(
        public readonly node: BooleanLiteral,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    get value(): boolean {
        return this.node.value
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}