import {IfClause} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../scope.js";
import {BlockStatement, createContainer, ExpressionContainer, NodeKind} from "../../../../container-types.js";
import {BlockContainer} from "../../../meta/block-container.js";
import {IfStatementContainer} from "../if-statement-container.js";

export class IfClauseContainer extends BaseContainer<NodeKind.IfClause> implements BlockStatement {
    public override readonly block: BlockContainer
    public readonly condition: ExpressionContainer
    public readonly kind = NodeKind.IfClause
    
    constructor(
        public readonly node: IfClause,
        public readonly parent: IfStatementContainer,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body)
        this.condition = createContainer(node.condition, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: BlockContainer | ExpressionContainer) => void) {
        node(this.condition)
        node(this.block)
    }
}