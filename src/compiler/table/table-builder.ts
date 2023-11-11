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
import {Container, ExpressionContainer, NodeKind, UnaryExpressionOperator} from "../components/types.js";
import {ContainerFlag, isLocalFlag, isParameterFlag, isSemiFlag} from "../components/base-container.js";
import {LuaTiError, LuaTiErrorKind} from "../error/lua-ti-error.js";
import {
    addCallToVariable,
    addMemberToVariable,
    BubbleBreak,
    Call,
    FunctionSignature,
    getMemberOrElse,
    LocalTable,
    LSymbolTableKind,
    ObjectMap,
    SymbolFlag,
    SymbolTable,
    Variable
} from "./symbol-table.js";
import chalk from "chalk";
import {createStringBuilder} from "../utility/string-builder.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: TableVisitorContext) => void
}

enum TableVisitorContextFlag {
    LocalDeclaration,
    GlobalDeclaration
}

export class TableVisitorContext {
    private _currentFile: string | undefined
    private blockStack: LocalTable[] = []
    private containerStack: Container[] = []
    private functionSignatureStack: FunctionSignature[] = []
    private flagStack: TableVisitorContextFlag[] = []
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
    
    setContext(flag: TableVisitorContextFlag) {
        this.flagStack.push(flag)
    }
    
    get context(): TableVisitorContextFlag {
        return this.flagStack[this.flagStack.length - 1]
    }
    
