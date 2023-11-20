import {Program} from "../components/nodes/meta/program.js";
import {NodeKind} from "../components/container-types.js";
import {CallExpression} from "luaparse/lib/ast.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";

export function visitTableCallInitializer(program: Program) {
    for (let source of program.sources) {
        source.forEachDeep(node => {
            if (node.kind === NodeKind.CallExpression) {
                const statement = node.searchUpperStatement()
                if (statement && (statement.kind === NodeKind.LocalStatement || statement.kind === NodeKind.AssignmentStatement)) {
                    const assignments = statement.symbols.getAssignmentsByContainer(statement)
                    for (let [container, variables, expression] of assignments) {
                        if (expression.id === node.id) {
                            console.log(expression)
                        }
                    }
                }
            }
            return true
        })
    }
}