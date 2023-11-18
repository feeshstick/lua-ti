import {Chunk} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, NodeKind} from "../../container-types.js";

import {Block, ContainerFlag2} from "./block.js";
import {CompilerOptions} from "../../../compiler-options/compiler-options.js";
import {ChunkFlag} from "./chunk-flag.js";

export interface ChunkContext {
    path: string
    source: string
    compilerOptions: CompilerOptions
    flag: ChunkFlag
}

export class ChunkContainer extends BaseContainer<NodeKind.Chunk> {
    
    public override readonly block: Block
    public readonly kind = NodeKind.Chunk
    
    constructor(
        public readonly context: ChunkContext,
        public readonly node: Chunk,
        public readonly parent: Container | undefined,
        scope: Scope
    ) {
        super(scope);
        this.block = Scope.createBody(this, this.node.body, ContainerFlag2.ChunkScope)
    }
    
    override getTextFromRange(range: [number, number]) {
        return this.context.source.slice(range[0], range[1])
    }
    
    forEachChild(node: (node: Block) => void) {
        node(this.block)
    }
    
}