    releaseContext() {
        this.flagStack.pop()
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

export function buildTable(sourceFile: SourceFileContainer) {
    
    let symbolCounter = 0
    
    const tableVisitor: TableVisitor = {
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
            node.block.__table.bubbleBreak = BubbleBreak.FunctionBubble
            for (let parameterElement of node.parameter) {
                parameterElement.flag = ContainerFlag.Parameter
                node.setTableOverwrite(node.block.getLocalTable())
                visit(parameterElement, context)
                node.clearTableOverwrite()
            }
            if (node.identifier) {
                if (node.isLocal) {
                    context.setContext(TableVisitorContextFlag.LocalDeclaration)
                } else {
                    context.setContext(TableVisitorContextFlag.GlobalDeclaration)
                }
                visit(node.identifier, context)
                context.releaseContext()
                node.__symbol = node.identifier.__symbol!
            } else {
                node.__symbol = createVariable(node)
            }
            node.__symbol.functionSignature = {
                functionBodyTable: node.block.getLocalTable(),
                parameter: node.parameter.map(x => ({
                    symbol: x.__symbol!
                })),
                declaration: node,
                returns: []
            }
            node.__symbol.flag = SymbolFlag.Function
            context.startFunctionSignature(node.__symbol!.functionSignature)
            visit(node.block, context)
            context.endFunctionSignature()
        },
        [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer, context: TableVisitorContext): void {
            for (let argument of node.arguments) {
                visit(argument, context)
            }
            try {
                context.getFunctionSignature().returns.push({
                    declaration: node,
                    arguments: node.arguments.map(x => x.__symbol!)
                })
            } catch (e) {
                console.warn('escape global body')
            }
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
            node.setTableOverwrite(node.block.getLocalTable())
            visit(node.start, context)
            visit(node.end, context)
            node.clearTableOverwrite()
            if (node.step) {
                node.step.flag = ContainerFlag.Semi
                visit(node.step, context)
            }
            visit(node.block, context)
        },
        [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, context: TableVisitorContext): void {
            for (let variable of node.variables) {
                variable.flag = ContainerFlag.Semi
                node.setTableOverwrite(node.block.getLocalTable())
                visit(variable, context)
                node.clearTableOverwrite()
                const entry = node.block.__table.lookup(variable.name, BubbleBreak.LocalBubble)
                if (entry) {
                    console.log('redeclaration in for generic statement')
                }
                node.block.__table.getSemi()[variable.name] = variable.getEntry(LuaTiError.noEntry(variable))
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
            node.__immutable = true
        },
        [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer, context: TableVisitorContext): void {
            node.__symbol = createVariable(node)
            node.__symbol.flag = SymbolFlag.NumberLiteral
            node.__immutable = true
        },
        [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer, context: TableVisitorContext): void {
            node.__symbol = createVariable(node)
            node.__symbol.flag = SymbolFlag.BoolLiteral
            node.__immutable = true
        },
        [NodeKind.NilLiteral]: function (node: NilLiteralContainer, context: TableVisitorContext): void {
            node.__symbol = createVariable(node)
            node.__symbol.flag = SymbolFlag.NilLiteral
            node.__immutable = true
        },
        [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer, context: TableVisitorContext): void {
            if (isParameterFlag(node.flag)) {
                node.__table.getParameter()['...'] = createVariable(node, '...')
            } else {
                node.__symbol = node.__table.lookup('...', BubbleBreak.FunctionBubble)
                if (node.__symbol) {
                    node.__symbol.flag = SymbolFlag.VarargLiteral
                } else {
                    console.error('... undefined')
                    console.log(node.__table.lookup('...'))
                }
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
            // console.log(node.left.__table.parameter['e'])
            visit(node.left, context)
            visit(node.right, context)
            if (node.left.__immutable && node.right.__immutable) {
                node.__immutable = true
            }
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
            if (node.left.__immutable && node.right.__immutable) {
                node.__immutable = true
            }
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
            if (node.argument.__immutable) {
                node.__immutable = true
            }
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
                addCallToVariable(entry, call)
                node.__symbol = call.returns
            }
        },
        [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, context: TableVisitorContext): void {
            node.arguments.flag = ContainerFlag.Argument
            visit(node.arguments, context)
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
                    arguments: [node.arguments].map(argument => ({
                        symbol: argument.getEntry(LuaTiError.noEntry(argument, node.text.replace(argument.text, f => chalk.yellow(f)))),
                        declaration: argument
                    }))
                }
                addCallToVariable(entry, call)
                node.__symbol = call.returns
            }
        },
        [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, context: TableVisitorContext): void {
            node.argument.flag = ContainerFlag.Argument
            visit(node.argument, context)
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
                    arguments: [node.argument].map(argument => ({
                        symbol: argument.getEntry(LuaTiError.noEntry(argument, node.text.replace(argument.text, f => chalk.yellow(f)))),
                        declaration: argument
                    }))
                }
                addCallToVariable(entry, call)
                node.__symbol = call.returns
            }
        },
        [NodeKind.Identifier]: function (node: IdentifierContainer, context: TableVisitorContext): void {
            if (isLocalFlag(node.flag)) {
                const message: string[] = []
                // local declaration
                let entry = node.__table.lookup(node.name, BubbleBreak.FunctionBubble)
                if (entry) {
                    console.warn(`node will be overwritten by local declaration; node.flag is set to 'local' (local declaration), there already exists a variable called '${
                        node.name
                    }' within this ${node.__table.lookup(node.name, BubbleBreak.LocalBubble) ? 'scope' : 'function'}.`)
                } else {
                    entry = createVariable(node, node.name)
                    node.__table.member[node.name] = entry
                }
                node.setEntry(entry, LuaTiError.overwriteEntry(node))
            } else if (isParameterFlag(node.flag)) {
                const entry = createVariable(node, node.name)
                node.__table.getParameter()[node.name] = entry
                node.setEntry(entry, LuaTiError.overwriteEntry(node))
            } else if (isSemiFlag(node.flag)) {
                const entry = createVariable(node, node.name)
                node.__table.getSemi()[node.name] = entry
                node.setEntry(entry, LuaTiError.overwriteEntry(node))
            } else {
                let entry = node.__table.lookup(node.name, BubbleBreak.GlobalBubble)
                if (!entry) {
                    entry = createVariable(node, node.name)
                    node.__table.global.member[node.name] = entry
                }
                node.__symbol = entry
            }
        },
        [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, context: TableVisitorContext): void {
            node.base.flag = node.flag | ContainerFlag.Resolve
            visit(node.base, context)
            if (node.base.__symbol) {
                node.__symbol = getMemberOrElse(node.identifier.name, node.base.__symbol, () => {
                    console.warn(`couldn't find member ${node.identifier.name} in base, infer member in base`)
                    return createVariable(node, node.identifier.name)
                })
            } else {
                console.error(`couldn't resolve base`)
            }
        },
        [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, context: TableVisitorContext): void {
            node.base.flag = node.flag | ContainerFlag.Resolve
            visit(node.base, context)
            const entry = node.base.getEntry(LuaTiError.noEntry(node.base))
            visit(node.index, context)
            const symbol = createVariable(node)
            entry.indexedMember.push({
                key: node.index.getEntry(LuaTiError.noEntry(node.index)),
                value: symbol
            })
            node.__symbol = symbol
            node.__symbol.flag = SymbolFlag.Indexed
        },
        [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, context: TableVisitorContext): void {
            const entry = createVariable(node)
            entry.flag = SymbolFlag.Table
            for (let i = 0; i < node.fields.length; i++) {
                let field = node.fields[i];
                field.__symbol = entry
                visit(field, context)
            }
            node.__symbol = entry
        },
        [NodeKind.TableKey]: function (node: TableKeyContainer, context: TableVisitorContext): void {
            visit(node.key, context)
            visit(node.value, context)
            if (node.key.__immutable) {
                const stack: any[] = [0]
                evaluate(node.key, stack)
                addMemberToVariable(stack.pop() + '', node.__symbol!, node.value.__symbol!)
            }
        },
        [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, context: TableVisitorContext): void {
            visit(node.key, context)
            visit(node.value, context)
            if (node.key.__immutable) {
                const stack: any[] = [0]
                evaluate(node.key, stack)
                addMemberToVariable(stack.pop() + '', node.__symbol!, node.value.__symbol!)
            }
        },
        [NodeKind.TableValue]: function (node: TableValueContainer, context: TableVisitorContext): void {
            visit(node.value, context)
            addMemberToVariable(node.index + '', node.__symbol!, node.value.__symbol!)
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
    
    visit(sourceFile, new TableVisitorContext())
    
    tableFinalizer()
    
    function tableFinalizer() {
    }
    
    function createVariable(container: Container, name?: string): Variable {
        return {
            id: symbolCounter++,
            kind: LSymbolTableKind.Variable,
            flag: SymbolFlag.None,
            declarations: [container],
            name: name,
            indexedMember: [],
            functionSignature: undefined,
            offset: undefined
        }
    }
    
    function evaluate(key: ExpressionContainer, stack: (string | number | boolean | null)[]) {
        let left, right
        switch (key.kind) {
            case NodeKind.StringLiteral:
                stack.push(key.node.raw)
                break;
            case NodeKind.Identifier:
                break;
            case NodeKind.NumericLiteral:
                stack.push(key.node.value)
                break;
            case NodeKind.BooleanLiteral:
                stack.push(key.node.value)
                break;
            case NodeKind.NilLiteral:
                stack.push(key.node.value)
                break;
            case NodeKind.VarargLiteral:
                break;
            case NodeKind.TableConstructorExpression:
                break;
            case NodeKind.BinaryExpression:
                right = stack.pop()!
                left = stack.pop()!
                switch (key.operator) {
                    case "+":
                        stack.push(left + right)
                        break;
                    case "-":
                        stack.push(left - right)
                        break;
                    case "*":
                        stack.push(left * right)
                        break;
                    case "%":
                        stack.push(left % right)
                        break;
                    case "^":
                        stack.push(Math.pow(left, right))
                        break;
                    case "/":
                        stack.push(left / right)
                        break;
                    case "//":
                        stack.push(Math.floor(left / right))
                        break;
                    case "&":
                        stack.push(left & right)
                        break;
                    case "|":
                        stack.push(left | right)
                        break;
                    case "~":
                        stack.push(left ^ right)
                        break;
                    case "<<":
                        stack.push(left << right)
                        break;
                    case ">>":
                        stack.push(left >> right)
                        break;
                    case "..":
                        stack.push(left + right)
                        break;
                    case "~=":
                        stack.push(left != right)
                        break;
                    case "==":
                        stack.push(left == right)
                        break;
                    case "<":
                        stack.push(left < right)
                        break;
                    case "<=":
                        stack.push(left <= right)
                        break;
                    case ">":
                        stack.push(left > right)
                        break;
                    case ">=":
                        stack.push(left >= right)
                        break;
                }
                break;
            case NodeKind.LogicalExpression:
                right = stack.pop()!
                left = stack.pop()!
                switch (key.operator) {
                    case "or":
                        if (left) {
                            stack.push(left)
                        } else {
                            stack.push(right)
                        }
                        break;
                    case "and":
                        if (!left) {
                            stack.push(right)
                        } else {
                            stack.push(left)
                        }
                        break;
                }
                break;
            case NodeKind.UnaryExpression:
                left = stack.pop()!
                switch (key.operator) {
                    case UnaryExpressionOperator.Not:
                        stack.push(!!left)
                        break;
                    case UnaryExpressionOperator.Length:
                        stack.push(left.length)
                        break;
                    case UnaryExpressionOperator.BitNegate:
                        stack.push(~left)
                        break;
                    case UnaryExpressionOperator.ArithmeticNegate:
                        stack.push(-left)
                        break;
                }
                break;
            case NodeKind.MemberExpression:
                break;
            case NodeKind.IndexExpression:
                break;
            case NodeKind.CallExpression:
                break;
            case NodeKind.TableCallExpression:
                break;
            case NodeKind.StringCallExpression:
                break;
            case NodeKind.FunctionDeclaration:
                break;
        }
        return 0;
    }
    
    function visit(node: Container, context: TableVisitorContext) {
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
    
}

export function entries<E>(obj: ObjectMap<E>): [string | number, E][] {
    return Object.keys(obj).map(x => [x, obj[x]])
}
