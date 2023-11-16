import {LabelStatement} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../expression/literal/identifier-container.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, createContainer, NodeKind} from "../../container-types.js";

export class LabelStatementContainer extends BaseContainer<NodeKind.LabelStatement> {
    
    public readonly label: IdentifierContainer
    public readonly kind = NodeKind.LabelStatement;
    
    constructor(public readonly node: LabelStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.label = createContainer(node.label, this, this.scope) as IdentifierContainer
    }
    
    forEachChild(node: (node: Container) => void) {
        node(this.label)
    }
}