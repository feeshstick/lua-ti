import {TableKeyString} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../../literal/identifier-container.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../../scope/scope.js";
import {createContainer, ExpressionContainer, NodeKind} from "../../../../types.js";
import {TableConstructorExpressionContainer} from "../table-constructor-expression-container.js";

export class TableKeyStringContainer extends BaseContainer<NodeKind.TableKeyString> {
    public readonly key: IdentifierContainer
    public readonly value: ExpressionContainer
    public readonly kind = NodeKind.TableKeyString
    
    constructor(
        public readonly node: TableKeyString,
        public readonly parent: TableConstructorExpressionContainer,
        scope: Scope) {
        super(scope);
        this.key = createContainer(node.key, this, this.scope) as IdentifierContainer
        this.value = createContainer(node.value, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.value)
        node(this.key)
    }
}