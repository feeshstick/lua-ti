import {ForNumericStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../types.js";
import {BlockContainer} from "../meta/block-container.js";

export class ForNumericStatementContainer extends BaseContainer<NodeKind.ForNumericStatement> implements BlockStatement {
    
    public override readonly block: BlockContainer
    public readonly start: ExpressionContainer
    public readonly end: ExpressionContainer
    public readonly step: ExpressionContainer | null
    public readonly kind = NodeKind.ForNumericStatement;
    
    constructor(public readonly node: ForNumericStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body)
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