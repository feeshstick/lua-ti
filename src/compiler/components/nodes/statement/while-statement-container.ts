import {WhileStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {BlockContainer} from "../meta/block-container.js";

export class WhileStatementContainer extends BaseContainer<NodeKind.WhileStatement> implements BlockStatement {
    
    public readonly condition: ExpressionContainer
    public override readonly block: BlockContainer
    public readonly kind = NodeKind.WhileStatement;
    
    constructor(public readonly node: WhileStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.condition = createContainer(node.condition, this, this.scope) as ExpressionContainer
        this.block = Scope.createBody(this, node.body)
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.condition)
        node(this.block)
    }
}