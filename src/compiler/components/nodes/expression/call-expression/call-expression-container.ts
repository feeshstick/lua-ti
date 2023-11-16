import {CallExpression} from "luaparse/lib/ast.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../container-types.js";

export class CallExpressionContainer extends AbstractExpressionContainer<NodeKind.CallExpression> {
    public readonly base: ExpressionContainer
    public readonly arguments: ExpressionContainer[]
    public readonly kind = NodeKind.CallExpression
    
    constructor(
        public readonly node: CallExpression,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.base = createContainer(node.base, this, this.scope) as ExpressionContainer
        this.arguments = node.arguments.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.base)
        for (let argument of this.arguments) {
            node(argument)
        }
    }
    
}