import fs from "fs";
import {Documentation} from "./build-documentation-assets.js";

export function buildConstants() {
    const kindContext = {
        0: ['LOCATION', 'ZONES', 'SEQ'],
        1: ['TYPE', 'ATTRIBUTE', 'RACE'],
        2: ['REASON', 'LOCATION_REASON', 'SUMMON_TYPE', 'STATUS', 'ASSUME'],
        3: ['LINK_MARKER', 'COUNTER', 'PHASE', 'PLAYER'],
        4: ['CHAININFO'],
        5: ['RESET'],
        6: ['EFFECT_TYPE', 'EFFECT_FLAG'],
        7: ['EFFECT'],
        8: ['EVENT'],
        9: ['CATEGORY', 'HINT', 'CHINT'],
        10: ['OPCODE'],
        11: ['HINTMSG'],
        12: ['TIMING'],
        13: ['GLOBALFLAG'],
        14: ['EFFECT_COUNT_CODE'],
        15: ['DUEL_MODE', 'DUEL'],
        16: ['ACTIVITY'],
        17: ['WIN_REASON'],
        18: ['ANNOUNCE', 'REGISTER_FLAG', 'FUSPROC', 'MATERIAL', 'EFFECT_CLIENT_MODE', 'SELECT']
    }
    const source = fs.readFileSync('out/parsed-documentation.json').toString('utf-8')
    const documentation: Documentation[] = JSON.parse(source)
    const output: string[] = []
    const kindOutput: Map<string, string[]> = new Map()
    for (let [key, value] of Object.entries(kindContext)) {
        for (let string of value) {
            kindOutput.set(string, [])
        }
    }
    for (let doc of documentation) {
        if (doc.section === 'Constants') {
            let index = 0
            output.push(`export enum Constants {`)
            for (let data of doc.data) {
                const currentKindContext = kindContext[index] as string[]
                const regex = new RegExp(currentKindContext.map(x => `(${x})`).join('|'), 'gm')
                output.push(`    // ${index} ${data.section}`)
                for (let entry of data.entries) {
                    if (entry.type === 'variable') {
                        const groups = new RegExp(regex, 'gm').exec(entry.name)
                        if (groups) {
                            const targetIndex = groups.map(items => !!items).indexOf(true, 1) - 1
                            kindOutput.get(currentKindContext[targetIndex])?.push(entry.name)
                        }
                        output.push(`${`    ${entry.name},`.padEnd(42, ' ')} // ${entry.description}`)
                    }
                }
                ++index
                output.push(``)
            }
            console.log(doc)
            output.push(`}`)
        }
    }
    for (let [key, value] of kindOutput) {
        output.push(`export type ${key}_KIND =`)
        for (let string of value) {
            output.push(`    | Constants.${string}`)
        }
        output.push(``)
    }
    console.log(kindOutput)
    fs.writeFileSync('out/constants.ts', output.join('\n'))
}