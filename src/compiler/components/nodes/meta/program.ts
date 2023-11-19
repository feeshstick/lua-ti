import {Container, NodeKind, ProgramNode} from "../../container-types.js";
import {ChunkFlag} from "./chunk-flag.js";
import {BaseContainer} from "../../base-container.js";
import {ChunkContainer} from "./chunk-container.js";
import {Scope} from "../../scope.js";
import {ProgramConfiguration} from "../../../../program-configuration.js";
import {parse} from "../../../parser/lua/lua-parser.js";
import {SymbolTable} from "../../../table/symbol-table.js";
import {LuaTiDiagnostic} from "../../../error/lua-ti-diagnostic.js";

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
    public readonly constants: ChunkContainer[] = []
    public readonly declarations: ChunkContainer[] = []
    public readonly sources: ChunkContainer[] = []
    public readonly node: ProgramNode
    private readonly _table: SymbolTable = new SymbolTable()
    private readonly _diagnostics: LuaTiDiagnostic = new LuaTiDiagnostic()
    
    constructor(
        public readonly config: ProgramConfiguration
    ) {
        super(new Scope())
        this.node = {
            type: 'Program',
            range: [0, 0]
        }
        for (let key of (Object.keys(this.config.program) as (keyof ProgramConfiguration['program'])[])) {
            for (let chunkConfig of this.config.program[key].files) {
                const compilerOptions = chunkConfig.compilerOptions || this.config.program[key].compilerOptions || config.compilerOptions
                const chunk = parse(
                    this,
                    {
                        file: chunkConfig.file,
                        path: this.config.program[key].path,
                        flag: chunkFlagFromKey(key),
                        inject: chunkConfig.inject,
                        compilerOptions: compilerOptions
                    }
                )
                this[key].push(chunk)
            }
        }
    }
    
    get chunks(): ChunkContainer[] {
        return [
            ...this.constants,
            ...this.declarations,
            ...this.sources
        ]
    }
    
    override get diagnostic(): LuaTiDiagnostic {
        return this._diagnostics
    }
    
    override get symbols(): SymbolTable {
        return this._table
    }
    
    forEachChild(node: (node: ChunkContainer) => void) {
    }
    
}