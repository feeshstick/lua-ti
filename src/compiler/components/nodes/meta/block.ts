import {BaseContainer} from "../../base-container.js";
import {BlockNode, Container, createContainer, NodeKind, StatementContainer} from "../../container-types.js";
import {Scope} from "../../scope.js";
import {SymbolTable} from "../../../table/symbol-table.js";

export enum ContainerFlag2 {
    BlockScope,
    FunctionScope,
    BranchScope,
    ForScope,
    GlobalScope,
    ChunkScope
}

export class Block extends BaseContainer<NodeKind.Block> {
    public readonly kind = NodeKind.Block
    public readonly statements: StatementContainer[];
    // private readonly localTable: LocalTable
    private readonly _table: SymbolTable
    
    constructor(
        public readonly node: BlockNode,
        public readonly parent: Container,
        public readonly containerFlag2: ContainerFlag2 = ContainerFlag2.BlockScope,
        scope: Scope,
    ) {
        super(scope)
        this._table = this.parent.symbols.create()
        this.statements = this.node.statements
            .filter(statement => {
                if (parent.compilerOptions.parserOptions) {
                    return !parent.compilerOptions.parserOptions.ignore.includes(statement.type as NodeKind);
                } else {
                    return true
                }
            })
            .map(statement => createContainer(statement, this, this.scope) as StatementContainer)
    }
    
    forEachChild(node: (node: StatementContainer) => void) {
        for (let statement of this.statements) {
            node(statement)
        }
    }
    
    override get symbols(): SymbolTable {
        return this._table
    }
}