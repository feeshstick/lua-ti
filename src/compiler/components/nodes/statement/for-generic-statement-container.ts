import {ForGenericStatement} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../expression/literal/identifier-container.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {BlockContainer} from "../meta/block-container.js";

export class ForGenericStatementContainer extends BaseContainer<NodeKind.ForGenericStatement> implements BlockStatement {
    
    public override readonly block: BlockContainer
    public readonly variables: IdentifierContainer[]
    public readonly iterators: ExpressionContainer[]
    public readonly kind = NodeKind.ForGenericStatement;
    
    constructor(
        public readonly node: ForGenericStatement,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body)
        this.variables = node.variables.map(x => createContainer(x, this, this.scope)) as IdentifierContainer[]
        this.iterators = node.iterators.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
    }
    
    forEachChild(node: (node: ExpressionContainer | BlockContainer) => void) {
        for (let variable of this.variables) {
            node(variable)
        }
        for (let iterator of this.iterators) {
            node(iterator)
        }
        node(this.block)
    }
}