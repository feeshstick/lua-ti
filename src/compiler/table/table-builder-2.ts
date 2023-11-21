import {
    BinaryExpressionOperator,
    Container,
    ExpressionContainer,
    NodeKind,
    UnaryExpressionOperator
} from "../components/container-types.js";
import {SymbolTable, Token} from "./symbol-table.js";
import {Program} from "../components/nodes/meta/program.js";
import {ChunkContainer} from "../components/nodes/meta/chunk-container.js";
import {Block} from "../components/nodes/meta/block.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {ReturnStatementContainer} from "../components/nodes/statement/return-statement-container.js";
import {IfStatementContainer} from "../components/nodes/statement/if-statement/if-statement-container.js";
import {IfClauseContainer} from "../components/nodes/statement/if-statement/clause/if-clause-container.js";
import {ElseifClauseContainer} from "../components/nodes/statement/if-statement/clause/elseif-clause-container.js";
import {ElseClauseContainer} from "../components/nodes/statement/if-statement/clause/else-clause-container.js";
import {WhileStatementContainer} from "../components/nodes/statement/while-statement-container.js";
import {DoStatementContainer} from "../components/nodes/statement/do-statement-container.js";
import {RepeatStatementContainer} from "../components/nodes/statement/repeat-statement-container.js";
import {LocalStatementContainer} from "../components/nodes/statement/assign/local-statement-container.js";
import {AssignmentStatementContainer} from "../components/nodes/statement/assign/assignment-statement-container.js";
import {ForNumericStatementContainer} from "../components/nodes/statement/for-numeric-statement-container.js";
import {ForGenericStatementContainer} from "../components/nodes/statement/for-generic-statement-container.js";
import {StringLiteralContainer} from "../components/nodes/expression/literal/string-literal-container.js";
import {NumericLiteralContainer} from "../components/nodes/expression/literal/numeric-literal-container.js";
import {BooleanLiteralContainer} from "../components/nodes/expression/literal/boolean-literal-container.js";
import {NilLiteralContainer} from "../components/nodes/expression/literal/nil-literal-container.js";
import {VarargLiteralContainer} from "../components/nodes/expression/literal/vararg-literal-container.js";
import {
    BinaryExpressionContainer
} from "../components/nodes/expression/binary-expression/binary-expression-container.js";
import {LuaBasicType} from "../parser/annotation/annotation.js";
import {
    LogicalExpressionContainer
} from "../components/nodes/expression/binary-expression/logical-expression-container.js";
import {TypeKind} from "../type/type.js";
import {UnaryExpressionContainer} from "../components/nodes/expression/unary-expression-container.js";
import {CallStatementContainer} from "../components/nodes/statement/call-statement-container.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";
import {
    TableCallExpressionContainer
} from "../components/nodes/expression/call-expression/table-call-expression-container.js";
import {
    StringCallExpressionContainer
} from "../components/nodes/expression/call-expression/string-call-expression-container.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";
import {MemberExpressionContainer} from "../components/nodes/expression/member-expression-container.js";
import {IndexExpressionContainer} from "../components/nodes/expression/index-expression-container.js";
import {
    TableConstructorExpressionContainer
} from "../components/nodes/expression/table/table-constructor-expression-container.js";
import {TableKeyContainer} from "../components/nodes/expression/table/table-entry/table-key-container.js";
import {TableKeyStringContainer} from "../components/nodes/expression/table/table-entry/table-key-string-container.js";
import {TableValueContainer} from "../components/nodes/expression/table/table-entry/table-value-container.js";
import {CommentContainer} from "../components/nodes/trivia/comment-trivia-container.js";
import {LabelStatementContainer} from "../components/nodes/statement/label-statement-container.js";
import {BreakStatementContainer} from "../components/nodes/statement/break-statement-container.js";
import {GotoStatementContainer} from "../components/nodes/statement/goto-statement-container.js";
import {VariableContainer} from "../components/nodes/expression/variable-container.js";

export type TableVisitor2 = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: SymbolTable) => void
}

