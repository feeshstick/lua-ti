import {Base, Node, Statement} from "luaparse";
import {BlockContainer} from "./nodes/meta/block-container.js";
import {IdentifierContainer} from "./nodes/expression/literal/identifier-container.js";
import {StringLiteralContainer} from "./nodes/expression/literal/string-literal-container.js";
import {NumericLiteralContainer} from "./nodes/expression/literal/numeric-literal-container.js";
import {BooleanLiteralContainer} from "./nodes/expression/literal/boolean-literal-container.js";
import {NilLiteralContainer} from "./nodes/expression/literal/nil-literal-container.js";
import {VarargLiteralContainer} from "./nodes/expression/literal/vararg-literal-container.js";
import {TableConstructorExpressionContainer} from "./nodes/expression/table/table-constructor-expression-container.js";
import {BinaryExpressionContainer} from "./nodes/expression/binary-expression/binary-expression-container.js";
import {LogicalExpressionContainer} from "./nodes/expression/binary-expression/logical-expression-container.js";
import {UnaryExpressionContainer} from "./nodes/expression/unary-expression-container.js";
import {MemberExpressionContainer} from "./nodes/expression/member-expression-container.js";
import {IndexExpressionContainer} from "./nodes/expression/index-expression-container.js";
import {CallExpressionContainer} from "./nodes/expression/call-expression/call-expression-container.js";
import {TableCallExpressionContainer} from "./nodes/expression/call-expression/table-call-expression-container.js";
import {StringCallExpressionContainer} from "./nodes/expression/call-expression/string-call-expression-container.js";
import {FunctionExpressionContainer} from "./nodes/expression/function-expression-container.js";
import {LabelStatementContainer} from "./nodes/statement/label-statement-container.js";
import {BreakStatementContainer} from "./nodes/statement/break-statement-container.js";
import {GotoStatementContainer} from "./nodes/statement/goto-statement-container.js";
import {ReturnStatementContainer} from "./nodes/statement/return-statement-container.js";
import {IfStatementContainer} from "./nodes/statement/if-statement/if-statement-container.js";
import {WhileStatementContainer} from "./nodes/statement/while-statement-container.js";
import {DoStatementContainer} from "./nodes/statement/do-statement-container.js";
import {RepeatStatementContainer} from "./nodes/statement/repeat-statement-container.js";
import {LocalStatementContainer} from "./nodes/statement/assign/local-statement-container.js";
import {AssignmentStatementContainer} from "./nodes/statement/assign/assignment-statement-container.js";
import {CallStatementContainer} from "./nodes/statement/call-statement-container.js";
import {ForNumericStatementContainer} from "./nodes/statement/for-numeric-statement-container.js";
import {ForGenericStatementContainer} from "./nodes/statement/for-generic-statement-container.js";
import {Scope} from "./scope.js";
import {IfClauseContainer} from "./nodes/statement/if-statement/clause/if-clause-container.js";
import {ElseifClauseContainer} from "./nodes/statement/if-statement/clause/elseif-clause-container.js";
import {ElseClauseContainer} from "./nodes/statement/if-statement/clause/else-clause-container.js";
import {TableKeyContainer} from "./nodes/expression/table/table-entry/table-key-container.js";
import {TableKeyStringContainer} from "./nodes/expression/table/table-entry/table-key-string-container.js";
import {TableValueContainer} from "./nodes/expression/table/table-entry/table-value-container.js";
import {CommentContainer} from "./nodes/trivia/comment-trivia-container.js";
import {ChunkContainer} from "./nodes/meta/chunk-container.js";
import {SourceFileContainer} from "./nodes/meta/source-file-container.js";
import {CompilerOptions} from "../compiler-options/compiler-options.js";

