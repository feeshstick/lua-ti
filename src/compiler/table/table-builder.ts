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
import {BinaryExpressionOperator, Container, NodeKind, UnaryExpressionOperator} from "../components/container-types.js";
import {
    ContainerFlag,
    isAssignNewValue,
    isCallFlag,
    isDeclarationFlag,
    isLocalFlag,
    isMemberFlag,
    isParameterFlag,
    isSemiFlag
} from "../components/base-container.js";
import {LuaTiError, LuaTiErrorHelper} from "../error/lua-ti-error.js";
import {
    addCallToVariable,
    addMemberToVariable,
    BubbleBreak,
    Call,
    FunctionDeclaration,
    LSymbolTableKind,
    ObjectMap,
    SymbolFlag,
    Variable
} from "./symbol-table.js";
import {createStringBuilder} from "../utility/string-builder.js";
import {LuaTiErrorLevel} from "../error/lua-ti-error-level.js";
import {LuaTiErrorCode} from "../error/lua-ti-error-code.js";
import {AnnotationParser} from "../annotation/annotation-parser.js";
import {ClassAnnotation, LuaBasicType, SignatureAnnotation} from "../annotation/annotation.js";
import {ClassMemberType, ClassType, Type, TypeKind} from "../type/type.js";
import {CompilerOptions} from "../compiler-options/compiler-options.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: TableVisitorContext) => void
}

export class TableVisitorContext {
    private _currentFile: string | undefined
    private functionSignatureStack: FunctionDeclaration[] = []
    
    constructor() {
    }
    
    set currentFile(value: string | undefined) {
        this._currentFile = value;
    }
    
    startFunctionSignature(signature: FunctionDeclaration) {
        this.functionSignatureStack.push(signature)
    }
    
    getFunctionSignature() {
        return this.functionSignatureStack[this.functionSignatureStack.length - 1]
    }
    
    endFunctionSignature() {
        this.functionSignatureStack.pop()
    }
    
    
}

function flagToString(flag: ContainerFlag) {
    const flags: [string, number][] = [
        ['None', ContainerFlag.None],
        ['Declaration', ContainerFlag.Declaration],
        ['Global', ContainerFlag.Global],
        ['Local', ContainerFlag.Local],
        ['Member', ContainerFlag.Member],
        ['Function', ContainerFlag.Function],
        ['Parameter', ContainerFlag.Parameter],
        ['Call', ContainerFlag.Call],
        ['Argument', ContainerFlag.Argument],
        ['Semi', ContainerFlag.Semi],
        ['Indexed', ContainerFlag.Indexed],
        ['AssignNewValue', ContainerFlag.AssignNewValue],
        ['DeclareGlobal', ContainerFlag.DeclareGlobal],
        ['DeclareLocal', ContainerFlag.DeclareLocal],
        ['DeclareOrResolveGlobal', ContainerFlag.DeclareOrResolveGlobal],
        ['DeclareOrResolveLocal', ContainerFlag.DeclareOrResolveLocal],
    ]
    
    const out = createStringBuilder()
    for (let [name, flagEntry] of flags) {
        if ((flagEntry & flag) === flagEntry) {
            out.println(name + ' ' + flagEntry.toString(2) + ' ' + flag.toString(2))
        }
    }
    
    return out.text
}

