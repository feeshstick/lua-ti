import {Comment} from "luaparse/lib/ast.js";

import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, NodeKind} from "../../container-types.js";
import {Type} from "../../../type/type.js";

export class CommentContainer extends BaseContainer<NodeKind.Comment> {
    
    public readonly kind = NodeKind.Comment;
    public type: Type | undefined
    
    constructor(
        public readonly node: Comment,
        public readonly parent: Container,
        scope: Scope) {
        super(scope)
    }
    
    override onInit() {
        super.onInit();
    }
    
    forEachChild(node: (node: Container) => void) {
    }
}