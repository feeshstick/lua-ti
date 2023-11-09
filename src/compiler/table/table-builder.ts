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
import {Container, NodeKind, UnaryExpressionOperator} from "../components/types.js";
import {
    ContainerFlag,
    isCallFlag,
    isDeclarationFlag,
    isLocalFlag,
    isParameterDeclarationFlag,
    isResolveFlag,
    isSemiDeclarationFlag
} from "../components/base-container.js";
import {isFunction} from "rxjs/internal/util/isFunction";
import {LuaTiError, LuaTiErrorKind} from "../error/lua-ti-error.js";
import {
    addMemberToVariable,
    Call,
    createVariable,
    FunctionSignature,
    LocalTable,
    ObjectMap,
    SymbolFlag,
    SymbolTable
} from "./symbol-table.js";
import chalk from "chalk";
import {createStringBuilder} from "../utility/string-builder.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: TableVisitorContext) => void
}

export class TableVisitorContext {
    private _currentFile: string | undefined
    private blockStack: LocalTable[] = []
    private containerStack: Container[] = []
    private functionSignatureStack: FunctionSignature[] = []
    private errors: {
        table: SymbolTable
        locations: {
            kind: string
            start: number
            end: number
        }[]
        error: LuaTiError
    }[] = []
    
    get currentFile(): string | undefined {
        return this._currentFile;
    }
    
    set currentFile(value: string | undefined) {
        this._currentFile = value;
    }
    
    startFunctionSignature(signature: FunctionSignature) {
        this.functionSignatureStack.push(signature)
    }
    
    getFunctionSignature() {
        return this.functionSignatureStack[this.functionSignatureStack.length - 1]
    }
    
    endFunctionSignature() {
        this.functionSignatureStack.pop()
    }
    
    startBlock(localTable: LocalTable) {
        this.blockStack.push(localTable)
    }
    
    endBlock() {
        this.blockStack.pop()
    }
    
    startContainer(node: Container) {
        this.containerStack.push(node)
    }
    
    endContainer() {
        this.containerStack.pop()
    }
    
    clearErrorLog() {
        this.errors = []
    }
    
    printErrorLog() {
        for (let error of this.errors) {
            const orientation: ('padEnd' | 'padStart')[] = ['padStart', 'padEnd', 'padStart', 'padStart']
            const columns: string[][] = [['index', '---'], ['kind', '---'], ['start', '---'], ['end', '---']]
            let index = 0
            for (let i = error.locations.length - 1; i >= 0; i--) {
                const location = error.locations[i]
                columns[0].push((index++).toString(16).toUpperCase())
                columns[1].push(location.kind)
                columns[2].push(location.start.toString())
                columns[3].push(location.end.toString())
            }
            const columnWidths = columns.map(column => {
                return column.reduce((p, c) => Math.max(p, c.length), 0)
            })
            let errorMessage = ''
            for (let i = 0; i < error.locations.length; i++) {
                let text = ''
                for (let j = 0; j < columns.length; j++) {
                    text += ' ' + columns[j][i][orientation[j]](columnWidths[j] + 2, ' ') + ' '
                }
                errorMessage += text + '\n'
            }
            const out = createStringBuilder()
            errorMessage += out.text + '\n'
            console.log(errorMessage)
            console.log(error.error.message, error.error.name, error.error._message, LuaTiErrorKind[error.error._kind])
        }
    }
    
    emitError(e: LuaTiError) {
        this.errors.push({
            table: {...this.blockStack[this.blockStack.length - 1]},
            locations: this.containerStack.map(x => ({
                start: x.range[0],
                end: x.range[1],
                kind: x.kind
            })),
            error: e
        })
    }
}

