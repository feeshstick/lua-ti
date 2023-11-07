import {TableKey} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../../../base-container.js";
import {Scope} from "../../../../../scope/scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../../types.js";

export class TableKeyContainer extends BaseContainer<NodeKind.TableKey> {
    public readonly key: ExpressionContainer
    public readonly value: ExpressionContainer
    public readonly kind = NodeKind.TableKey
    
    constructor(
        public readonly node: TableKey,
        public readonly parent: Container,
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