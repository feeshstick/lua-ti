import {BooleanLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../types.js";

export class BooleanLiteralContainer extends AbstractExpressionContainer<NodeKind.BooleanLiteral> {
    public readonly kind = NodeKind.BooleanLiteral
    
    constructor(
        public readonly node: BooleanLiteral,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}