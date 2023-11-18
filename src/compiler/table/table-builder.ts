import {
    BinaryExpressionContainer
} from "compiler/components/nodes/expression/binary-expression/binary-expression-container.js";
import {
    LogicalExpressionContainer
} from "compiler/components/nodes/expression/binary-expression/logical-expression-container.js";
import {
    CallExpressionContainer
} from "compiler/components/nodes/expression/call-expression/call-expression-container.js";
import {
    StringCallExpressionContainer
} from "compiler/components/nodes/expression/call-expression/string-call-expression-container.js";
import {
    TableCallExpressionContainer
} from "compiler/components/nodes/expression/call-expression/table-call-expression-container.js";
import {FunctionExpressionContainer} from "compiler/components/nodes/expression/function-expression-container.js";
import {IndexExpressionContainer} from "compiler/components/nodes/expression/index-expression-container.js";
import {BooleanLiteralContainer} from "compiler/components/nodes/expression/literal/boolean-literal-container.js";
import {IdentifierContainer} from "compiler/components/nodes/expression/literal/identifier-container.js";
import {NilLiteralContainer} from "compiler/components/nodes/expression/literal/nil-literal-container.js";
import {NumericLiteralContainer} from "compiler/components/nodes/expression/literal/numeric-literal-container.js";
import {StringLiteralContainer} from "compiler/components/nodes/expression/literal/string-literal-container.js";
import {VarargLiteralContainer} from "compiler/components/nodes/expression/literal/vararg-literal-container.js";
import {MemberExpressionContainer} from "compiler/components/nodes/expression/member-expression-container.js";
import {
    TableConstructorExpressionContainer
} from "compiler/components/nodes/expression/table/table-constructor-expression-container.js";
import {TableKeyContainer} from "compiler/components/nodes/expression/table/table-entry/table-key-container.js";
import {
    TableKeyStringContainer
} from "compiler/components/nodes/expression/table/table-entry/table-key-string-container.js";
import {TableValueContainer} from "compiler/components/nodes/expression/table/table-entry/table-value-container.js";
import {UnaryExpressionContainer} from "compiler/components/nodes/expression/unary-expression-container.js";
import {Program} from "compiler/components/nodes/meta/program.js";
import {
    AssignmentStatementContainer
} from "compiler/components/nodes/statement/assign/assignment-statement-container.js";
import {LocalStatementContainer} from "compiler/components/nodes/statement/assign/local-statement-container.js";
import {BreakStatementContainer} from "compiler/components/nodes/statement/break-statement-container.js";
import {CallStatementContainer} from "compiler/components/nodes/statement/call-statement-container.js";
import {DoStatementContainer} from "compiler/components/nodes/statement/do-statement-container.js";
import {ForGenericStatementContainer} from "compiler/components/nodes/statement/for-generic-statement-container.js";
import {ForNumericStatementContainer} from "compiler/components/nodes/statement/for-numeric-statement-container.js";
import {GotoStatementContainer} from "compiler/components/nodes/statement/goto-statement-container.js";
import {ElseClauseContainer} from "compiler/components/nodes/statement/if-statement/clause/else-clause-container.js";
import {
    ElseifClauseContainer
} from "compiler/components/nodes/statement/if-statement/clause/elseif-clause-container.js";
import {IfClauseContainer} from "compiler/components/nodes/statement/if-statement/clause/if-clause-container.js";
import {IfStatementContainer} from "compiler/components/nodes/statement/if-statement/if-statement-container.js";
import {LabelStatementContainer} from "compiler/components/nodes/statement/label-statement-container.js";
import {RepeatStatementContainer} from "compiler/components/nodes/statement/repeat-statement-container.js";
import {ReturnStatementContainer} from "compiler/components/nodes/statement/return-statement-container.js";
import {WhileStatementContainer} from "compiler/components/nodes/statement/while-statement-container.js";
import {CommentContainer} from "compiler/components/nodes/trivia/comment-trivia-container.js";
import {Block} from "compiler/components/nodes/meta/block.js";
import {ChunkContainer} from "compiler/components/nodes/meta/chunk-container.js";
import {BinaryExpressionOperator, Container, NodeKind, UnaryExpressionOperator} from "../components/container-types.js";
import {ContainerFlag} from "../components/base-container.js";
import {LuaTiError} from "../error/lua-ti-error.js";
import {ObjectMap} from "./symbol-table-2.js";
import {LuaBasicType} from "../parser/annotation/annotation.js";
import {TypeKind} from "../type/type.js";
import {_Symbol, SymbolAttribute, SymbolTable} from "./symbol-table.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: SymbolTable) => void
}

