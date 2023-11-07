import {Chunk} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {Container, FileReference, NodeKind} from "../../types.js";

import {BlockContainer} from "./block-container.js";

export class ChunkContainer extends BaseContainer<NodeKind.Chunk> {
    
    public override readonly block: BlockContainer
    public readonly kind = NodeKind.Chunk;
    
    constructor(
        public readonly sourceFile: FileReference,
        public readonly node: Chunk,
        public readonly parent: Container | undefined,
        scope: Scope
    ) {
        super(scope);
        this.block = Scope.createBody(this, this.node.body, sourceFile.name)
    }
    
    override getTextFromRange(range: [number, number]) {
        return this.sourceFile.source.slice(range[0], range[1])
    }
    
    forEachChild(node: (node: BlockContainer) => void) {
        node(this.block)
    }
    
}