import {StringLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";

export class StringLiteralContainer extends AbstractExpressionContainer<NodeKind.StringLiteral> {
    public readonly kind = NodeKind.StringLiteral;
    
    constructor(
        public readonly node: StringLiteral,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    get value(): string {
        return this.node.raw
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}