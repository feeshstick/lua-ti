import {BreakStatement} from "luaparse/lib/ast.js";

import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, NodeKind} from "../../container-types.js";

export class BreakStatementContainer extends BaseContainer<NodeKind.BreakStatement> {
    
    public readonly kind = NodeKind.BreakStatement;
    
    constructor(
        public readonly node: BreakStatement,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}