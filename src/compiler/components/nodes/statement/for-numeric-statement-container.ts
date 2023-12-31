import {ForNumericStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {Block, ContainerFlag2} from "../meta/block.js";

export class ForNumericStatementContainer extends BaseContainer<NodeKind.ForNumericStatement> implements BlockStatement {
    
    public override readonly block: Block
    public readonly start: ExpressionContainer
    public readonly end: ExpressionContainer
    public readonly step: ExpressionContainer | null
    public readonly kind = NodeKind.ForNumericStatement;
    
    constructor(public readonly node: ForNumericStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body, ContainerFlag2.ForScope)
        this.start = createContainer(node.start, this, this.scope) as ExpressionContainer
        this.end = createContainer(node.end, this, this.scope) as ExpressionContainer
        this.step = node.step ? createContainer(node.step, this, this.scope) as ExpressionContainer : null
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.start)
        node(this.end)
        if (this.step) node(this.step)
        node(this.block)
    }
}