export function leftMostExpression(node: ExpressionContainer): ExpressionContainer {
    switch (node.kind) {
        case NodeKind.NilLiteral:
        case NodeKind.Identifier:
        case NodeKind.StringLiteral:
        case NodeKind.NumericLiteral:
        case NodeKind.BooleanLiteral:
        case NodeKind.VarargLiteral:
            return node
        case NodeKind.TableConstructorExpression:
            return node
        case NodeKind.BinaryExpression:
            return leftMostExpression(node.left)
        case NodeKind.LogicalExpression:
            return leftMostExpression(node.left)
        case NodeKind.UnaryExpression:
            return leftMostExpression(node.argument)
        case NodeKind.MemberExpression:
            return leftMostExpression(node.base)
        case NodeKind.IndexExpression:
            return leftMostExpression(node.base)
        case NodeKind.CallExpression:
            return leftMostExpression(node.base)
        case NodeKind.TableCallExpression:
            return leftMostExpression(node.base)
        case NodeKind.StringCallExpression:
            return leftMostExpression(node.base)
        case NodeKind.FunctionDeclaration:
            return node.identifier ? leftMostExpression(node.identifier) : node
    }
}

function applyAssignment(variables: VariableContainer[], expression: ExpressionContainer) {
    const instance = expression.symbol.properties.instance
    if (instance) {
        if (variables.length > 1) {
            if (instance instanceof Array) {
                for (let i = 0; i < variables.length; i++) {
                    const value = instance[i]
                    if (value instanceof Token) {
                        variables[i].symbol = value
                        variables[i].symbol.properties.instance = value.properties.instance
                    } else {
                        variables[i].symbol = new Token()
                        variables[i].symbol.properties.instance = value || null
                    }
                }
            } else {
                throw new Error()
            }
        } else {
            if (instance instanceof Token) {
                variables[0].symbol = instance
                variables[0].symbol.properties.instance = instance.properties.instance
            } else {
                variables[0].symbol = new Token()
                variables[0].symbol.properties.instance = null
            }
        }
    } else {
        for (let variable of variables) {
            variable.symbol = new Token()
            variable.symbol.properties.instance = null
        }
    }
}