export function buildTable(sourceFile: SourceFileContainer) {
    
    let symbolCounter = 0
    const annotationParser = new AnnotationParser()
    let currentFileFlag: CompilerOptions['fileFlag']
    
    const createSymbol: (container?: Container, name?: string) => Variable = function (container?: Container, name?: string): Variable {
        return {
            id: symbolCounter++,
            kind: LSymbolTableKind.Variable,
            flag: SymbolFlag.None,
            declarations: container ? [container] : [],
            name: name,
            indexedMember: [],
            functionDeclaration: undefined,
            offset: undefined,
            type: undefined
        }
    }
    
    function declareClass(annotation: ClassAnnotation): ClassType {
        return {
            kind: TypeKind.Class,
            name: annotation.name,
            location: annotation.location,
            member: annotation.fields.reduce<{ [key: string]: ClassMemberType }>((p, c) => {
                p[c.name] = {
                    kind: TypeKind.ClassMember,
                    location: c.location,
                    name: c.name,
                    isOptional: c.isOptional,
                    type: c.type
                }
                return p
            }, {})
        }
    }
    
    const tableVisitor: TableVisitor = {
        [NodeKind.SourceFile]: function (node: SourceFileContainer, context: TableVisitorContext): void {
            for (let chunk of node.chunks) {
                visit(chunk, context)
            }
        },
        [NodeKind.Chunk]: function (node: ChunkContainer, context: TableVisitorContext): void {
            context.currentFile = node.sourceFile.path
            currentFileFlag = node.compilerOptions.fileFlag
            visit(node.block, context)
        },
        [NodeKind.Block]: function (node: BlockContainer, context: TableVisitorContext): void {
            for (let statement of node.statements) {
                visit(statement, context)
            }
        },
        [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer, context: TableVisitorContext): void {
            node.signatureAnnotation = annotationParser.parse(node.comments) as SignatureAnnotation
            if (node.signatureAnnotation) {
                node.type = {
                    kind: TypeKind.Function,
                    returns: node.signatureAnnotation.returns.type,
                    parameter: node.signatureAnnotation.parameter.map(parameter => {
                        return {
                            kind: TypeKind.Parameter,
                            name: parameter.name,
                            isOptional: parameter.isOptional,
                            type: parameter.type,
                        }
                    })
                }
            }
            node.block.table.bubbleBreak = BubbleBreak.FunctionBubble
            for (let i = 0; i < node.parameter.length; i++) {
                let parameterElement = node.parameter[i]
                if (node.signatureAnnotation) {
                    parameterElement.parameterAnnotation = node.signatureAnnotation.parameter[i]
                }
                parameterElement.flag = ContainerFlag.Parameter
                node.setTableOverwrite(node.block.getLocalTable())
                visit(parameterElement, context)
                node.clearTableOverwrite()
            }
            if (node.identifier) {
                if (node.isLocal) {
                    node.identifier.flag = ContainerFlag.Function | ContainerFlag.Local | ContainerFlag.Declaration
                } else {
                    node.identifier.flag = ContainerFlag.Function | ContainerFlag.Global | ContainerFlag.Declaration
                }
                visit(node.identifier, context)
                node.symbol = node.identifier.symbol
                if (node.symbol.type && node.symbol.type.kind === TypeKind.ClassMember) {
                    // set type from signature annotation to type entry of symbol type.
                    node.symbol.type.type = node.type
                }
            } else {
                node.symbol = createSymbol(node)
            }
            node.symbol.functionDeclaration = {
                functionBodyTable: node.block.getLocalTable(),
                parameter: node.parameter.map((x) => ({
                    symbol: x.symbol
                })),
                declaration: node,
                returns: []
            }
            node.symbol.flag = SymbolFlag.Function
            context.startFunctionSignature(node.symbol.functionDeclaration)
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
                    arguments: node.arguments.map(x => x.symbol)
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
            const annotation = annotationParser.parse(node.comments) as ClassAnnotation
            for (let i = 0; i < node.variables.length; i++) {
                let variable = node.variables[i]
                if (annotation && i === 0) {
                    variable.type = declareClass(annotation)
                }
                variable.flag = ContainerFlag.DeclareGlobal | ContainerFlag.AssignNewValue
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
            if (node.step) {
                node.step.flag = ContainerFlag.Semi
                visit(node.step, context)
            }
            node.clearTableOverwrite()
            visit(node.block, context)
        },
        [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, context: TableVisitorContext): void {
            for (let variable of node.variables) {
                variable.flag = ContainerFlag.Semi
                node.setTableOverwrite(node.block.getLocalTable())
                visit(variable, context)
                node.clearTableOverwrite()
                const entry = node.block.table.lookup(variable.name, BubbleBreak.LocalBubble)
                if (entry) {
                    console.log('redeclaration in for generic statement')
                }
                node.block.table.getSemi()[variable.name] = variable.symbol
            }
            visit(node.block, context)
        },
        [NodeKind.StringLiteral]: function (node: StringLiteralContainer): void {
            node.symbol = createSymbol(node)
            node.type = {
                kind: TypeKind.StringLiteral,
                value: node.value
            }
        },
        [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer): void {
            node.symbol = createSymbol(node)
            node.symbol.flag = SymbolFlag.NumberLiteral
            node.type = {
                kind: TypeKind.NumberLiteral,
                value: node.value
            }
        },
        [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer): void {
            node.symbol = createSymbol(node)
            node.symbol.flag = SymbolFlag.BoolLiteral
            node.type = {
                kind: TypeKind.BooleanLiteral,
                value: node.value
            }
        },
        [NodeKind.NilLiteral]: function (node: NilLiteralContainer): void {
            node.symbol = createSymbol(node)
            node.symbol.flag = SymbolFlag.NilLiteral
            node.type = {
                kind: TypeKind.Null
            }
        },
        [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer): void {
            if (isParameterFlag(node.flag)) {
                node.table.getParameter()['...'] = createSymbol(node, '...')
            } else {
                const entry = node.table.lookup('...', BubbleBreak.FunctionBubble)
                if (entry) {
                    node.symbol = entry
                    node.symbol.flag = SymbolFlag.VarargLiteral
                } else {
                    console.error('... undefined')
                    console.log(node.table.lookup('...'))
                }
            }
        },
        [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer, context: TableVisitorContext): void {
            node.symbol = createSymbol(node)
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
            visit(node.left, context)
            visit(node.right, context)
        },
        [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer, context: TableVisitorContext): void {
            node.symbol = createSymbol(node)
            switch (node.operator) {
                case "or":
                    node.symbol.flag = SymbolFlag.LogicalOr
                    visit(node.left, context)
                    visit(node.right, context)
                    node.type = {
                        kind: TypeKind.Conditional,
                        left: node.left.type,
                        right: node.right.type
                    }
                    break
                case "and":
                    node.symbol.flag = SymbolFlag.LogicalAnd
                    visit(node.left, context)
                    visit(node.right, context)
                    node.type = {
                        kind: TypeKind.Conditional,
                        left: node.right.type,
                        right: node.left.type
                    }
                    break
            }
        },
        [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer, context: TableVisitorContext): void {
            node.symbol = createSymbol(node)
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
                node.symbol = createSymbol(node)
                node.symbol.flag = SymbolFlag.TypeOf
            } else {
                node.base.flag = ContainerFlag.Call
                visit(node.base, context)
                const entry = node.base.symbol
                const call: Call = {
                    returns: createSymbol(node),
                    declaration: node,
                    arguments: node.arguments.map(argument => ({
                        symbol: argument.symbol,
                        declaration: argument
                    }))
                }
                addCallToVariable(entry, call)
                node.symbol = call.returns
            }
        },
        [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, context: TableVisitorContext): void {
            node.arguments.flag = ContainerFlag.Argument
            visit(node.arguments, context)
            if (node.base.kind === NodeKind.Identifier && node.base.name === 'type') {
                node.symbol = createSymbol(node)
                node.symbol.flag = SymbolFlag.TypeOf
            } else {
                node.base.flag = ContainerFlag.Call
                visit(node.base, context)
                const entry = node.base.symbol
                const call: Call = {
                    returns: createSymbol(node),
                    declaration: node,
                    arguments: [node.arguments].map(argument => ({
                        symbol: argument.symbol,
                        declaration: argument
                    }))
                }
                addCallToVariable(entry, call)
                node.symbol = call.returns
            }
        },
        [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, context: TableVisitorContext): void {
            node.argument.flag = ContainerFlag.Argument
            visit(node.argument, context)
            if (node.base.kind === NodeKind.Identifier && node.base.name === 'type') {
                node.symbol = createSymbol(node)
                node.symbol.flag = SymbolFlag.TypeOf
            } else {
                node.base.flag = ContainerFlag.Call
                visit(node.base, context)
                const entry = node.base.symbol
                const call: Call = {
                    returns: createSymbol(node),
                    declaration: node,
                    arguments: [node.argument].map(argument => ({
                        symbol: argument.symbol,
                        declaration: argument
                    }))
                }
                addCallToVariable(entry, call)
                node.symbol = call.returns
            }
        },
        [NodeKind.Identifier]: function (node: IdentifierContainer): void {
            const entryList = node.table.lookupTrack(node.name)
            if (entryList) {
                const [entry, memberKind, bubbles] = entryList
                if (isDeclarationFlag(node.flag)) {
                    if (isParameterFlag(node.flag)) {
                        throw LuaTiErrorHelper.duplicateDeclarationAsParameter(node, entry, memberKind, bubbles)
                    } else if (isSemiFlag(node.flag)) {
                        throw LuaTiErrorHelper.duplicateDeclarationAsForLoopVariable(node, entry, memberKind, bubbles)
                    } else if (isLocalFlag(node.flag)) {
                        throw LuaTiErrorHelper.duplicateDeclarationAsLocalVariable(node, entry, memberKind, bubbles)
                    } else if (isAssignNewValue(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else if (isMemberFlag(node.flag)) {
                        node.symbol = entry
                    } else {
                        console.log(flagToString(node.flag))
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    }
                } else {
                    if (isParameterFlag(node.flag)) {
                        if (memberKind !== 'parameter') {
                            throw LuaTiErrorHelper.memberKindMismatch(node, entry, memberKind, 'parameter', bubbles)
                        }
                    } else if (isSemiFlag(node.flag)) {
                        if (memberKind !== 'semi') {
                            throw LuaTiErrorHelper.memberKindMismatch(node, entry, memberKind, 'semi', bubbles)
                        }
                    } else if (isLocalFlag(node.flag)) {
                        if (memberKind !== 'member') {
                            throw LuaTiErrorHelper.memberKindMismatch(node, entry, memberKind, 'member', bubbles)
                        }
                    } else if (isAssignNewValue(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else {
                        node.symbol = entry
                    }
                }
            } else {
                if (isDeclarationFlag(node.flag)) {
                    if (isParameterFlag(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else if (isSemiFlag(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else if (isLocalFlag(node.flag)) {
                        // Local Declaration e.g.: local Duel = {}
                        node.symbol = createSymbol(node, node.name)
                        node.table.enter(node.name, node.symbol, 'member', node.compilerOptions)
                    } else {
                        // Global Declaration e.g.: Duel = {}
                        node.symbol = createSymbol(node, node.name)
                        // down pass root. explicitly defined type with node.type
                        if (node.type) {
                            // up pass via node.symbol.type
                            node.symbol.type = node.type
                        }
                        node.table.global.enter(node.name, node.symbol, 'member', node.compilerOptions)
                    }
                } else {
                    if (isParameterFlag(node.flag)) {
                        // Parameter Declaration e.g.: function test(a, b, c)
                        node.symbol = createSymbol(node, node.name)
                        node.table.enter(node.name, node.symbol, 'parameter', node.compilerOptions)
                        if (node.parameterAnnotation) {
                            // e.g.:
                            // ---@name test
                            // ---@param a number
                            // ---@param b string
                            // function test(b, a) end -- throws Error because 'b' !== 'a'
                            // function test(a, c) end -- throws Error because 'b' !== 'c'
                            if (node.parameterAnnotation.name !== node.name) {
                                console.error(node.parameterAnnotation.name, node.name)
                                throw LuaTiErrorHelper.AnnotationError(`Parameter Annotation name mismatch, annotation-name="${node.parameterAnnotation.name}" node-name="${node.name}"`, node)
                            }
                            // set node.type 'down pass' as explicit declaration from annotation
                            node.type = {
                                kind: TypeKind.Parameter,
                                name: node.name,
                                isOptional: node.parameterAnnotation.isOptional,
                                type: node.parameterAnnotation.type
                            }
                            // set node.symbol.type 'up pass' as declaration of node.type
                            node.symbol.type = node.type
                        }
                    } else if (isSemiFlag(node.flag)) {
                        node.symbol = createSymbol(node, node.name)
                        node.table.enter(node.name, node.symbol, 'semi', node.compilerOptions)
                    } else if (isLocalFlag(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else if (isAssignNewValue(node.flag)) {
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    } else if (isCallFlag(node.flag)) {
                        throw LuaTiErrorHelper.CallUndefinedSymbol(node)
                    } else {
                        console.log(flagToString(node.flag))
                        throw new LuaTiError(LuaTiErrorLevel.Internal, LuaTiErrorCode.Unspecified, LuaTiErrorHelper.location(node))
                    }
                }
            }
        },
        [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, context: TableVisitorContext): void {
            node.base.flag = node.flag | ContainerFlag.Member
            visit(node.base, context)
            let targetType: Type
            if (node.base.symbol.type) {
                if (node.base.symbol.type.kind === TypeKind.Class) {
                    if (currentFileFlag === 'declarations') {
                        if (node.base.symbol.type[node.identifier.name]) {
                            throw LuaTiErrorHelper.AnnotationError()
                        } else {
                            const memberType: ClassMemberType = {
                                kind: TypeKind.ClassMember,
                                name: node.identifier.name,
                                type: undefined,
                                isOptional: false
                            }
                            targetType = memberType
                            node.base.symbol.type.member[node.identifier.name] = memberType
                        }
                    } else {
                        if (node.base.symbol.type.member[node.identifier.name]) {
                            targetType = node.base.symbol.type.member[node.identifier.name]
                        } else {
                            throw LuaTiErrorHelper.PropertyXDoesNotExistOnTypeY(node.identifier, node.identifier.name, node.base.symbol.type)
                        }
                    }
                }
            }
            if (!node.base.symbol.member) {
                node.base.symbol.member = {}
            }
            if (!node.base.symbol.member[node.identifier.name]) {
                node.base.symbol.member[node.identifier.name] = createSymbol(node, node.identifier.name)
            }
            node.symbol = node.base.symbol.member[node.identifier.name]
            node.symbol.type = targetType!
        },
        [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, context: TableVisitorContext): void {
            node.base.flag = node.flag | ContainerFlag.Member
            visit(node.base, context)
            const entry = node.base.symbol
            visit(node.index, context)
            const symbol = createSymbol(node)
            entry.indexedMember.push({
                key: node.index.symbol,
                value: symbol
            })
            node.symbol = symbol
            node.symbol.flag = SymbolFlag.Indexed
        },
        [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, context: TableVisitorContext): void {
            const entry = createSymbol(node)
            entry.flag = SymbolFlag.Table
            for (let i = 0; i < node.fields.length; i++) {
                let field = node.fields[i];
                field.symbol = entry
                visit(field, context)
            }
            node.symbol = entry
        },
        [NodeKind.TableKey]: function (node: TableKeyContainer, context: TableVisitorContext): void {
            visit(node.key, context)
            visit(node.value, context)
            if (node.key.__immutable) {
                const stack: any[] = [0]
                addMemberToVariable(stack.pop() + '', node.symbol!, node.value.symbol!)
            }
        },
        [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, context: TableVisitorContext): void {
            visit(node.key, context)
            visit(node.value, context)
            if (node.key.__immutable) {
                const stack: any[] = [0]
                addMemberToVariable(stack.pop() + '', node.symbol!, node.value.symbol!)
            }
        },
        [NodeKind.TableValue]: function (node: TableValueContainer, context: TableVisitorContext): void {
            visit(node.value, context)
            addMemberToVariable(node.index + '', node.symbol!, node.value.symbol!)
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
    
    visit(sourceFile, new TableVisitorContext())
    
    function visit(node: Container, context: TableVisitorContext) {
        try {
            tableVisitor[node.kind](node as never, context)
        } catch (e) {
            if (e instanceof LuaTiError) {
                throw e
            } else {
                throw e
            }
        }
    }
    
}

export function entries<E>(obj: ObjectMap<E>): [string | number, E][] {
    return Object.keys(obj).map(x => [x, obj[x]])
}
