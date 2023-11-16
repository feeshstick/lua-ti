import {NilLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";

export class NilLiteralContainer extends AbstractExpressionContainer<NodeKind.NilLiteral> {
    public readonly kind = NodeKind.NilLiteral;
    
    constructor(
        public readonly node: NilLiteral,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}