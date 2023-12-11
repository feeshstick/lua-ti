import {Program} from "../../components/nodes/meta/program.js";
import {NodeKind} from "../../components/container-types.js";
import {LocalStatementContainer} from "../../components/nodes/statement/assign/local-statement-container.js";
import {AssignmentStatementContainer} from "../../components/nodes/statement/assign/assignment-statement-container.js";

function assignExpressionsToToken(node: LocalStatementContainer | AssignmentStatementContainer) {
    const expressionStack = [...node.init]
    const variableStack = [...node.variables]
    while (expressionStack.length > 0) {
        const expression = expressionStack.shift()!
        if (expressionStack.length === 0) {
            node.symbols.enterAssignment(node, variableStack, expression)
        } else {
            const variable = variableStack.shift()!
            node.symbols.enterAssignment(node, [variable], expression)
        }
    }
}

export function collectAssignStatements(program: Program) {
    program.source.forEachDeep(node => {
        if (node.kind === NodeKind.AssignmentStatement) {
            assignExpressionsToToken(node)
        } else if (node.kind === NodeKind.LocalStatement) {
            assignExpressionsToToken(node)
        }
        return true
    })
}