const tableVisitor: TableVisitor2 = {
    [NodeKind.Program]: function (node: Program, table: SymbolTable): void {
        visit(node.source, table)
    },
    [NodeKind.Chunk]: function (node: ChunkContainer, table: SymbolTable): void {
        visit(node.block, table)
    },
    [NodeKind.Block]: function (node: Block, table: SymbolTable): void {
        for (let statement of node.statements) {
            visit(statement, node.symbols)
        }
    },
    [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer, table: SymbolTable): void {
        if (node.identifier) {
            if (node.isLocal) {
                const leftMost = leftMostExpression(node.identifier)
                if (leftMost && leftMost.kind === NodeKind.Identifier) {
                    if (!table.has(leftMost.name)) {
                        table.enter(leftMost.name, new Token())
                    }
                } else {
                    throw new Error()
                }
                visit(node.identifier, table)
            } else {
                visit(node.identifier, table)
            }
            const typeGuide = node.identifier.symbol.properties.typeGuide
            if (typeGuide) {
                for (let typeGuideElement of typeGuide) {
                    if (!(typeGuideElement instanceof Array)) {
                        if (typeGuideElement.type === 'function') {
                            typeGuideElement.parameter(...node.parameter)
                            console.log(typeGuideElement)
                        }
                    }
                }
            }
        } else {
            throw new Error("Not implemented.")
        }
        for (let i = 0; i < node.parameter.length; i++) {
            let parameter = node.parameter[i];
            switch (parameter.kind) {
                case NodeKind.VarargLiteral:
                    break;
                case NodeKind.Identifier:
                    if (!parameter.hasSymbol) {
                        parameter.symbol = node.functionBody.symbols.enter(parameter.name, new Token(parameter))
                    } else {
                        node.functionBody.symbols.enter(parameter.name, parameter.symbol)
                    }
                    break;
            }
        }
        visit(node.block, table)
    },
    [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer, table: SymbolTable): void {
        for (let i = 0; i < node.arguments.length; i++) {
            let argument = node.arguments[i];
            visit(argument, table)
        }
    },
    [NodeKind.IfStatement]: function (node: IfStatementContainer, table: SymbolTable): void {
        for (let clause of node.clauses) {
            visit(clause, table)
        }
    },
    [NodeKind.IfClause]: function (node: IfClauseContainer, table: SymbolTable): void {
        visit(node.condition, table)
        visit(node.block, table)
    },
    [NodeKind.ElseifClause]: function (node: ElseifClauseContainer, table: SymbolTable): void {
        visit(node.condition, table)
        visit(node.block, table)
    },
    [NodeKind.ElseClause]: function (node: ElseClauseContainer, table: SymbolTable): void {
        visit(node.block, table)
    },
    [NodeKind.WhileStatement]: function (node: WhileStatementContainer, table: SymbolTable): void {
        visit(node.condition, table)
        visit(node.block, table)
    },
    [NodeKind.DoStatement]: function (node: DoStatementContainer, table: SymbolTable): void {
        visit(node.block, table)
    },
    [NodeKind.RepeatStatement]: function (node: RepeatStatementContainer, table: SymbolTable): void {
        visit(node.condition, table)
        visit(node.block, table)
    },
    [NodeKind.LocalStatement]: function (node: LocalStatementContainer, table: SymbolTable): void {
        for (let i = 0; i < node.init.length; i++) {
            let init = node.init[i];
            visit(init, table)
        }
        for (let [, variables, expression] of table.getAssignmentsByContainerDeep(node)) {
            applyAssignment(variables, expression)
        }
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            variable.symbol.declarations.push(variable)
            table.lookup(variable.name) || table.enter(variable.name, variable.symbol)
        }
    },
    [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer, table: SymbolTable): void {
        for (let i = 0; i < node.init.length; i++) {
            let init = node.init[i];
            visit(init, table)
        }
        for (let [, variables, expression] of table.getAssignmentsByContainerDeep(node)) {
            applyAssignment(variables, expression)
        }
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i];
            switch (variable.kind) {
                case NodeKind.Identifier:
                    table.lookup(variable.name) || table.global.enter(variable.name, new Token(variable))
                    break;
                case NodeKind.IndexExpression:
                    if (!variable.base.hasSymbol) {
                        visit(variable.base, table)
                        visit(variable.index, table)
                    }
                    break;
                case NodeKind.MemberExpression:
                    visit(variable.base, table)
                    variable.base.symbol.lookup(variable.identifier.name) || variable.base.symbol.enter(variable.identifier.name, new Token(variable.identifier))
                    break;
            }
            variable.symbol.declarations.push(variable)
        }
    },
    [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer, table: SymbolTable): void {
        throw new Error("Not implemented.")
    },
    [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, table: SymbolTable): void {
        throw new Error("Not implemented.")
    },
    [NodeKind.StringLiteral]: function (node: StringLiteralContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.NilLiteral]: function (node: NilLiteralContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        node.symbol.properties.instance = null
    },
    [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
    },
    [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        switch (node.operator) {
            case BinaryExpressionOperator.add:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.sub:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.mul:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.mod:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.exp:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.div:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.divFloor:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.and:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.or:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.xor:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.shiftLeft:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.shiftRight:
                node.type = LuaBasicType.Number
                break;
            case BinaryExpressionOperator.concat:
                node.type = LuaBasicType.String
                break;
            case BinaryExpressionOperator.compare_ne:
                node.type = LuaBasicType.Boolean
                break;
            case BinaryExpressionOperator.compare_eq:
                node.type = LuaBasicType.Boolean
                break;
            case BinaryExpressionOperator.compare_lt:
                node.type = LuaBasicType.Boolean
                break;
            case BinaryExpressionOperator.compare_le:
                node.type = LuaBasicType.Boolean
                break;
            case BinaryExpressionOperator.compare_gt:
                node.type = LuaBasicType.Boolean
                break;
            case BinaryExpressionOperator.compare_ge:
                node.type = LuaBasicType.Boolean
                break;
        }
        visit(node.left, table)
        visit(node.right, table)
    },
    [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        switch (node.operator) {
            case "or":
                visit(node.left, table)
                visit(node.right, table)
                node.type = {
                    kind: TypeKind.Conditional,
                    left: node.left.type,
                    right: node.right.type
                }
                break
            case "and":
                visit(node.left, table)
                visit(node.right, table)
                node.type = {
                    kind: TypeKind.Conditional,
                    left: node.right.type,
                    right: node.left.type
                }
                break
        }
    },
    [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer, table: SymbolTable): void {
        node.symbol = new Token(node)
        switch (node.operator) {
            case UnaryExpressionOperator.Not:
                node.type = LuaBasicType.Boolean
                break;
            case UnaryExpressionOperator.Length:
                node.type = LuaBasicType.Number
                break;
            case UnaryExpressionOperator.BitNegate:
                node.type = LuaBasicType.Number
                break;
            case UnaryExpressionOperator.ArithmeticNegate:
                node.type = LuaBasicType.Number
                break;
        }
        visit(node.argument, table)
    },
    [NodeKind.CallStatement]: function (node: CallStatementContainer, table: SymbolTable): void {
        visit(node.expression, table)
    },
    [NodeKind.CallExpression]: function (node: CallExpressionContainer, table: SymbolTable): void {
        for (let i = 0; i < node.arguments.length; i++) {
            let argument = node.arguments[i];
            visit(argument, table)
        }
        visit(node.base, table)
        if (node.base.hasSymbol) {
            const _function = node.base.symbol.properties.instance
            if (_function && typeof _function === 'function') {
                node.symbol = new Token(node)
                node.symbol.properties.instance = _function(...node.arguments.map(x => x.symbol))
            } else {
                console.error(node.base.text, 'no call')
                throw new Error()
            }
            // printSymbolTable(node.base.symbol)
        }
    },
    [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, table: SymbolTable): void {
        visit(node.base, table)
    },
    [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, table: SymbolTable): void {
        visit(node.base, table)
    },
    [NodeKind.Identifier]: function (node: IdentifierContainer, table: SymbolTable): void {
        if (!node.hasSymbol) {
            node.symbol = table.lookup(node.name) || table.global.enter(node.name, new Token(node))
        }
    },
    [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, table: SymbolTable): void {
        visit(node.base, table)
        switch (node.indexer) {
            case ".":
                node.identifier.symbol = node.base.symbol.lookup(node.identifier.name) || node.base.symbol.enter(node.identifier.name, new Token(node.identifier))
                node.symbol = node.identifier.symbol
                break
            case ":":
                console.log(node.base.symbol.properties.type)
                if (!node.base.hasSymbol) {
                    console.log('no sym')
                }
                break
        }
    },
    [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, table: SymbolTable): void {
        visit(node.index, table)
        visit(node.base, table)
    },
    [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, table: SymbolTable): void {
        const symbol = new Token(node)
        for (let i = 0; i < node.fields.length; i++) {
            let field = node.fields[i];
            switch (field.kind) {
                case NodeKind.TableKey:
                    throw new Error("Not implemented.")
                    break;
                case NodeKind.TableKeyString:
                    throw new Error("Not implemented.")
                    break;
                case NodeKind.TableValue:
                    throw new Error("Not implemented.")
                    break;
            }
        }
        node.symbol = symbol
    },
    [NodeKind.TableKey]: function (node: TableKeyContainer, table: SymbolTable): void {
    },
    [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, table: SymbolTable): void {
    },
    [NodeKind.TableValue]: function (node: TableValueContainer, table: SymbolTable): void {
    },
    [NodeKind.Comment]: function (node: CommentContainer): void {
    },
    [NodeKind.LabelStatement]: function (node: LabelStatementContainer): void {
    },
    [NodeKind.BreakStatement]: function (node: BreakStatementContainer): void {
    },
    [NodeKind.GotoStatement]: function (node: GotoStatementContainer): void {
    }
}

export function visitTableBuilder2(program: Program) {
    visit(program.source, program.source.symbols)
}

function visit(node: Container, table: SymbolTable) {
    if (node.compilerOptions.parserOptions && node.compilerOptions.parserOptions.ignore.includes(node.kind)) {
        return
    }
    tableVisitor[node.kind](node as never, table)
}
