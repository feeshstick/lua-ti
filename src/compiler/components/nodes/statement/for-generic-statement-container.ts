import {ForGenericStatement} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../expression/literal/identifier-container.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {BlockStatement, Container, createContainer, ExpressionContainer, NodeKind} from "../../container-types.js";
import {Block, ContainerFlag2} from "../meta/block.js";

export class ForGenericStatementContainer extends BaseContainer<NodeKind.ForGenericStatement> implements BlockStatement {
    
    public override readonly block: Block
    public readonly variables: IdentifierContainer[]
    public readonly iterators: ExpressionContainer[]
    public readonly kind = NodeKind.ForGenericStatement;
    
    constructor(
        public readonly node: ForGenericStatement,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.block = Scope.createBody(this, node.body, ContainerFlag2.ForScope)
        this.variables = node.variables.map(x => createContainer(x, this, this.scope)) as IdentifierContainer[]
        this.iterators = node.iterators.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
    }
    
    forEachChild(node: (node: ExpressionContainer | Block) => void) {
        for (let variable of this.variables) {
            node(variable)
        }
        for (let iterator of this.iterators) {
            node(iterator)
        }
        node(this.block)
    }
}