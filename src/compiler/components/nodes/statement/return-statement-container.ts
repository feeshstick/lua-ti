import {ReturnStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";

export class ReturnStatementContainer extends BaseContainer<NodeKind.ReturnStatement> {
    public readonly arguments: ExpressionContainer[]
    public readonly kind = NodeKind.ReturnStatement;
    
    constructor(public readonly node: ReturnStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.arguments = node.arguments.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        for (let argument of this.arguments) {
            node(argument)
        }
    }
}