const tableVisitor: TableVisitor = {
    [NodeKind.Program]: function (node: Program, table: SymbolTable): void {
        for (let chunk of node.chunks) {
            visit(chunk, table)
        }
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
        for (let i = 0; i < node.parameter.length; i++) {
            let parameterElement = node.parameter[i]
            parameterElement.flag = ContainerFlag.Parameter
            visit(parameterElement, node.functionBody.symbols)
        }
        if (node.identifier) {
            visit(node.identifier, table)
            node.symbol = node.identifier.symbol
        } else {
            node.functionBody.symbols.attribute = SymbolAttribute.FunctionBody
            node.symbol = new _Symbol(node)
        }
        node.symbol.attribute = SymbolAttribute.Function
        visit(node.block, table)
    },
    [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer, table: SymbolTable): void {
        for (let argument of node.arguments) {
            visit(argument, table)
        }
        try {
            table.escapeReturn(node)
        } catch (e) {
            console.warn('escape global body')
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
        for (let i = 0; i < node.variables.length; i++) {
            const variable = node.variables[i]
            const symbol = new _Symbol(variable)
            table.enter(variable.name, symbol)
            variable.symbol = symbol
        }
        for (let i = 0; i < node.init.length; i++) {
            visit(node.init[i], table)
        }
    },
    [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer, table: SymbolTable): void {
        for (let i = 0; i < node.variables.length; i++) {
            visit(node.variables[i], table)
        }
        for (let i = 0; i < node.init.length; i++) {
            visit(node.init[i], table)
        }
    },
    [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer, table: SymbolTable): void {
        throw new Error("Not implemented.")
    },
    [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, table: SymbolTable): void {
        throw new Error("Not implemented.")
    },
    [NodeKind.StringLiteral]: function (node: StringLiteralContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
    },
    [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
    },
    [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
    },
    [NodeKind.NilLiteral]: function (node: NilLiteralContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
    },
    [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
    },
    [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer, table: SymbolTable): void {
        node.symbol = new _Symbol(node)
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
        node.symbol = new _Symbol(node)
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
        node.symbol = new _Symbol(node)
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
            const argument = node.arguments[i]
            visit(argument, table)
        }
        visit(node.base, table)
        node.symbol = node.base.symbol.access(node)
    },
    [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, table: SymbolTable): void {
        visit(node.arguments, table)
        visit(node.base, table)
        node.symbol = node.base.symbol.access(node)
    },
    [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, table: SymbolTable): void {
        visit(node.argument, table)
        visit(node.base, table)
        node.symbol = node.base.symbol.access(node)
    },
    [NodeKind.Identifier]: function (node: IdentifierContainer, table: SymbolTable): void {
        node.symbol = getSymbolByParentContext(node.parent)
        
        function getSymbolByParentContext(parent: Container): _Symbol {
            switch (parent.kind) {
                case NodeKind.AssignmentStatement:
                    return global()
                case NodeKind.FunctionDeclaration:
                    if (parent.isLocal) {
                        return local()
                    } else {
                        return global()
                    }
                case NodeKind.MemberExpression:
                    return getSymbolByParentContext(parent.parent)
                case NodeKind.UnaryExpression:
                case NodeKind.CallExpression:
                case NodeKind.BinaryExpression:
                    return table.lookup(node.name)!
                default:
                    throw new Error()
            }
        }
        
        function local() {
            return table.lookup(node.name) || table.enter(node.name, new _Symbol(node))
        }
        
        function global() {
            return table.lookup(node.name) || table.global.enter(node.name, new _Symbol(node))
        }
    },
    [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, table: SymbolTable): void {
        visit(node.base, table)
        const symbol = node.base.symbol.lookup(node.identifier.name)
            || node.base.symbol.enter(node.identifier.name, new _Symbol(node.identifier))
        node.symbol = symbol.access(node)
    },
    [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, table: SymbolTable): void {
        visit(node.index, table)
        visit(node.base, table)
        node.symbol = node.base.symbol.access(node)
    },
    [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, table: SymbolTable): void {
        node.setConstructorTable(table.create())
        for (let i = 0; i < node.fields.length; i++) {
            let field = node.fields[i];
            if (field.kind === NodeKind.TableValue) {
                field.index = i
            }
            visit(field, table)
        }
    },
    [NodeKind.TableKey]: function (node: TableKeyContainer, table: SymbolTable): void {
        visit(node.key, node.parent.table)
        visit(node.value, table)
    },
    [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, table: SymbolTable): void {
        visit(node.key, node.parent.table)
        visit(node.value, table)
    },
    [NodeKind.TableValue]: function (node: TableValueContainer, table: SymbolTable): void {
        visit(node.value, table)
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

export function visitTableBuilder(program: Program) {
    for (let constant of program.constants) {
        visit(constant, program.symbols)
    }
    for (let declaration of program.declarations) {
        visit(declaration, program.symbols)
    }
    for (let source of program.sources) {
        visit(source, program.symbols)
    }
}

function visit(node: Container, table: SymbolTable) {
    try {
        if (node.compilerOptions.parserOptions) {
            if (node.compilerOptions.parserOptions.ignore.includes(node.kind)) {
                return
            }
        }
        tableVisitor[node.kind](node as never, table)
    } catch (e) {
        if (e instanceof LuaTiError) {
            throw e
        } else {
            throw e
        }
    }
}

export function entries<E>(obj: ObjectMap<E>): [string | number, E][] {
    return Object.keys(obj).map(x => [x, obj[x]])
}
