import {Container, ExpressionContainer, NodeKind} from "../../components/container-types.js";
import {SymbolTable, Token, TypeGuide} from "../symbol-table.js";
import {Program} from "../../components/nodes/meta/program.js";
import {ChunkContainer} from "../../components/nodes/meta/chunk-container.js";
import {Block} from "../../components/nodes/meta/block.js";
import {FunctionExpressionContainer} from "../../components/nodes/expression/function-expression-container.js";
import {ReturnStatementContainer} from "../../components/nodes/statement/return-statement-container.js";
import {IfStatementContainer} from "../../components/nodes/statement/if-statement/if-statement-container.js";
import {IfClauseContainer} from "../../components/nodes/statement/if-statement/clause/if-clause-container.js";
import {ElseifClauseContainer} from "../../components/nodes/statement/if-statement/clause/elseif-clause-container.js";
import {ElseClauseContainer} from "../../components/nodes/statement/if-statement/clause/else-clause-container.js";
import {WhileStatementContainer} from "../../components/nodes/statement/while-statement-container.js";
import {DoStatementContainer} from "../../components/nodes/statement/do-statement-container.js";
import {RepeatStatementContainer} from "../../components/nodes/statement/repeat-statement-container.js";
import {LocalStatementContainer} from "../../components/nodes/statement/assign/local-statement-container.js";
import {AssignmentStatementContainer} from "../../components/nodes/statement/assign/assignment-statement-container.js";
import {ForNumericStatementContainer} from "../../components/nodes/statement/for-numeric-statement-container.js";
import {ForGenericStatementContainer} from "../../components/nodes/statement/for-generic-statement-container.js";
import {StringLiteralContainer} from "../../components/nodes/expression/literal/string-literal-container.js";
import {NumericLiteralContainer} from "../../components/nodes/expression/literal/numeric-literal-container.js";
import {BooleanLiteralContainer} from "../../components/nodes/expression/literal/boolean-literal-container.js";
import {NilLiteralContainer} from "../../components/nodes/expression/literal/nil-literal-container.js";
import {VarargLiteralContainer} from "../../components/nodes/expression/literal/vararg-literal-container.js";
import {
    BinaryExpressionContainer
} from "../../components/nodes/expression/binary-expression/binary-expression-container.js";
import {
    LogicalExpressionContainer
} from "../../components/nodes/expression/binary-expression/logical-expression-container.js";
import {UnaryExpressionContainer} from "../../components/nodes/expression/unary-expression-container.js";
import {CallStatementContainer} from "../../components/nodes/statement/call-statement-container.js";
import {CallExpressionContainer} from "../../components/nodes/expression/call-expression/call-expression-container.js";
import {
    TableCallExpressionContainer
} from "../../components/nodes/expression/call-expression/table-call-expression-container.js";
import {
    StringCallExpressionContainer
} from "../../components/nodes/expression/call-expression/string-call-expression-container.js";
import {IdentifierContainer} from "../../components/nodes/expression/literal/identifier-container.js";
import {MemberExpressionContainer} from "../../components/nodes/expression/member-expression-container.js";
import {IndexExpressionContainer} from "../../components/nodes/expression/index-expression-container.js";
import {
    TableConstructorExpressionContainer
} from "../../components/nodes/expression/table/table-constructor-expression-container.js";
import {TableKeyContainer} from "../../components/nodes/expression/table/table-entry/table-key-container.js";
import {
    TableKeyStringContainer
} from "../../components/nodes/expression/table/table-entry/table-key-string-container.js";
import {TableValueContainer} from "../../components/nodes/expression/table/table-entry/table-value-container.js";
import {CommentContainer} from "../../components/nodes/trivia/comment-trivia-container.js";
import {LabelStatementContainer} from "../../components/nodes/statement/label-statement-container.js";
import {BreakStatementContainer} from "../../components/nodes/statement/break-statement-container.js";
import {GotoStatementContainer} from "../../components/nodes/statement/goto-statement-container.js";
import {VariableContainer} from "../../components/nodes/expression/variable-container.js";
import {VoidFunction} from "../../../utility/void-function.js";

export type TableVisitor = {
    [A in NodeKind]: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never, context: SymbolTable, curse: (curse: VoidFunction) => void) => void
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

function applyAssignment(variables: VariableContainer[], expression: ExpressionContainer, table: SymbolTable) {
    const instance = expression.symbol.properties.instance
    if (instance) {
        if (variables.length > 1) {
            if (instance instanceof Array) {
                for (let i = 0; i < variables.length; i++) {
                    const value = instance[i]
                    if (value instanceof Token) {
                        variables[i].symbol = value
                        // variables[i].symbol.properties.instance = value.properties.instance
                    } else {
                        variables[i].symbol = table.createToken()
                        variables[i].symbol.properties.instance = value || null
                    }
                }
            } else {
                throw new Error()
            }
        } else {
            if (instance instanceof Token) {
                variables[0].symbol = instance
                // variables[0].symbol.properties.instance = instance.properties.instance
            } else {
                variables[0].symbol = table.createToken()
                variables[0].symbol.properties.instance = null
            }
        }
    } else {
        for (let variable of variables) {
            variable.symbol = table.createToken()
            variable.symbol.properties.instance = null
        }
    }
}

