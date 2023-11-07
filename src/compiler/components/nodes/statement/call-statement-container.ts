import {CallStatement} from "luaparse/lib/ast.js";
import {CallExpressionContainer} from "../expression/call-expression/call-expression-container.js";
import {StringCallExpressionContainer} from "../expression/call-expression/string-call-expression-container.js";
import {TableCallExpressionContainer} from "../expression/call-expression/table-call-expression-container.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {Container, createContainer, NodeKind} from "../../types.js";
import {FunctionExpressionContainer} from "../expression/function-expression-container.js";

export class CallStatementContainer extends BaseContainer<NodeKind.CallStatement> {
    
    public readonly expression: CallExpressionContainer | StringCallExpressionContainer | TableCallExpressionContainer;
    public readonly kind = NodeKind.CallStatement;
    _callFromRef: FunctionExpressionContainer | undefined;
    
    constructor(
        public readonly node: CallStatement,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope);
        this.expression = createContainer(node.expression, this, this.scope) as CallExpressionContainer | StringCallExpressionContainer | TableCallExpressionContainer;
    }
    
    forEachChild(node: (node: CallExpressionContainer | StringCallExpressionContainer | TableCallExpressionContainer) => void) {
        node(this.expression)
    }
}