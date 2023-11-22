import {Container, NodeKind, ProgramNode} from "../../container-types.js";
import {ChunkFlag} from "./chunk-flag.js";
import {BaseContainer} from "../../base-container.js";
import {ChunkContainer} from "./chunk-container.js";
import {Scope} from "../../scope.js";
import {ProgramConfiguration} from "../../../../program-configuration.js";
import {parse} from "../../../parser/lua/lua-parser.js";
import {SymbolTable} from "../../../table/symbol-table.js";

function chunkFlagFromKey(key: "constants" | "declarations" | "sources") {
    switch (key) {
        case "constants":
            return ChunkFlag.Constant
        case "declarations":
            return ChunkFlag.Declaration
        case "sources":
            return ChunkFlag.Source
    }
}

export class Program extends BaseContainer<NodeKind.Program> {
    
    static build(config: ProgramConfiguration): Program {
        return new Program(config)
    }
    
    parent: Container | undefined;
    public readonly kind = NodeKind.Program
    public readonly source: ChunkContainer
    public readonly node: ProgramNode
    private readonly _table: SymbolTable = new SymbolTable()
    
    constructor(
        public readonly config: ProgramConfiguration
    ) {
        super(new Scope())
        this.node = {
            type: 'Program',
            range: [0, 0]
        }
        this.source = parse(
            this,
            {
                file: config.program.file,
                path: config.program.path,
                compilerOptions: config.compilerOptions
            }
        )
    }
    
    override get symbols(): SymbolTable {
        return this._table
    }
    
    forEachChild(node: (node: ChunkContainer) => void) {
    }
    
}