import {ElseClause} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../scope.js";
import {BlockStatement, NodeKind} from "../../../../container-types.js";
import {BlockContainer} from "../../../meta/block-container.js";
import {IfStatementContainer} from "../if-statement-container.js";

export class ElseClauseContainer extends BaseContainer<NodeKind.ElseClause> implements BlockStatement {
    public override readonly block: BlockContainer
    public readonly kind = NodeKind.ElseClause
    
    constructor(
        public readonly node: ElseClause,
        public readonly parent: IfStatementContainer,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body)
    }
    
    forEachChild(node: (node: BlockContainer) => void) {
        node(this.block)
    }
}