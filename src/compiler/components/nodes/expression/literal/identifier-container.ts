import {Identifier} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope/scope.js";
import {AbstractExpressionContainer} from "../abstract-expression-container.js";

import {Container, ExpressionType, NodeKind} from "../../../types.js";
import {EntryLike, SymbolEntry} from "../../../../table/symbol-table.js";

export class IdentifierContainer extends AbstractExpressionContainer<NodeKind.Identifier> {
    public type = ExpressionType.Unknown
    public readonly kind = NodeKind.Identifier;
    _entry: EntryLike | undefined;
    
    constructor(
        public readonly node: Identifier,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope)
    }
    
    lookup(): SymbolEntry | undefined {
        return this.symbols.lookup(this.name)
    }
    
    get name(): string {
        return this.node.name
    }
    
    forEachChild(node: (node: Container) => void) {
    }
    
}