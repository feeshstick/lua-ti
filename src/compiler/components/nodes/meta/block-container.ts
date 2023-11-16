import {BaseContainer} from "../../base-container.js";
import {Block, Container, createContainer, NodeKind, StatementContainer} from "../../container-types.js";
import {Scope} from "../../scope.js";
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
        this.localTable = createTable(this.parent.table)
        this.localTable.name = this.parent.kind + ' ' + this.parent.id
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
    
    getLocalTable() {
        return this.localTable
    }
}