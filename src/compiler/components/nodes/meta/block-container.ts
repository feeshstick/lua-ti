import {BaseContainer} from "../../base-container.js";
import {Block, Container, createContainer, NodeKind, StatementContainer} from "../../types.js";
import {Scope} from "../../../scope/scope.js";
import {FunctionBodyTable, SymbolTable} from "../../../table/symbol-table.js";
import {createTable, LocalTable} from "../../../table/symbol-table-2.js";

export class BlockContainer<E extends SymbolTable | FunctionBodyTable = SymbolTable> extends BaseContainer<NodeKind.Block> {
    public readonly kind = NodeKind.Block
    public readonly symbolTable: E
    public readonly statements: StatementContainer[];
    private readonly localTable: LocalTable
    
    constructor(
        public readonly node: Block,
        public readonly parent: Container,
        scope: Scope,
        symbolTable?: E
    ) {
        super(scope)
        this.localTable = createTable(this.parent.__table)
        this.symbolTable = (symbolTable || this.parent.symbols.createSymbolTable()) as E
        this.statements = this.node.statements.map(statement => createContainer(statement, this, this.scope) as StatementContainer)
    }
    
    print() {
    }
    
    override get symbols(): E {
        return this.symbolTable
    }
    
    forEachChild(node: (node: StatementContainer) => void) {
        for (let statement of this.statements) {
            node(statement)
        }
    }
    
    getLocalTable() {
        return this.localTable
    }
}