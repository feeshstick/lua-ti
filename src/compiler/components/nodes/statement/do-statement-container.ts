import {DoStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, NodeKind} from "../../container-types.js";
import {Block, ContainerFlag2} from "../meta/block.js";

export class DoStatementContainer extends BaseContainer<NodeKind.DoStatement> implements BlockStatement {
    
    public override readonly block: Block
    public readonly kind = NodeKind.DoStatement;
    
    constructor(
        public readonly node: DoStatement,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
        this.block = Scope.createBody(this, node.body, ContainerFlag2.BlockScope)
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.block)
    }
}