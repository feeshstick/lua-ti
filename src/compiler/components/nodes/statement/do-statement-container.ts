import {DoStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {BlockStatement, Container, NodeKind} from "../../types.js";
import {BlockContainer} from "../meta/block-container.js";

export class DoStatementContainer extends BaseContainer<NodeKind.DoStatement> implements BlockStatement {
    
    public override readonly block: BlockContainer
    public readonly kind = NodeKind.DoStatement;
    
    constructor(
        public readonly node: DoStatement,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
        this.block = Scope.createBody(this, node.body)
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.block)
    }
}