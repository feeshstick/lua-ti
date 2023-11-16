import {VarargLiteral} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, NodeKind} from "../../../container-types.js";
import {ParameterAnnotation} from "../../../../annotation/annotation.js";

export class VarargLiteralContainer extends AbstractExpressionContainer<NodeKind.VarargLiteral> {
    public readonly kind = NodeKind.VarargLiteral;
    public parameterAnnotation: ParameterAnnotation | undefined
    
    constructor(
        public readonly node: VarargLiteral,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
    }
    
    forEachChild() {
    }
}