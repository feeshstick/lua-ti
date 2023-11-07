import {RepeatStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../types.js";
import {BlockContainer} from "../meta/block-container.js";

export class RepeatStatementContainer extends BaseContainer<NodeKind.RepeatStatement> implements BlockStatement {
    
    public readonly condition: ExpressionContainer
    public override readonly block: BlockContainer
    public readonly kind = NodeKind.RepeatStatement;
    
    constructor(public readonly node: RepeatStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.condition = createContainer(node.condition, this, scope) as ExpressionContainer
        this.block = Scope.createBody(this, node.body)
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.condition)
        node(this.block)
    }
}