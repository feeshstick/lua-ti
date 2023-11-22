import {ElseClause} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../scope.js";
import {BlockStatement, NodeKind} from "../../../../container-types.js";
import {Block, ContainerFlag2} from "../../../meta/block.js";
import {IfStatementContainer} from "../if-statement-container.js";

export class ElseClauseContainer extends BaseContainer<NodeKind.ElseClause> implements BlockStatement {
    public override readonly block: Block
    public readonly kind = NodeKind.ElseClause
    
    constructor(
        public readonly node: ElseClause,
        public readonly parent: IfStatementContainer,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body, ContainerFlag2.BranchScope)
    }
    
    forEachChild(node: (node: Block) => void) {
        node(this.block)
    }
}