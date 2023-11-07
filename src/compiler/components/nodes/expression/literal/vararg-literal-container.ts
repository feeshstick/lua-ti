import {VarargLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../types.js";

export class VarargLiteralContainer extends AbstractExpressionContainer<NodeKind.VarargLiteral> {
    public readonly kind = NodeKind.VarargLiteral;
    
    constructor(
        public readonly node: VarargLiteral,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}