export enum NodeKind {
    SourceFile = "SourceFile",
    Chunk = "Chunk",
    Block = "Block",
    IfStatement = "IfStatement",
    IfClause = "IfClause",
    ElseifClause = "ElseifClause",
    ElseClause = "ElseClause",
    CallStatement = "CallStatement",
    CallExpression = "CallExpression",
    TableCallExpression = "TableCallExpression",
    StringCallExpression = "StringCallExpression",
    TableConstructorExpression = "TableConstructorExpression",
    TableKey = "TableKey",
    TableKeyString = "TableKeyString",
    TableValue = "TableValue",
    Identifier = "Identifier",
    MemberExpression = "MemberExpression",
    IndexExpression = "IndexExpression",
    ReturnStatement = "ReturnStatement",
    WhileStatement = "WhileStatement",
    DoStatement = "DoStatement",
    RepeatStatement = "RepeatStatement",
    LocalStatement = "LocalStatement",
    AssignmentStatement = "AssignmentStatement",
    FunctionDeclaration = "FunctionDeclaration",
    ForNumericStatement = "ForNumericStatement",
    ForGenericStatement = "ForGenericStatement",
    StringLiteral = "StringLiteral",
    NumericLiteral = "NumericLiteral",
    BooleanLiteral = "BooleanLiteral",
    NilLiteral = "NilLiteral",
    VarargLiteral = "VarargLiteral",
    BinaryExpression = "BinaryExpression",
    LogicalExpression = "LogicalExpression",
    UnaryExpression = "UnaryExpression",
    LabelStatement = "LabelStatement",
    BreakStatement = "BreakStatement",
    GotoStatement = "GotoStatement",
    Comment = "Comment",
}

export interface FileReference {
    path: string
    name: string
    source: string
    compilerOptions: CompilerOptions
}

export interface Block extends Base<'Block'> {
    type: 'Block'
    statements: Statement[]
    range: [number, number]
}

export interface SourceFileNode extends Base<"SourceFile"> {
    type: "SourceFile"
    files: FileReference[]
    range: [number, number]
}

export type ExtendedNode =
    | Node
    | SourceFileNode
    | Block

export interface TypeDeclarationSourceFile extends FileReference {
}

export type NodeRef<E> = E extends ExtendedNode['type'] ? Extract<ExtendedNode, {
    type: E
}> : never

export interface BlockStatement {
    readonly block: BlockContainer
}

export type ParameterContainer = IdentifierContainer | VarargLiteralContainer

