import {Container, NodeKind} from "./compiler/components/types.js";

const parentRelation: Map<NodeKind, Set<NodeKind>> = new Map()
const childRelation: Map<NodeKind, Map<string, Set<NodeKind>>> = new Map()

/**
 * @deprecated
 * @param container
 * @param depth
 * @param out
 */
export function print(container: Container, depth: number, out: (text: string) => void) {
    
    const parent = container.parent
    if (parent) {
        if (!parentRelation.has(container.kind)) {
            parentRelation.set(container.kind, new Set([parent.kind]))
        } else {
            parentRelation.get(container.kind)?.add(parent.kind)
        }
    }
    if (!childRelation.has(container.kind)) {
        childRelation.set(container.kind, new Map())
    }
    
    function _printAll<E>(container: E, key: keyof E) {
        if (key === 'block') {
            //@ts-ignore
            const statements = container.block.statements
            out(`${''.padStart(depth * 4, ' ')}body:`)
            for (let i = 0; i < statements.length; i++) {
                out(`${''.padStart(depth * 8, ' ')}[${i}]`)
                print(statements[i], depth, text => out(''.padStart(depth * 12, ' ') + text))
            }
        } else {
            out(`${''.padStart(depth * 4, ' ')}${key.toString()}:`)
            for (let i = 0; i < container[key.toString()].length; i++) {
                out(`${''.padStart(depth * 8, ' ')}[${i}]`)
                print(container[key.toString()][i], depth, text => out(''.padStart(depth * 12, ' ') + text))
            }
        }
    }
    
    function _print<E extends Container>(container: E, key: keyof E) {
        if (!childRelation.get(container.kind)!.has(key as string)) {
            childRelation.get(container.kind)!.set(key as string, new Set([container[key as string].kind]))
        } else {
            childRelation.get(container.kind)!.get(key as string)?.add(container[key as string].kind)
        }
        out(`${''.padStart(depth * 4, ' ')}${key.toString()}:`)
        print(container[key.toString()], depth, text => out(''.padStart(depth * 8, ' ') + text))
    }
    
    function _printKeyVal<E extends Container>(container: E, key: keyof E | string, any: any) {
        out(`${''.padStart(depth * 4, ' ')}${key as string}: ${any}`)
    }
    
    try {
        const name = Array.from((container.kind + '').matchAll(/[A-Z][a-z]+/gm)).map(x => x[0].trim()).filter(x => x.length > 0).map(x => x.toLowerCase()).join('-')
        out(name + ' $' + container.id)
    } catch (e) {
        console.error(e)
    }
    try {
        switch (container.kind) {
            case NodeKind.BreakStatement:
                break;
            case NodeKind.LabelStatement:
                _print(container, 'label')
                break;
            case NodeKind.GotoStatement:
                _print(container, 'label')
                break;
            case NodeKind.ReturnStatement:
                _printAll(container, 'arguments')
                break;
            case NodeKind.IfStatement:
                _printAll(container, 'clauses')
                break;
            case NodeKind.WhileStatement:
                _print(container, 'condition')
                _printAll(container, 'block')
                break;
            case NodeKind.DoStatement:
                _printAll(container, 'block')
                break;
            case NodeKind.RepeatStatement:
                _print(container, 'condition')
                _printAll(container, 'block')
                break;
            case NodeKind.LocalStatement:
                _print(container, 'variables')
                _print(container, 'init')
                break;
            case NodeKind.AssignmentStatement:
                _print(container, 'variables')
                _print(container, 'init')
                break;
            case NodeKind.CallStatement:
                _print(container, 'expression')
                break;
            case NodeKind.ForNumericStatement:
                _print(container, 'start')
                _print(container, 'end')
                if (container.step) _print(container, 'step')
                _printAll(container, 'block')
                break;
            case NodeKind.ForGenericStatement:
                _printAll(container, 'variables')
                _printAll(container, 'iterators')
                _printAll(container, 'block')
                break;
            case NodeKind.FunctionDeclaration:
                if (container.identifier) _print(container, 'identifier')
                _printAll(container, 'parameter')
                _printAll(container, 'block')
                break;
            case NodeKind.Identifier:
                _printKeyVal(container, 'name', container.node.name)
                break;
            case NodeKind.StringLiteral:
                _printKeyVal(container, 'value', container.node.raw)
                break;
            case NodeKind.NumericLiteral:
                _printKeyVal(container, 'value', container.node.raw)
                break;
            case NodeKind.BooleanLiteral:
                _printKeyVal(container, 'value', container.node.raw)
                break;
            case NodeKind.NilLiteral:
                _printKeyVal(container, 'value', container.node.raw)
                break;
            case NodeKind.VarargLiteral:
                _printKeyVal(container, 'value', container.node.raw)
                break;
            case NodeKind.TableConstructorExpression:
                _print(container, 'fields')
                break;
            case NodeKind.BinaryExpression:
                _printKeyVal(container, 'operator', container.node.operator)
                _print(container, 'left')
                _print(container, 'right')
                break;
            case NodeKind.LogicalExpression:
                _printKeyVal(container, 'operator', container.node.operator)
                _print(container, 'left')
                _print(container, 'right')
                break;
            case NodeKind.UnaryExpression:
                _printKeyVal(container, 'operator', container.node.operator)
                _print(container, 'argument')
                break;
            case NodeKind.MemberExpression:
                _print(container, 'base')
                _print(container, 'identifier')
                _printKeyVal(container, 'indexer', container.node.indexer)
                break;
            case NodeKind.IndexExpression:
                _print(container, 'base')
                _print(container, 'index')
                break;
            case NodeKind.CallExpression:
                _print(container, 'base')
                _printAll(container, 'arguments')
                break;
            case NodeKind.TableCallExpression:
                _print(container, 'base')
                _print(container, 'arguments')
                break;
            case NodeKind.StringCallExpression:
                _print(container, 'base')
                _print(container, 'argument')
                break;
            case NodeKind.IfClause:
                _print(container, 'condition')
                _printAll(container, 'block')
                break;
            case NodeKind.ElseifClause:
                _print(container, 'condition')
                _printAll(container, 'block')
                break;
            case NodeKind.ElseClause:
                _printAll(container, 'block')
                break;
            case NodeKind.Chunk:
                _printAll(container, 'block')
                break;
            case NodeKind.TableKey:
                _print(container, 'key')
                _print(container, 'value')
                break;
            case NodeKind.TableKeyString:
                _print(container, 'key')
                _print(container, 'value')
                break;
            case NodeKind.TableValue:
                _print(container, 'value')
                break;
            case NodeKind.Comment:
                break;
        }
    } catch (e) {
        out(`ERROR @${JSON.stringify(container.node.loc)}`)
    }
}