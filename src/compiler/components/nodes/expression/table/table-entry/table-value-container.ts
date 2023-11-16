import {TableValue} from "luaparse/lib/ast.js";
import {Scope} from "../../../../scope.js";
import {createContainer, ExpressionContainer, NodeKind} from "../../../../container-types.js";
import {TableConstructorExpressionContainer} from "../table-constructor-expression-container.js";
import {AbstractExpressionContainer} from "../../abstract-expression-container.js";

export class TableValueContainer extends AbstractExpressionContainer<NodeKind.TableValue> {
    public readonly value: ExpressionContainer
    public readonly kind = NodeKind.TableValue
    public index: number = -1
    
    constructor(
        public readonly node: TableValue,
        public readonly parent: TableConstructorExpressionContainer,
        scope: Scope) {
        super(scope);
        this.value = createContainer(node.value, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.value)
    }
}