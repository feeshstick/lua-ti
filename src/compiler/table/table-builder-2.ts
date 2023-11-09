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
import {BlockContainer} from "compiler/components/nodes/meta/block-container.js";
import {ChunkContainer} from "compiler/components/nodes/meta/chunk-container.js";
import {SourceFileContainer} from "compiler/components/nodes/meta/source-file-container.js";
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
import {binaryOperatorToTypeMap, Container, NodeKind, unaryOperatorToTypeMap} from "../components/types.js";
import {SymbolTable} from "./symbol-table.js";
import {Primitive} from "../type/type-system.js";
import {
    ContainerFlag,
    isCall,
    isDeclarationFlag,
    isParameterDeclarationFlag,
    isScopeFlag
} from "../components/base-container.js";
import {isFunction} from "rxjs/internal/util/isFunction";
import {LuaTiError} from "../error/lua-ti-error.js";
import {addMemberToVariable, createVariable, SymbolFlag} from "./symbol-table-2.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, { kind: A }> : never) => void
};

export const tableVisitor: TableVisitor = {
    [NodeKind.SourceFile]: function (node: SourceFileContainer): void {
        for (let chunk of node.chunks) {
            visit(chunk)
        }
    },
    [NodeKind.Chunk]: function (node: ChunkContainer): void {
        visit(node.block)
    },
    [NodeKind.Block]: function (node: BlockContainer<SymbolTable>): void {
        for (let statement of node.statements) {
            visit(statement)
        }
    },
    [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer): void {
        for (let parameterElement of node.parameter) {
            parameterElement.flag = ContainerFlag.ParameterDeclaration
            visit(parameterElement)
        }
        if (node.identifier) {
            if (node.isLocal) {
                node.identifier.flag = ContainerFlag.StaticDeclaration
            } else {
                node.identifier.flag = ContainerFlag.ScopeDeclaration
            }
            visit(node.identifier)
        } else {
            node.deprSetFlag('function expression without declaration')
        }
        visit(node.block)
    },
    [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer): void {
        for (let argument of node.arguments) {
            argument.deprSetFlag('returned')
            visit(argument)
        }
    },
    [NodeKind.IfStatement]: function (node: IfStatementContainer): void {
        for (let clause of node.clauses) {
            visit(clause)
        }
    },
    [NodeKind.WhileStatement]: function (node: WhileStatementContainer): void {
        visit(node.condition)
        visit(node.block)
    },
    [NodeKind.DoStatement]: function (node: DoStatementContainer): void {
        visit(node.block)
    },
    [NodeKind.RepeatStatement]: function (node: RepeatStatementContainer): void {
        visit(node.condition)
        visit(node.block)
    },
    [NodeKind.LocalStatement]: function (node: LocalStatementContainer): void {
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            let expression = node.init[i]
            variable.flag = ContainerFlag.ScopeDeclaration
            visit(variable)
            if (expression) {
                visit(expression)
            }
            variable._type = expression._type
        }
    },
    [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer): void {
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            variable.flag = ContainerFlag.StaticDeclaration
            visit(variable)
            let expression = node.init[i]
            if (expression) {
                visit(expression)
            }
            variable._type = expression._type
        }
    },
    [NodeKind.CallStatement]: function (node: CallStatementContainer): void {
        visit(node.expression)
    },
    [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer): void {
        visit(node.start)
        visit(node.end)
        if (node.step) visit(node.step)
        visit(node.block)
    },
    [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer): void {
        for (let variable of node.variables) {
            visit(variable)
        }
        for (let iterator of node.iterators) {
            visit(iterator)
        }
    },
    [NodeKind.Identifier]: function (node: IdentifierContainer): void {
        if (isDeclarationFlag(node.flag)) {
            const currentDeclaration = createVariable(node, node.name)
            if (node.__table.has(node.name)) {
                const previousDeclaration = node.__table.member[node.name]
                // add compiler options here
                throw LuaTiError.duplicateDeclaration(previousDeclaration, currentDeclaration)
            } else {
                if (isScopeFlag(node.flag)) {
                    if (isParameterDeclarationFlag(node.flag)) {
                        node.__table.setParameter(node.name, currentDeclaration)
                    } else {
                        node.__table.member[node.name] = currentDeclaration
                    }
                } else {
                    node.__table._ENV.member[node.name] = currentDeclaration
                }
            }
            node.setEntry(currentDeclaration, LuaTiError.overwriteEntryDirect(node, currentDeclaration))
        } else {
            node.__symbol = node.__table.lookup(node.name, LuaTiError.cannotFindName(node))
            node.__symbol.declarations.push(node)
        }
    },
    [NodeKind.StringLiteral]: function (node: StringLiteralContainer): void {
        node._type = Primitive.String
    },
    [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer): void {
        node._type = Primitive.Number
    },
    [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer): void {
        node._type = Primitive.Bool
    },
    [NodeKind.NilLiteral]: function (node: NilLiteralContainer): void {
        node._type = Primitive.Nil
    },
    [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer): void {
        
    },
    [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer): void {
        for (let i = 0; i < node.fields.length; i++) {
            let field = node.fields[i];
            field.deprSetFlag('is field at index ' + i)
            visit(field)
        }
    },
    [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer): void {
        node.__symbol = createVariable(node)
        switch (node.operator) {
            case "+": // check for x + 0 = 0 + x = x
            case "-": // check for x - 0 = x
            case "*": // check for x * 1 = x or x * 0 = 0
            case "%": // check for % 0
            case "^":
            case "/":
            case "//":
            case "&":
            case "|":
            case "~":
            case "<<":
            case ">>":
                node.__symbol.flag = SymbolFlag.ArithmeticBinaryExpression
                break;
            case "..":
                node.__symbol.flag = SymbolFlag.StringConcat
                break;
            case "~=":
            case "==":
                // equality might be important for conditions type(e) == "string"
                // e.g.: if type(e) == "string" then <e:string> else <e:Exclude<any, 'string'>>
                node.__symbol.flag = SymbolFlag.EqualityBinaryExpression
                break;
            case "<":
            case "<=":
            case ">":
            case ">=":
                // might be important for ranged literals
                // e.g.: if a > b then <a always > b> else <a == b || a < b>
                node.__symbol.flag = SymbolFlag.CompareBinaryExpression
                break;
        }
        visit(node.left)
        visit(node.right)
    },
    [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer): void {
        switch (node.operator) {
            case "or":
                break;
            case "and":
                break;
        }
        visit(node.left)
        visit(node.right)
    },
    [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer): void {
        node._type = unaryOperatorToTypeMap[node.operator]
    },
    [NodeKind.MemberExpression]: function (node: MemberExpressionContainer): void {
        switch (node.indexer) {
            case ".":
                node.base.flag = node.flag
                visit(node.base)
                node.setEntry(addMemberToVariable(node.base, node.identifier, node.identifier.name), LuaTiError.overwriteEntry(node.base, node.identifier))
                break;
            case ":":
                if (isFunction(node.flag) || isCall(node.flag)) {
                    node.base.flag = node.flag
                    visit(node.base)
                    node.setEntry(addMemberToVariable(node.base, node.identifier, node.identifier.name), LuaTiError.overwriteEntry(node.base, node.identifier))
                } else {
                    throw new Error()
                }
                break;
        }
    },
    [NodeKind.IndexExpression]: function (node: IndexExpressionContainer): void {
        visit(node.index)
        visit(node.base)
    },
    [NodeKind.CallExpression]: function (node: CallExpressionContainer): void {
        for (let i = 0; i < node.arguments.length; i++) {
            const argument = node.arguments[i]
            argument.flag = ContainerFlag.ArgumentExpression
            visit(argument)
        }
        node.base.flag = ContainerFlag.Call
        visit(node.base)
        const entry = node.base.getEntry(LuaTiError.noEntry(node.base))
        entry.calls.push({
            returns: createVariable(node),
            declarations: [node],
            arguments: node.arguments.map(argument => ({
                symbol: argument.getEntry(LuaTiError.noEntry(argument)),
                declarations: [argument]
            }))
        })
    },
    [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer): void {
    },
    [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer): void {
    },
    [NodeKind.IfClause]: function (node: IfClauseContainer): void {
        visit(node.condition)
        visit(node.block)
    },
    [NodeKind.ElseifClause]: function (node: ElseifClauseContainer): void {
        visit(node.condition)
        visit(node.block)
    },
    [NodeKind.ElseClause]: function (node: ElseClauseContainer): void {
        visit(node.block)
    },
    [NodeKind.TableKey]: function (node: TableKeyContainer): void {
        visit(node.key)
        visit(node.value)
    },
    [NodeKind.TableKeyString]: function (node: TableKeyStringContainer): void {
        visit(node.key)
        visit(node.value)
    },
    [NodeKind.TableValue]: function (node: TableValueContainer): void {
        visit(node.value)
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

function visit(node: Container) {
    console.log(node.kind + ' #' + node.id)
    tableVisitor[node.kind](node as never)
}
