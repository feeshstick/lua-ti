import {Container, NodeKind} from "../components/container-types.js";
import {createStringBuilder, StringBuilder} from "./string-builder.js";

export function astPrint(container: Container) {
    const stringBuilder = createStringBuilder()
    _print(container, stringBuilder)
    
    function _print(node: Container, out: StringBuilder) {
        if (node.kind === NodeKind.Identifier) {
            out.println(`${node.id} ${node.kind} ${node.name}`)
        } else {
            out.println(`${node.id} ${node.kind}`)
        }
        node.forEachChild(child => {
            out.block(() => {
                _print(child, out)
            })
        })
    }
    
    const text = stringBuilder.text
    const lines = text.split(/\n/gm)
    const itemIDs = lines.map(line => {
        if (line.trim().length > 0) {
            return `ref_${/^\d+/gm.exec(line.trim())![0]}`
        } else {
            return ''
        }
    })
    const leftWidth = lines.reduce((p, c) => Math.max(p, c.length), 0)
    const rightWidth = itemIDs.reduce((p, c) => Math.max(p, c.length), 0)
    return lines.map((line, index) => {
        return line.padEnd(leftWidth, ' ') + ' | ' + itemIDs[index].padStart(rightWidth)
    }).slice(0, -1).join('\n')
}