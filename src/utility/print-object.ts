import {Container, isExpressionContainer, NodeKind} from "../compiler/components/container-types.js";
import {SymbolTable, Token} from "../compiler/table/symbol-table.js";
import {forEachChildExtended} from "../compiler/components/base-container.js";
import {ReducedSymbolTable, SymbolCoverageNode} from "../compiler/shared/share.js";

export function getSymbolCoverage(container: Container): SymbolCoverageNode {
    return getCoverage(container)
    
    function getCoverage(container: Container): SymbolCoverageNode {
        const coverage: SymbolCoverageNode = {
            containerID: container.id,
            containerKind: container.kind,
            symbol: undefined,
            children: []
        }
        if (isExpressionContainer(container)) {
            coverage.symbol = {
                hasSymbol: container.hasSymbol,
            }
            if (container.kind === NodeKind.MemberExpression || container.kind === NodeKind.Identifier) {
                coverage.symbol.text = container.text
            }
        }
        forEachChildExtended(container, (child, key, index) => {
            for (let cld of coverage.children) {
                if (cld.key === key) {
                    cld.value[index] = getCoverage(child)
                    return
                }
            }
            coverage.children.push({
                key: key,
                value: [getCoverage(child)]
            })
        })
        return coverage
    }
}

export function getSymbolTable(table: SymbolTable | Token): ReducedSymbolTable {
    return table.reduce(new Set()) as ReducedSymbolTable
}

const struct = {
    foo: '',
    bar: 0
}

const value = {foo: '', bar: 0}

function mapToTypeof(obj: any): any {
    return Object.entries(obj)
        .map(([key, val]) => {
            if (typeof val === 'object') {
                if (val instanceof Array) {
                    return [key, val.map(entry => mapToTypeof(entry))]
                } else if (val) {
                    return [key, mapToTypeof(val)]
                }
            }
            return [key, typeof val]
        })
        .sort((a, b) => a[0].localeCompare(b[0]))
        .reduce((p, [k, v]) => {
            return p[k] = v
        }, {})
}

console.log(JSON.stringify(mapToTypeof(struct)) === JSON.stringify(mapToTypeof(value)))

enum SyntaxKind {
    Function,
    Parameter,
    TypeDeclaration,
}

enum SomeNamespace {
    Auxiliary
}

enum SomeStatus {
    Stable
}

type PrimitiveType = 'int' | 'bool'

interface ParameterNode {
    kind: SyntaxKind.Parameter
    type: PrimitiveType
}

interface FunctionNode {
    kind: SyntaxKind.Function
    name: 'AddNormalSetProcedure'
    namespace: SomeNamespace
    description: string
    status: {
        index: SomeStatus
    }
    parameters: ParameterNode[]
}