const tableVisitor: TableVisitor = {
    [NodeKind.Program]: function (node: Program, table: SymbolTable, curse): void {
        visit(node.source, table, curse)
    },
    [NodeKind.Chunk]: function (node: ChunkContainer, table: SymbolTable, curse): void {
        visit(node.block, table, curse)
    },
    [NodeKind.Block]: function (node: Block, table: SymbolTable, curse): void {
        for (let statement of node.statements) {
            curse(() => {
                visit(statement, node.symbols, curse)
            })
        }
    },
    [NodeKind.FunctionDeclaration]: function (node: FunctionExpressionContainer, table: SymbolTable, curse): void {
        if (node.identifier) {
            if (node.isLocal) {
                const leftMost = leftMostExpression(node.identifier)
                if (leftMost && leftMost.kind === NodeKind.Identifier) {
                    if (!table.has(leftMost.name)) {
                        table.enter(leftMost.name, table.createToken())
                    }
                } else {
                    node.emitError(`tried to declare a function on ${leftMost.kind}`)
                    throw new Error()
                }
                visit(node.identifier, table, curse)
            } else {
                visit(node.identifier, table, curse)
            }
            const typeGuide = node.identifier.symbol.properties.typeGuide
            if (typeGuide) {
                continueTypeGuide(typeGuide)
            } else {
                node.symbol = node.identifier.symbol
                node.symbol.addDeclaration(node)
                node.visitLater = () => {
                    if (node.identifier!.symbol.properties.typeGuide) {
                        continueTypeGuide(node.identifier!.symbol.properties.typeGuide!)
                        continueVisit()
                    } else {
                        if (node.bypassTypeGuideCheck) {
                            continueVisit()
                        } else {
                            console.error('continue visit without type guide')
                        }
                    }
                }
                return
            }
        } else {
            node.emitError("Not implemented. Try to declare the function, otherwise it cannot be checked.")
            throw new Error("Not implemented. Try to declare the function, otherwise it cannot be checked.")
        }
        continueVisit()
        
        function continueTypeGuide(typeGuide: TypeGuide[]) {
            for (let typeGuideElement of typeGuide) {
                if (!(typeGuideElement instanceof Array)) {
                    if (typeGuideElement.type === 'function') {
                        typeGuideElement.parameter(...node.parameter)
                    }
                }
            }
        }
        
        function continueVisit() {
            for (let i = 0; i < node.parameter.length; i++) {
                let parameter = node.parameter[i];
                switch (parameter.kind) {
                    case NodeKind.VarargLiteral:
                        break;
                    case NodeKind.Identifier:
                        if (!parameter.hasSymbol) {
                            parameter.symbol = node.functionBody.symbols.enter(parameter.name, table.createToken(parameter))
                        } else {
                            node.functionBody.symbols.enter(parameter.name, parameter.symbol)
                        }
                        break;
                }
            }
            visit(node.block, table, curse)
        }
    },
    [NodeKind.ReturnStatement]: function (node: ReturnStatementContainer, table: SymbolTable, curse): void {
        for (let i = 0; i < node.arguments.length; i++) {
            let argument = node.arguments[i];
            visit(argument, table, curse)
        }
    },
    [NodeKind.IfStatement]: function (node: IfStatementContainer, table: SymbolTable, curse): void {
        for (let clause of node.clauses) {
            visit(clause, table, curse)
        }
    },
    [NodeKind.IfClause]: function (node: IfClauseContainer, table: SymbolTable, curse): void {
        visit(node.condition, table, curse)
        visit(node.block, table, curse)
    },
    [NodeKind.ElseifClause]: function (node: ElseifClauseContainer, table: SymbolTable, curse): void {
        visit(node.condition, table, curse)
        visit(node.block, table, curse)
    },
    [NodeKind.ElseClause]: function (node: ElseClauseContainer, table: SymbolTable, curse): void {
        visit(node.block, table, curse)
    },
    [NodeKind.WhileStatement]: function (node: WhileStatementContainer, table: SymbolTable, curse): void {
        visit(node.condition, table, curse)
        visit(node.block, table, curse)
    },
    [NodeKind.DoStatement]: function (node: DoStatementContainer, table: SymbolTable, curse): void {
        visit(node.block, table, curse)
    },
    [NodeKind.RepeatStatement]: function (node: RepeatStatementContainer, table: SymbolTable, curse): void {
        visit(node.condition, table, curse)
        visit(node.block, table, curse)
    },
    [NodeKind.LocalStatement]: function (node: LocalStatementContainer, table: SymbolTable, curse): void {
        for (let i = 0; i < node.init.length; i++) {
            let init = node.init[i];
            visit(init, table, curse)
        }
        for (let [, variables, expression] of table.getAssignmentsByContainerDeep(node)) {
            applyAssignment(variables, expression, table)
        }
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i]
            variable.symbol.addDeclaration(variable)
            table.lookup(variable.name) || table.enter(variable.name, variable.symbol)
        }
    },
    [NodeKind.AssignmentStatement]: function (node: AssignmentStatementContainer, table: SymbolTable, curse): void {
        for (let i = 0; i < node.init.length; i++) {
            let init = node.init[i];
            visit(init, table, curse)
        }
        for (let [, variables, expression] of table.getAssignmentsByContainerDeep(node)) {
            applyAssignment(variables, expression, table)
        }
        for (let i = 0; i < node.variables.length; i++) {
            let variable = node.variables[i];
            switch (variable.kind) {
                case NodeKind.Identifier:
                    table.lookup(variable.name) || table.global.enter(variable.name, table.createToken(variable))
                    break;
                case NodeKind.IndexExpression:
                    if (!variable.base.hasSymbol) {
                        visit(variable.base, table, curse)
                        visit(variable.index, table, curse)
                    }
                    break;
                case NodeKind.MemberExpression:
                    visit(variable.base, table, curse)
                    variable.base.symbol.lookup(variable.identifier.name)
                    || variable.base.symbol.enter(variable.identifier.name, table.createToken(variable.identifier))
                    break;
            }
            variable.symbol.addDeclaration(variable)
        }
    },
    [NodeKind.ForNumericStatement]: function (node: ForNumericStatementContainer, table: SymbolTable, curse): void {
        node.emitError("Not implemented.")
        throw new Error("Not implemented.")
    },
    [NodeKind.ForGenericStatement]: function (node: ForGenericStatementContainer, table: SymbolTable, curse): void {
        node.emitError("Not implemented.")
        throw new Error("Not implemented.")
    },
    [NodeKind.StringLiteral]: function (node: StringLiteralContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.NumericLiteral]: function (node: NumericLiteralContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.BooleanLiteral]: function (node: BooleanLiteralContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        node.symbol.properties.instance = node.value
    },
    [NodeKind.NilLiteral]: function (node: NilLiteralContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        node.symbol.properties.instance = null
    },
    [NodeKind.VarargLiteral]: function (node: VarargLiteralContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
    },
    [NodeKind.BinaryExpression]: function (node: BinaryExpressionContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        visit(node.left, table, curse)
        visit(node.right, table, curse)
        node.symbol.properties.instance = {
            operator: node.operator,
            left: node.left.symbol.tid,
            right: node.right.symbol.tid
        }
        node.symbol.properties.type = 'BinaryExpression'
    },
    [NodeKind.LogicalExpression]: function (node: LogicalExpressionContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        switch (node.operator) {
            case "or":
                visit(node.left, table, curse)
                visit(node.right, table, curse)
                break
            case "and":
                visit(node.left, table, curse)
                visit(node.right, table, curse)
                break
        }
    },
    [NodeKind.UnaryExpression]: function (node: UnaryExpressionContainer, table: SymbolTable, curse): void {
        node.symbol = table.createToken(node)
        visit(node.argument, table, curse)
    },
    [NodeKind.CallStatement]: function (node: CallStatementContainer, table: SymbolTable, curse): void {
        visit(node.expression, table, curse)
    },
    [NodeKind.CallExpression]: function (node: CallExpressionContainer, table: SymbolTable, curse): void {
        for (let i = 0; i < node.arguments.length; i++) {
            let argument = node.arguments[i];
            visit(argument, table, curse)
        }
        visit(node.base, table, curse)
        if (node.base.hasSymbol) {
            const _function = node.base.symbol.properties.instance
            if (_function && typeof _function === 'function') {
                const result = _function(...node.arguments.map(x => x.symbol))
                node.symbol = table.createToken(node)
                node.symbol.properties.instance = result
            } else {
                node.emitError(`${node.base.text} is not callable`)
            }
        }
    },
    [NodeKind.TableCallExpression]: function (node: TableCallExpressionContainer, table: SymbolTable, curse): void {
        visit(node.base, table, curse)
        throw new Error('table call expressions not supported')
    },
    [NodeKind.StringCallExpression]: function (node: StringCallExpressionContainer, table: SymbolTable, curse): void {
        visit(node.base, table, curse)
        throw new Error('string call expressions not supported')
    },
    [NodeKind.Identifier]: function (node: IdentifierContainer, table: SymbolTable, curse): void {
        if (!node.hasSymbol) {
            const symbol = table.lookup(node.name)
            if (!symbol) {
                const upperStatement = node.searchUpperStatement()
                if (upperStatement) {
                    switch (upperStatement.kind) {
                        case NodeKind.BreakStatement:
                        case NodeKind.LabelStatement:
                        case NodeKind.GotoStatement:
                        case NodeKind.ReturnStatement:
                        case NodeKind.IfStatement:
                        case NodeKind.WhileStatement:
                        case NodeKind.DoStatement:
                        case NodeKind.RepeatStatement:
                        case NodeKind.CallStatement:
                        case NodeKind.ForNumericStatement:
                        case NodeKind.ForGenericStatement:
                            node.emitError(`Couldn't find Declaration for ${node.text}`, 'prevent escape = true')
                            break;
                        case NodeKind.FunctionDeclaration:
                        case NodeKind.LocalStatement:
                        case NodeKind.AssignmentStatement:
                            break;
                    }
                }
            }
            node.symbol = symbol || table.global.enter(node.name, table.createToken(node))
        }
    },
    [NodeKind.MemberExpression]: function (node: MemberExpressionContainer, table: SymbolTable, curse): void {
        visit(node.base, table, curse)
        switch (node.indexer) {
            case ".":
                let symbol = node.base.symbol.lookup(node.identifier.name)
                if (!symbol) {
                    if (node.base.symbol.properties.immutable) {
                        node.emitError(`variable ${node.base.text} does not have a known member ${node.identifier.name}`, 'prevent escape = true')
                    }
                }
                node.identifier.symbol = node.base.symbol.lookup(node.identifier.name) || node.base.symbol.enter(node.identifier.name, table.createToken(node.identifier))
                node.symbol = node.identifier.symbol
                break
            case ":":
                if (node.base.symbol.properties.type) {
                    const type = node.base.symbol.properties.type
                    const tableReference = table.lookup(type)
                    if (tableReference) {
                        const targetFunctionEntry = tableReference?.lookup(node.identifier.name)
                        if (targetFunctionEntry) {
                            const targetFunction = targetFunctionEntry.properties.instance
                            if (targetFunction) {
                                if (typeof targetFunction === 'function') {
                                    const token = table.createToken()
                                    token.properties.instance = (...args) => {
                                        return targetFunction(node.base.symbol, ...args)
                                    }
                                    node.identifier.symbol = token
                                    node.symbol = token
                                } else {
                                    node.emitError(`${type}:${node.identifier.name} is not a function`)
                                }
                            } else {
                                node.emitError(`${type}:${node.identifier.name} is undefined`)
                            }
                        } else {
                            node.emitError(`type ${type} does not have a known member ${node.identifier.name}`)
                        }
                    } else {
                        node.emitError(`type ${type} not found`)
                    }
                } else {
                    node.emitError(`${node.base.text} has no type set, cannot resolve member ${node.identifier.text} to function`)
                }
                break
        }
    },
    [NodeKind.IndexExpression]: function (node: IndexExpressionContainer, table: SymbolTable, curse): void {
        visit(node.index, table, curse)
        visit(node.base, table, curse)
    },
    [NodeKind.TableConstructorExpression]: function (node: TableConstructorExpressionContainer, table: SymbolTable, curse): void {
        const symbol = table.createToken()
        node.emitError(`Table not implemented`)
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
    [NodeKind.TableKey]: function (node: TableKeyContainer, table: SymbolTable, curse): void {
    },
    [NodeKind.TableKeyString]: function (node: TableKeyStringContainer, table: SymbolTable, curse): void {
    },
    [NodeKind.TableValue]: function (node: TableValueContainer, table: SymbolTable, curse): void {
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
    let curses: VoidFunction[] = []
    visit(program.source, program.source.symbols, curse => {
        curses.push(curse)
    })
    runCurse()
    program.forEachDeep(node => {
        if (node.kind === NodeKind.FunctionDeclaration) {
            if (node.visitLater) {
                console.warn('node.bypassTypeGuideCheck')
                node.bypassTypeGuideCheck = true
                node.visitLater()
                node.visitLater = undefined
                runCurse()
            }
            return false
        } else {
            return true
        }
    })
    
    function runCurse(safe: boolean = false) {
        while (curses.length > 0) {
            if (safe) {
                try {
                    step()
                } catch (e) {
                    console.error(e)
                }
            } else {
                step()
            }
        }
        
        function step() {
            const curseNow = curses
            curses = []
            for (let voidFunction of curseNow) {
                voidFunction()
            }
        }
    }
}

function visit(node: Container, table: SymbolTable, curse: (curse: VoidFunction) => void) {
    if (node.compilerOptions.parserOptions && node.compilerOptions.parserOptions.ignore.includes(node.kind)) {
        return
    }
    tableVisitor[node.kind](node as never, table, curse)
}