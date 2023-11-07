import {FunctionDeclaration} from "luaparse/lib/ast.js";
import {IdentifierContainer} from "./literal/identifier-container.js";
import {VarargLiteralContainer} from "./literal/vararg-literal-container.js";
import {Scope} from "../../../scope/scope.js";
import {AbstractExpressionContainer} from "./abstract-expression-container.js";

import {Container, createContainer, NodeKind, ParameterContainer} from "../../types.js";
import {MemberExpressionContainer} from "./member-expression-container.js";

import {BlockContainer} from "../meta/block-container.js";
import {FunctionBodyTable, FunctionEntry, ParameterEntry} from "../../../table/symbol-table.js";
import {ReturnStatementContainer} from "../statement/return-statement-container.js";

export class FunctionExpressionContainer extends AbstractExpressionContainer<NodeKind.FunctionDeclaration> {
    public readonly parameter: Array<IdentifierContainer | VarargLiteralContainer>
    public override readonly block: BlockContainer<FunctionBodyTable>
    public readonly identifier: IdentifierContainer | MemberExpressionContainer | null
    public readonly kind = NodeKind.FunctionDeclaration;
    _returns: ReturnStatementContainer[] = [];
    
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
        this.block = new BlockContainer({
            type: 'Block',
            statements: this.node.body,
            range: this.range,
            loc: this.node.loc
        }, this, blockScope, this.symbols.createFunctionBody(new FunctionEntry(new Map(this.parameter.map((param, i) => {
            switch (param.kind) {
                case NodeKind.VarargLiteral:
                    return ['...', new ParameterEntry({offset : i})]
                case NodeKind.Identifier:
                    return [param.name, new ParameterEntry({offset : i})]
            }
        })), [])))
        if (this.node.identifier) {
            this.identifier = createContainer(this.node.identifier, this, scope) as IdentifierContainer | MemberExpressionContainer
        } else {
            this.identifier = null
        }
    }
    
    get isLocal(): boolean {
        return this.node.isLocal
    }
    
    forEachChild(node: (node: IdentifierContainer | VarargLiteralContainer | BlockContainer<FunctionBodyTable> | MemberExpressionContainer) => void) {
        if (this.identifier) node(this.identifier)
        for (let parameterElement of this.parameter) {
            node(parameterElement)
        }
        node(this.block)
    }
    
}