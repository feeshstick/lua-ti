import {TableValue} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../../scope/scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../../types.js";

export class TableValueContainer extends BaseContainer<NodeKind.TableValue> {
    public readonly value: ExpressionContainer
    public readonly kind = NodeKind.TableValue
    
    constructor(
        public readonly node: TableValue,
        public readonly parent: Container,
        scope: Scope) {
        super(scope);
        this.value = createContainer(node.value, this, this.scope) as ExpressionContainer
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        node(this.value)
    }
}