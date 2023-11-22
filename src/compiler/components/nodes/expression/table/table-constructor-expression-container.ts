import {TableConstructorExpression} from "luaparse/lib/ast.js";
import {TableKeyContainer} from "./table-entry/table-key-container.js";
import {TableKeyStringContainer} from "./table-entry/table-key-string-container.js";
import {TableValueContainer} from "./table-entry/table-value-container.js";
import {Scope} from "../../../scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, createContainer, NodeKind} from "../../../container-types.js";
import {SymbolTable} from "../../../../table/symbol-table.js";

export type TableEntryContainer =
    | TableKeyContainer
    | TableKeyStringContainer
    | TableValueContainer

export class TableConstructorExpressionContainer extends AbstractExpressionContainer<NodeKind.TableConstructorExpression> {
    public readonly fields: Array<TableEntryContainer>
    public readonly kind = NodeKind.TableConstructorExpression
    private _table: SymbolTable | undefined
    
    constructor(
        public readonly node: TableConstructorExpression,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
        this.fields = node.fields.map(x => createContainer(x, this, scope)) as Array<TableEntryContainer>
        for (let i = 0; i < this.fields.length; i++) {
            let field = this.fields[i];
            if (field.kind === NodeKind.TableValue) {
                field.index = i + 1
            }
        }
    }
    
    setConstructorTable(table: SymbolTable){
        this._table = table
    }
    
    get table(): SymbolTable {
        if (this._table) {
            return this._table
        } else {
            throw new Error()
        }
    }
    
    forEachChild(node: (node: TableEntryContainer) => void) {
        for (let field of this.fields) {
            node(field)
        }
    }
}