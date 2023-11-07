import {AssignmentStatement} from "luaparse/lib/ast.js";
import {IndexExpressionContainer} from "../../expression/index-expression-container.js";
import {IdentifierContainer} from "../../expression/literal/identifier-container.js";
import {MemberExpressionContainer} from "../../expression/member-expression-container.js";
import {BaseContainer} from "../../../base-container.js";
import {Scope} from "../../../../scope/scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../types.js";

export class AssignmentStatementContainer extends BaseContainer<NodeKind.AssignmentStatement> {
    public readonly init: ExpressionContainer[]
    public readonly variables: Array<IndexExpressionContainer | MemberExpressionContainer | IdentifierContainer>
    public readonly kind = NodeKind.AssignmentStatement
    
    constructor(public readonly node: AssignmentStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.init = node.init.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
        this.variables = node.variables.map(x => createContainer(x, this, this.scope)) as Array<IndexExpressionContainer | MemberExpressionContainer | IdentifierContainer>
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        for (let variable of this.variables) {
            node(variable)
        }
        for (let initElement of this.init) {
            node(initElement)
        }
    }
}