export function createContainer(node: Node, parent: Container, scope: Scope) {
    switch (node.type) {
        case "BreakStatement":
            return new BreakStatementContainer(node, parent, scope);
        case "LabelStatement":
            return new LabelStatementContainer(node, parent, scope);
        case "GotoStatement":
            return new GotoStatementContainer(node, parent, scope);
        case "ReturnStatement":
            return new ReturnStatementContainer(node, parent, scope);
        case "IfStatement":
            return new IfStatementContainer(node, parent, scope);
        case "WhileStatement":
            return new WhileStatementContainer(node, parent, scope);
        case "DoStatement":
            return new DoStatementContainer(node, parent, scope);
        case "RepeatStatement":
            return new RepeatStatementContainer(node, parent, scope);
        case "LocalStatement":
            return new LocalStatementContainer(node, parent, scope);
        case "AssignmentStatement":
            return new AssignmentStatementContainer(node, parent, scope);
        case "CallStatement":
            return new CallStatementContainer(node, parent, scope);
        case "FunctionDeclaration":
            return new FunctionExpressionContainer(node, parent, scope);
        case "ForNumericStatement":
            return new ForNumericStatementContainer(node, parent, scope);
        case "ForGenericStatement":
            return new ForGenericStatementContainer(node, parent, scope);
        case "Identifier":
            return new IdentifierContainer(node, parent, scope);
        case "StringLiteral":
            return new StringLiteralContainer(node, parent, scope);
        case "NumericLiteral":
            return new NumericLiteralContainer(node, parent, scope);
        case "BooleanLiteral":
            return new BooleanLiteralContainer(node, parent, scope);
        case "NilLiteral":
            return new NilLiteralContainer(node, parent, scope);
        case "VarargLiteral":
            return new VarargLiteralContainer(node, parent, scope);
        case "TableConstructorExpression":
            return new TableConstructorExpressionContainer(node, parent, scope);
        case "BinaryExpression":
            return new BinaryExpressionContainer(node, parent, scope);
        case "LogicalExpression":
            return new LogicalExpressionContainer(node, parent, scope);
        case "UnaryExpression":
            return new UnaryExpressionContainer(node, parent, scope);
        case "MemberExpression":
            return new MemberExpressionContainer(node, parent, scope);
        case "IndexExpression":
            return new IndexExpressionContainer(node, parent, scope);
        case "CallExpression":
            return new CallExpressionContainer(node, parent, scope);
        case "TableCallExpression":
            return new TableCallExpressionContainer(node, parent, scope);
        case "StringCallExpression":
            return new StringCallExpressionContainer(node, parent, scope);
        case "IfClause":
            if (parent.kind === NodeKind.IfStatement) {
                return new IfClauseContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "ElseifClause":
            if (parent.kind === NodeKind.IfStatement) {
                return new ElseifClauseContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "ElseClause":
            if (parent.kind === NodeKind.IfStatement) {
                return new ElseClauseContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "TableKey":
            if (parent.kind === NodeKind.TableConstructorExpression) {
                return new TableKeyContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "TableKeyString":
            if (parent.kind === NodeKind.TableConstructorExpression) {
                return new TableKeyStringContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "TableValue":
            if (parent.kind === NodeKind.TableConstructorExpression) {
                return new TableValueContainer(node, parent, scope);
            } else {
                throw new Error()
            }
        case "Comment":
            return new CommentContainer(node, parent, scope);
        default:
            throw new Error(`Unsupported node type: ${undefined}`);
    }
}

export type ExpressionContainer =
    | IdentifierContainer
    | StringLiteralContainer
    | NumericLiteralContainer
    | BooleanLiteralContainer
    | NilLiteralContainer
    | VarargLiteralContainer
    | TableConstructorExpressionContainer
    | BinaryExpressionContainer
    | LogicalExpressionContainer
    | UnaryExpressionContainer
    | MemberExpressionContainer
    | IndexExpressionContainer
    | CallExpressionContainer
    | TableCallExpressionContainer
    | StringCallExpressionContainer
    | FunctionExpressionContainer
export type StatementContainer =
    | LabelStatementContainer
    | BreakStatementContainer
    | GotoStatementContainer
    | ReturnStatementContainer
    | IfStatementContainer
    | WhileStatementContainer
    | DoStatementContainer
    | RepeatStatementContainer
    | LocalStatementContainer
    | AssignmentStatementContainer
    | CallStatementContainer
    | ForNumericStatementContainer
    | ForGenericStatementContainer
    | FunctionExpressionContainer
export type Container =
    | StatementContainer
    | ExpressionContainer
    | IfClauseContainer
    | ElseifClauseContainer
    | ElseClauseContainer
    | ChunkContainer
    | TableKeyContainer
    | TableKeyStringContainer
    | TableValueContainer
    | CommentContainer
    | SourceFileContainer
    | BlockContainer

export enum BinaryExpressionOperator {
    add = "+",
    sub = "-",
    mul = "*",
    mod = "%",
    exp = "^",
    div = "/",
    divFloor = "//",
    and = "&",
    or = "|",
    xor = "~",
    shiftLeft = "<<",
    shiftRight = ">>",
    concat = "..",
    compare_ne = "~=",
    compare_eq = "==",
    compare_lt = "<",
    compare_le = "<=",
    compare_gt = ">",
    compare_ge = ">=",
}

export enum UnaryExpressionOperator {
    Not = "Not",
    Length = "#",
    BitNegate = "~",
    ArithmeticNegate = "-"
}

export function isExpressionContainer(container: Container): container is ExpressionContainer {
    return container.kind === NodeKind.Identifier
        || container.kind === NodeKind.StringLiteral
        || container.kind === NodeKind.NumericLiteral
        || container.kind === NodeKind.BooleanLiteral
        || container.kind === NodeKind.NilLiteral
        || container.kind === NodeKind.VarargLiteral
        || container.kind === NodeKind.TableConstructorExpression
        || container.kind === NodeKind.BinaryExpression
        || container.kind === NodeKind.LogicalExpression
        || container.kind === NodeKind.UnaryExpression
        || container.kind === NodeKind.MemberExpression
        || container.kind === NodeKind.IndexExpression
        || container.kind === NodeKind.CallExpression
        || container.kind === NodeKind.TableCallExpression
        || container.kind === NodeKind.StringCallExpression
        || container.kind === NodeKind.FunctionDeclaration
}