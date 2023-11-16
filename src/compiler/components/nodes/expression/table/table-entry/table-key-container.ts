import {TableKey} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope.js";
import {createContainer, ExpressionContainer, NodeKind} from "../../../../container-types.js";
import {TableConstructorExpressionContainer} from "../table-constructor-expression-container.js";
import {AbstractExpressionContainer} from "../../abstract-expression-container.js";

export class TableKeyContainer extends AbstractExpressionContainer<NodeKind.TableKey> {
    public readonly key: ExpressionContainer
    public readonly value: ExpressionContainer
    public readonly kind = NodeKind.TableKey
    
    constructor(
        public readonly node: TableKey,
        public readonly parent: TableConstructorExpressionContainer,
        scope: Scope) {
        super(scope);
        this.key = createContainer(node.key, this, this.scope) as ExpressionContainer
        this.value = createContainer(node.value, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.value)
        node(this.key)
    }
}