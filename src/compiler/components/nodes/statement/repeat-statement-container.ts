import {RepeatStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {Block, ContainerFlag2} from "../meta/block.js";

export class RepeatStatementContainer extends BaseContainer<NodeKind.RepeatStatement> implements BlockStatement {
    
    public readonly condition: ExpressionContainer
    public override readonly block: Block
    public readonly kind = NodeKind.RepeatStatement;
    
    constructor(public readonly node: RepeatStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.condition = createContainer(node.condition, this, scope) as ExpressionContainer
        this.block = Scope.createBody(this, node.body, ContainerFlag2.ForScope)
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.condition)
        node(this.block)
    }
}