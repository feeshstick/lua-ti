import {Comment} from "luaparse/lib/ast.js";

import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {Container, NodeKind} from "../../types.js";

export class CommentContainer extends BaseContainer<NodeKind.Comment> {
    
    public readonly kind = NodeKind.Comment;
    
    constructor(
        public readonly node: Comment,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}