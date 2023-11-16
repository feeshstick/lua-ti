import {GotoStatement} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../expression/literal/identifier-container.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, createContainer, NodeKind} from "../../container-types.js";

export class GotoStatementContainer extends BaseContainer<NodeKind.GotoStatement> {
    
    public readonly label: IdentifierContainer
    public readonly kind = NodeKind.GotoStatement;
    
    constructor(public readonly node: GotoStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.label = createContainer(node.label, this, this.scope) as IdentifierContainer
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.label)
    }
}