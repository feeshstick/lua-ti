import {ElseifClause} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../scope.js";
import {BlockStatement, createContainer, ExpressionContainer, NodeKind} from "../../../../container-types.js";
import {Block, ContainerFlag2} from "../../../meta/block.js";
import {IfStatementContainer} from "../if-statement-container.js";

export class ElseifClauseContainer extends BaseContainer<NodeKind.ElseifClause> implements BlockStatement {
    public override readonly block: Block
    public readonly condition: ExpressionContainer
    public readonly kind = NodeKind.ElseifClause
    
    constructor(
        public readonly node: ElseifClause,
        public readonly parent: IfStatementContainer,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body, ContainerFlag2.BranchScope)
        this.condition = createContainer(node.condition, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: Block | ExpressionContainer) => void) {
        node(this.condition)
        node(this.block)
    }
}