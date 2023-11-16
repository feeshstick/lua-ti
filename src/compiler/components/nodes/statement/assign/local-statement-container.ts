import {LocalStatement} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "../../expression/literal/identifier-container.js";
import {BaseContainer} from "../../../base-container.js";
import {Scope} from "../../../scope.js";
import {Container, createContainer, ExpressionContainer, NodeKind} from "../../../container-types.js";

export class LocalStatementContainer extends BaseContainer<NodeKind.LocalStatement> {
    public readonly init: ExpressionContainer[]
    public readonly variables: IdentifierContainer[];
    public readonly kind = NodeKind.LocalStatement
    
    constructor(
        public readonly node: LocalStatement,
        public readonly parent: Container,
        scope: Scope,
        injectInit?: ExpressionContainer[]
    ) {
        super(scope);
        if (injectInit) {
            this.init = injectInit
        } else {
            this.init = node.init.map(x => createContainer(x, this, this.scope)) as ExpressionContainer[]
        }
        this.variables = node.variables.map(x => createContainer(x, this, this.scope)) as IdentifierContainer[]
        for (let variable of this.variables) {
            variable._stopPropagation = true
        }
    }
    
    forEachChild(node: (node: ExpressionContainer) => void) {
        for (let variable of this.variables) {
            node(variable)
        }
        for (let initElement of this.init) {
            node(initElement)
        }
    }
}