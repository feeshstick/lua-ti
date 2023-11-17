import {SourceFileContainer} from "../components/nodes/meta/source-file-container.js";
import {Container, ExpressionContainer, NodeKind} from "../components/container-types.js";
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
import {typeToString} from "../error/lua-ti-error.js";

export type BindTypeVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never) => void
}

export function typeChecker(sourceFile: SourceFileContainer) {
    for (let chunk of sourceFile.chunks) {
        if (chunk.compilerOptions.fileFlag === 'none') {
            bindTypes(chunk)
        }
    }
}

function bindAssign(variables: IdentifierContainer[], init: ExpressionContainer[]) {
    let pointer: number = 0
    for (let i = 0; i < init.length; i++){
        let expression = init[i]
        console.log(expression.type, expression.symbol)
    }
}

export function bindTypes(chunk: ChunkContainer) {
    const table: BindTypeVisitor = {
        [NodeKind.SourceFile]: function (node: SourceFileContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.Chunk]: function (node: ChunkContainer): void {
            visit(node.block)
        },
        [NodeKind.Block]: function (node: BlockContainer): void {
            visit(node.statements)
        },
        [NodeKind.IfStatement]: function (node: IfStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.IfClause]: function (node: IfClauseContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.ElseifClause]: function (node: ElseifClauseContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.ElseClause]: function (node: ElseClauseContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.CallStatement]: function (node: CallStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.CallExpression]: function (node: CallExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.TableKey]: function (node: TableKeyContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.TableKeyString]: function (node: TableKeyStringContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.TableValue]: function (node: TableValueContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.Identifier]: function (node: IdentifierContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.MemberExpression]: function (node: MemberExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.IndexExpression]: function (node: IndexExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.WhileStatement]: function (node: WhileStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.DoStatement]: function (node: DoStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.RepeatStatement]: function (node: RepeatStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.LocalStatement]: function (node: LocalStatementContainer): void {
            bindAssign(node.variables, node.init)
            for (let variable of node.variables) {
                console.log(variable.name)
            }
        },
        [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer): void {
        },
        [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.StringLiteral]: function (node: StringLiteralContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.NilLiteral]: function (node: NilLiteralContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.LabelStatement]: function (node: LabelStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.BreakStatement]: function (node: BreakStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.GotoStatement]: function (node: GotoStatementContainer): void {
            throw new Error("Function not implemented.");
        },
        [NodeKind.Comment]: function (node: CommentContainer): void {
            throw new Error("Function not implemented.");
        }
    }
    visit(chunk)
    
    function visit(node: Container | Container[]) {
        if (node instanceof Array) {
            for (let nodeElement of node) {
                visit(nodeElement)
            }
        } else {
            table[node.kind](node as never)
        }
    }
}