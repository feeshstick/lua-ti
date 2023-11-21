import {FunctionDeclaration} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "./literal/identifier-container.js";
import {VarargLiteralContainer} from "./literal/vararg-literal-container.js";
import {Scope} from "../../scope.js";
import {AbstractExpressionContainer} from "./abstract-expression-container.js";

import {Container, createContainer, NodeKind, ParameterContainer} from "../../container-types.js";
import {MemberExpressionContainer} from "./member-expression-container.js";

import {Block, ContainerFlag2} from "../meta/block.js";
import {SymbolAttribute} from "../../../table/symbol-table.js";

export class FunctionExpressionContainer extends AbstractExpressionContainer<NodeKind.FunctionDeclaration> {
    public readonly parameter: Array<ParameterContainer>
    public override readonly block: Block
    public readonly identifier: IdentifierContainer | MemberExpressionContainer | null
    public readonly kind = NodeKind.FunctionDeclaration;
    
    constructor(
        public readonly node: FunctionDeclaration,
        public readonly parent: Container,
        scope: Scope
    ) {
        super(scope)
        const blockScope = scope.createScope(this)
        const parameterList: ParameterContainer[] = []
        let hasVarargs: boolean = false
        for (let parameterNode of this.node.parameters) {
            const parameter = createContainer(parameterNode, this, blockScope) as ParameterContainer
            parameter.attribute = SymbolAttribute.ParameterDeclaration
            parameterList.push(parameter)
            if (parameter.kind === NodeKind.VarargLiteral) {
                if (hasVarargs) {
                    console.error('multiple declaration of variable arguments at ' + this.range.join(':'))
                    throw new Error()
                }
                hasVarargs = true
            } else {
                if (hasVarargs) {
                    console.error('parameter declaration after variable arguments at ' + this.range.join(':'))
                    throw new Error()
                }
            }
        }
        this.parameter = parameterList
        this.block = new Block({
            type: 'Block',
            statements: this.node.body,
            range: this.range,
            loc: this.node.loc
        }, this, ContainerFlag2.FunctionScope, blockScope)
        if (this.node.identifier) {
            this.identifier = createContainer(this.node.identifier, this, scope) as IdentifierContainer | MemberExpressionContainer
        } else {
            this.identifier = null
        }
    }
    
    get functionBody(): Block {
        return this.block
    }
    
    get isLocal(): boolean {
        return this.node.isLocal
    }
    
    forEachChild(node: (node: IdentifierContainer | VarargLiteralContainer | Block | MemberExpressionContainer) => void) {
        if (this.identifier) node(this.identifier)
        for (let parameterElement of this.parameter) {
            node(parameterElement)
        }
        node(this.block)
    }
}