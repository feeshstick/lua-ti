import {BaseContainer} from "../../base-container.js";
import {Block, Container, createContainer, NodeKind, StatementContainer} from "../../types.js";
import {Scope} from "../../../scope/scope.js";
import {createTable, LocalTable} from "../../../table/symbol-table.js";

export class BlockContainer extends BaseContainer<NodeKind.Block> {
    public readonly kind = NodeKind.Block
    public readonly statements: StatementContainer[];
    private readonly localTable: LocalTable
    
    constructor(
        public readonly node: Block,
        public readonly parent: Container,
        scope: Scope,
    ) {
        super(scope)
        this.localTable = createTable(this.parent.__table)
        this.statements = this.node.statements.map(statement => createContainer(statement, this, this.scope) as StatementContainer)
    }
    
    print() {
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