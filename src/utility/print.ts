import {SymbolTable, Token} from "../compiler/table/symbol-table.js";
import {createStringBuilder} from "../compiler/utility/string-builder.js";
import {
    Container,
    ExpressionContainer,
    isExpressionContainer,
    NodeKind
} from "../compiler/components/container-types.js";
import chalk from "chalk";
import {VariableContainer} from "../compiler/components/nodes/expression/variable-container.js";

export function printSymbolTable(table: SymbolTable | Token) {
    const out = createStringBuilder()
    table.getText(out)
    console.log(out.text)
}

export function printSymbolCoverage(node: Container) {
    const out = createStringBuilder()
    print(node)
    
    function print(container: Container) {
        let symbol
        if (isExpressionContainer(container)) {
            symbol = ' ' + (container.hasSymbol ? chalk.rgb(0, 255, 0)('yes') : chalk.rgb(255, 0, 0)('no'))
            if (container.hasSymbol) {
                symbol += ' ' + chalk.blueBright(container.symbol.properties.type)
                symbol += ' ' + chalk.cyanBright(typeof container.symbol.properties.instance)
            }
        } else {
            symbol = '-'
        }
        if (container.kind === NodeKind.MemberExpression || container.kind === NodeKind.Identifier) {
            symbol += ' ' + container.text
        }
        out.namedBlock(container.kind + symbol, () => {
            container.forEachChild(child => {
                print(child)
            })
        })
    }
    
    console.log(out.text)
}

export function printAssignStatements(table: SymbolTable) {
    const byContainer: Map<number, [VariableContainer[], ExpressionContainer][]> = new Map()
    for (let [key, variables, expression] of table.getAssignmentsDeep()) {
        if (!byContainer.has(key.id)) {
            byContainer.set(key.id, [[variables, expression]])
        } else {
            byContainer.get(key.id)?.push([variables, expression])
        }
    }
    const out = createStringBuilder()
    for (let [containerID, values] of byContainer) {
        out.namedBlock(containerID + '', () => {
            for (let [variables, expression] of values) {
                if (variables.length > 1) {
                    out.println(`-> [${variables.map(x => x.text).join(', ')}] = ${expression.text}`)
                } else {
                    out.println(`-> ${variables.map(x => x.text).join(', ')} = ${expression.text}`)
                }
            }
        })
    }
    console.log(out.text)
}