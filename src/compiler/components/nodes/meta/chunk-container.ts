import {Chunk} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../scope.js";
import {Container, NodeKind} from "../../container-types.js";

import {Block, ContainerFlag2} from "./block.js";
import {CompilerOptions} from "../../../compiler-options/compiler-options.js";
import {ChunkFlag} from "./chunk-flag.js";
import {Program} from "./program.js";
import {LuaTiDiagnostic} from "../../../error/lua-ti-diagnostic.js";
import {ProgramDeclarationFile, ProgramFile} from "../../../../program-configuration.js";

export interface ChunkContext extends ProgramFile {
    source: string
    path: string
    compilerOptions: CompilerOptions
}

export class ChunkContainer extends BaseContainer<NodeKind.Chunk> {
    
    public override readonly block: Block
    public readonly kind = NodeKind.Chunk
    
    constructor(
        public readonly context: ChunkContext,
        public readonly node: Chunk,
        public readonly parent: Program,
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