export const tableVisitor: TableVisitor = {
    [NodeKind.SourceFile]: function (node: SourceFileContainer, context: TableVisitorContext): void {
        for (let chunk of node.chunks) {
            visit(chunk, context)
        }
    },
    [NodeKind.Chunk]: function (node: ChunkContainer, context: TableVisitorContext): void {
        context.currentFile = node.sourceFile.path
        visit(node.block, context)
    },
    [NodeKind.Block]: function (node: BlockContainer, context: TableVisitorContext): void {
        context.startBlock(node.getLocalTable())
        for (let statement of node.statements) {
            visit(statement, context)
        }
        context.endBlock()
    },
    [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer, context: TableVisitorContext): void {
        for (let parameterElement of node.parameter) {
            parameterElement.flag = ContainerFlag.Parameter
            visit(parameterElement, context)
            node.block.getLocalTable().enterParameter(parameterElement.__symbol!.name!, parameterElement.__symbol!)
        }
        if (node.identifier) {
            if (node.isLocal) {
                node.identifier.flag = ContainerFlag.DeclareLocal
            } else {
                node.identifier.flag = ContainerFlag.DeclareGlobal
            }
            visit(node.identifier, context)
            node.__symbol = node.identifier.__symbol
            node.__symbol!.functionSignature = {
                functionBodyTable: node.block.getLocalTable(),
                parameter: node.parameter.map(x => ({
                    symbol: x.__symbol!,
                    declarations: [x]
                })),
                declarations: [node],
                returns: []
            }
        } else {
            node.__symbol = createVariable(node)
            node.__symbol!.functionSignature = {
                functionBodyTable: node.block.getLocalTable(),
                parameter: node.parameter.map(x => ({
                    symbol: x.__symbol!,
                    declarations: [x]
                })),
                declarations: [node],
                returns: []
            }
            node.__symbol.flag = SymbolFlag.Function
        }
        context.startFunctionSignature(node.__symbol!.functionSignature)
        visit(node.block, context)
        context.endFunctionSignature()
    },
    [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer, context: TableVisitorContext): void {
        for (let argument of node.arguments) {
            visit(argument, context)
        }
        context.getFunctionSignature().returns.push({
            declaration: node,
            arguments: node.arguments.map(x => x.__symbol!)
        })
    },
    [NodeKind.IfStatement]: function (node: IfStatementContainer, context: TableVisitorContext): void {
        for (let clause of node.clauses) {
            visit(clause, context)
        }
    },
    [NodeKind.IfClause]: function (node: IfClauseContainer, context: TableVisitorContext): void {
        visit(node.condition, context)
        visit(node.block, context)
    },
    [NodeKind.ElseifClause]: function (node: ElseifClauseContainer, context: TableVisitorContext): void {
        visit(node.condition, context)
        visit(node.block, context)
    },
    [NodeKind.ElseClause]: function (node: ElseClauseContainer, context: TableVisitorContext): void {
        visit(node.block, context)
    },
    [NodeKind.WhileStatement]: function (node: WhileStatementContainer, context: TableVisitorContext): void {
        visit(node.condition, context)
        visit(node.block, context)
    },
    [NodeKind.DoStatement]: function (node: DoStatementContainer, context: TableVisitorContext): void {
        visit(node.block, context)
    },
    [NodeKind.RepeatStatement]: function (node: RepeatStatementContainer, context: TableVisitorContext): void {
        visit(node.condition, context)
        visit(node.block, context)
    },
    [NodeKind.LocalStatement]: function (node: LocalStatementContainer, context: TableVisitorContext): void {
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            let expression = node.init[i]
            variable.flag = ContainerFlag.DeclareLocal
            visit(variable, context)
            if (expression) {
                visit(expression, context)
            }
        }
    },
    [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer, context: TableVisitorContext): void {
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            variable.flag = ContainerFlag.DeclareGlobal
            visit(variable, context)
            let expression = node.init[i]
            if (expression) {
                visit(expression, context)
            }
        }
    },
    [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer, context: TableVisitorContext): void {
        node.start.flag = ContainerFlag.Semi
        node.end.flag = ContainerFlag.Semi
        visit(node.start, context)
        visit(node.end, context)
        if (node.step) {
            node.step.flag = ContainerFlag.Semi
            visit(node.step, context)
        }
        visit(node.block, context)
    },
    [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, context: TableVisitorContext): void {
        for (let variable of node.variables) {
            variable.flag = ContainerFlag.Semi
            visit(variable, context)
            node.__table.enterSemi(
                variable.name,
                variable.getEntry(LuaTiError.noEntry(variable)),
                LuaTiError.duplicateDeclaration(node.__table.semi[variable.name], variable.__symbol!)
            )
        }
        let predefined = false
        if (node.iterators.length === 1) {
            const iterator = node.iterators[0]
            if (iterator.kind === NodeKind.CallExpression && iterator.base.kind === NodeKind.Identifier) {
                if (iterator.base.name === 'ipairs') {
                    predefined = true
                    node.variables[0].__symbol!.flag = SymbolFlag.IndexPair
                    if (node.variables[1]) {
                        node.variables[1].__symbol!.flag = SymbolFlag.ValuePair
                    }
                } else if (iterator.base.name === 'pairs') {
                    predefined = true
                    node.variables[0].__symbol!.flag = SymbolFlag.KeyPair
                    if (node.variables[1]) {
                        node.variables[1].__symbol!.flag = SymbolFlag.ValuePair
                    }
                }
            }
        }
        if (!predefined) {
            for (let iterator of node.iterators) {
                visit(iterator, context)
            }
        }
        visit(node.block, context)
    },
    [NodeKind.StringLiteral]: function (node: StringLiteralContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        node.__symbol.flag = SymbolFlag.StringLiteral
    },
    [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        node.__symbol.flag = SymbolFlag.NumberLiteral
    },
    [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        node.__symbol.flag = SymbolFlag.BoolLiteral
    },
    [NodeKind.NilLiteral]: function (node: NilLiteralContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        node.__symbol.flag = SymbolFlag.NilLiteral
    },
    [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer, context: TableVisitorContext): void {
        if (isParameterDeclarationFlag(node.flag)) {
            node.__symbol = createVariable(node)
        } else {
            node.__symbol = node.__table.lookup('...', LuaTiError.noVarargs())
            node.__symbol.flag = SymbolFlag.VarargLiteral
        }
    },
    [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer, context: TableVisitorContext): void {
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
        console.log(node.left.__table.parameter['e'])
        visit(node.left, context)
        visit(node.right, context)
    },
    [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        switch (node.operator) {
            case "or":
                node.__symbol.flag = SymbolFlag.LogicalOr
                break;
            case "and":
                node.__symbol.flag = SymbolFlag.LogicalAnd
                break;
        }
        visit(node.left, context)
        visit(node.right, context)
    },
    [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer, context: TableVisitorContext): void {
        node.__symbol = createVariable(node)
        switch (node.operator) {
            case UnaryExpressionOperator.Not:
                break;
            case UnaryExpressionOperator.Length:
                break;
            case UnaryExpressionOperator.BitNegate:
                break;
            case UnaryExpressionOperator.ArithmeticNegate:
                break;
        }
        visit(node.argument, context)
    },
    [NodeKind.CallStatement]: function (node: CallStatementContainer, context: TableVisitorContext): void {
        visit(node.expression, context)
    },
    [NodeKind.CallExpression]: function (node: CallExpressionContainer, context: TableVisitorContext): void {
        for (let i = 0; i < node.arguments.length; i++) {
            const argument = node.arguments[i]
            argument.flag = ContainerFlag.Argument
            visit(argument, context)
        }
        if (node.base.kind === NodeKind.Identifier && node.base.name === 'type') {
            node.__symbol = createVariable(node)
            node.__symbol.flag = SymbolFlag.TypeOf
        } else {
            node.base.flag = ContainerFlag.Call
            visit(node.base, context)
            const entry = node.base.getEntry(LuaTiError.noEntry(node.base, node.text))
            const call: Call = {
                returns: createVariable(node),
                declaration: node,
                arguments: node.arguments.map(argument => ({
                    symbol: argument.getEntry(LuaTiError.noEntry(argument, node.text.replace(argument.text, f => chalk.yellow(f)))),
                    declaration: argument
                }))
            }
            entry.calls.push(call)
            node.__symbol = call.returns
        }
    },
    [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, context: TableVisitorContext): void {
    },
    [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, context: TableVisitorContext): void {
    },
    [NodeKind.Identifier]: function (node: IdentifierContainer, context: TableVisitorContext): void {
        if (isParameterDeclarationFlag(node.flag) || isSemiDeclarationFlag(node.flag)) {
            node.__symbol = createVariable(node, node.name)
        } else if (isDeclarationFlag(node.flag)) {
            const currentDeclaration = createVariable(node, node.name)
            if (node.__table.has(node.name) && !isResolveFlag(node.flag)) {
                const previousDeclaration = node.__table.member[node.name]
                // add compiler options here
                throw LuaTiError.duplicateDeclaration(previousDeclaration, currentDeclaration)
            } else {
                if (isLocalFlag(node.flag)) {
                    if (isParameterDeclarationFlag(node.flag)) {
                        node.__table.enterParameter(node.name, currentDeclaration)
                    } else {
                        node.__table.member[node.name] = currentDeclaration
                    }
                } else {
                    node.__table.global.member[node.name] = currentDeclaration
                }
            }
            node.setEntry(currentDeclaration, LuaTiError.overwriteEntryDirect(node, currentDeclaration))
        } else {
            node.__symbol = node.__table.lookup(node.name, LuaTiError.cannotFindName(node, node.flag.toString(2) + ' ' + node.__table.parameter['c']))
            node.__symbol.declarations.push(node)
        }
    },
    [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, context: TableVisitorContext): void {
        switch (node.indexer) {
            case ".":
                node.base.flag = node.flag | ContainerFlag.Resolve
                visit(node.base, context)
                node.setEntry(addMemberToVariable(node.base, node.identifier, node.identifier.name), LuaTiError.overwriteEntry(node.base, node.identifier))
                break;
            case ":":
                if (isFunction(node.flag) || isCallFlag(node.flag)) {
                    node.base.flag = node.flag
                    visit(node.base, context)
                    node.setEntry(addMemberToVariable(node.base, node.identifier, node.identifier.name), LuaTiError.overwriteEntry(node.base, node.identifier))
                } else {
                    throw new Error()
                }
                break;
        }
        node.identifier.__symbol = node.__symbol
    },
    [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, context: TableVisitorContext): void {
        visit(node.index, context)
        visit(node.base, context)
    },
    [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, context: TableVisitorContext): void {
        for (let i = 0; i < node.fields.length; i++) {
            let field = node.fields[i];
            field.deprSetFlag('is field at index ' + i)
            visit(field, context)
        }
    },
    [NodeKind.TableKey]: function (node: TableKeyContainer, context: TableVisitorContext): void {
        visit(node.key, context)
        visit(node.value, context)
    },
    [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, context: TableVisitorContext): void {
        visit(node.key, context)
        visit(node.value, context)
    },
    [NodeKind.TableValue]: function (node: TableValueContainer, context: TableVisitorContext): void {
        visit(node.value, context)
    },
    [NodeKind.Comment]: function (node: CommentContainer, context: TableVisitorContext): void {
    },
    [NodeKind.LabelStatement]: function (node: LabelStatementContainer, context: TableVisitorContext): void {
    },
    [NodeKind.BreakStatement]: function (node: BreakStatementContainer, context: TableVisitorContext): void {
    },
    [NodeKind.GotoStatement]: function (node: GotoStatementContainer, context: TableVisitorContext): void {
    }
}

function visit(node: Container, context: TableVisitorContext) {
    console.log(node.kind + ' ' + node.id)
    try {
        context.startContainer(node)
        tableVisitor[node.kind](node as never, context)
        context.endContainer()
    } catch (e) {
        if (e instanceof LuaTiError) {
            context.emitError(e)
            context.printErrorLog()
            context.clearErrorLog()
            throw new Error()
        } else {
            throw e
        }
    }
}

export function entries<E>(obj: ObjectMap<E>): [string | number, E][] {
    return Object.keys(obj).map(x => [x, obj[x]])
}