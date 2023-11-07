import {IfStatement} from "luaparse/lib/ast.js";
import {IfClauseContainer} from "./clause/if-clause-container.js";
import {ElseifClauseContainer} from "./clause/elseif-clause-container.js";
import {ElseClauseContainer} from "./clause/else-clause-container.js";
import {BaseContainer} from "../../../base-container.js";
import {Scope} from "../../../../scope/scope.js";
import {Container, createContainer, NodeKind} from "../../../types.js";

export class IfStatementContainer extends BaseContainer<NodeKind.IfStatement> {
    
    public readonly clauses: Array<IfClauseContainer | ElseifClauseContainer | ElseClauseContainer>
    public readonly kind = NodeKind.IfStatement;
    
    constructor(public readonly node: IfStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.clauses = node.clauses.map(x => createContainer(x, this, this.scope)) as Array<IfClauseContainer | ElseifClauseContainer | ElseClauseContainer>
    }
    
    forEachChild(node: (node: IfClauseContainer | ElseifClauseContainer | ElseClauseContainer) => void) {
        for (let clause of this.clauses) {
            node(clause)
        }
    }
}