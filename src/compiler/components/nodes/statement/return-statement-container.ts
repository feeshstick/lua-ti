import {ReturnStatement} from "luaparse/lib/ast.js";
import {BaseContainer} from "../../base-container.js";
import {Scope} from "../../../scope/scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../types.js";
import {FunctionEntry} from "../../../table/symbol-table.js";

export class ReturnStatementContainer extends BaseContainer<NodeKind.ReturnStatement> {
    public readonly arguments: ExpressionContainer[]
    public readonly kind = NodeKind.ReturnStatement;
    _ofFunctionRef: FunctionEntry | undefined;
    
    constructor(public readonly node: ReturnStatement,
                public readonly parent: Container,
                scope: Scope) {
        super(scope);
        this.arguments = node.arguments.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        for (let argument of this.arguments) {
            node(argument)
        }
    }
}