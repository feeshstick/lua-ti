import {NumericLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";

export class NumericLiteralContainer extends AbstractExpressionContainer<NodeKind.NumericLiteral> {
    public readonly kind = NodeKind.NumericLiteral;
    
    constructor(
        public readonly node: NumericLiteral,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    get value(): BigInt {
        return BigInt(this.node.raw)
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}