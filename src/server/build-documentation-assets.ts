import * as https from "https";
import {Dom, parseFromString} from 'dom-parser';
import fs from "fs";

export type SectionFunctionEntryParameter = {
    text: string
    name: string
    type: string[]
    defaultValue?: string
    isVararg: boolean
}
export type SectionFunctionEntry = {
    id: number
    description: string
    type: 'function'
    name: string
    parameter: SectionFunctionEntryParameter[]
    returnType: string[]
}
export type SectionVariableEntry = {
    id: number
    description: string
    type: 'variable'
    name: string
    value: string
}
export type SectionEntry = SectionVariableEntry | SectionFunctionEntry
export type Section = {
    section: string
    entries: SectionEntry[]
}
export type Documentation = {
    path: string
    section: string
    data: Section[]
}

const paths = [
    ['Auxiliary', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Auxiliary-functions'],
    ['Card', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Card.-methods'],
    ['Constants', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Constants'],
    ['Duel', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Duel.-methods'],
    ['Effect', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Effect.-methods'],
    ['Group', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-Group.-methods'],
    ['Other', 'https://github.com/ProjectIgnis/CardScripts/wiki/Scripting-Library:-other-functions']
]

function loadDocumentationFromWiki() {
    let evalStopCounter = 0
    const resultData: {
        path: string,
        section: string,
        data: [string, string[][]][]
    }[] = []
    for (let i = 0; i < paths.length; i++) {
        https.get(paths[i][1], response => {
            let chunks
            response.setEncoding('utf-8')
            response.on('data', chunk => {
                chunks += chunk
            })
            response.on('end', () => {
                try {
                    if (response.statusCode === 200) {
                        const document = parseFromString((chunks + ''))
                        resultData.push({
                            data: crawl(document, paths[i][0]),
                            path: paths[i][1],
                            section: paths[i][0]
                        })
                        evalStop()
                    }
                } catch (e) {
                    console.log(e)
                }
            })
        })
    }
    
    function evalStop() {
        ++evalStopCounter
        console.log(evalStopCounter)
        if (evalStopCounter >= paths.length) {
            fs.writeFileSync('out/documentation.json', JSON.stringify(resultData))
            console.log('done')
        }
    }
    
    function crawl(document: Dom, defaultSection: string): [string, string[][]][] {
        let sections: [string, string[][]][] = [];
        let currentSectionName;
        let currentEntries: string[][] = [];
        for (let element of document.getElementsByClassName('markdown-body')) {
            for (let child of element.childNodes) {
                if (child.outerHTML.startsWith('<h')) {
                    if (currentSectionName) {
                        sections.push([currentSectionName.trim(), currentEntries])
                        currentEntries = []
                    }
                    currentSectionName = child.textContent
                } else {
                    for (let body of child.getElementsByTagName('tbody')) {
                        for (let tr of body.getElementsByTagName('tr')) {
                            const items: string[] = []
                            for (let node of tr.getElementsByTagName('td')) {
                                items.push(node.innerHTML)
                            }
                            currentEntries.push(items)
                        }
                    }
                }
            }
        }
        if (currentSectionName) {
            sections.push([currentSectionName.trim(), currentEntries])
        } else {
            sections.push([defaultSection, currentEntries])
        }
        return sections
    }
}

export function buildDocumentationFromWiki() {
    if (!fs.existsSync('out')) {
        fs.mkdirSync('out')
    }
    if (!fs.existsSync('out/documentation.json')) {
        loadDocumentationFromWiki()
    }
    const documentation: {
        path: string
        section: string
        data: [string, string[][]][]
    }[] = JSON.parse(fs.readFileSync('out/documentation.json').toString('utf-8'))
    let sectionEntryIndex = 0
    const parsedDocumentation: Documentation[] = []
    for (let element of documentation) {
        const document: Documentation = {
            path: element.path,
            section: element.section,
            data: [],
        }
        parsedDocumentation.push(document)
        for (let [sectionName, entries] of element.data) {
            const section: Section = {
                section: sectionName,
                entries: []
            }
            document.data.push(section)
            for (let [returnType, signature, description] of entries) {
                try {
                    const signatureName = /^(\w+\.?)+/gm.exec(signature)![0]
                    if (signature.includes('(')) {
                        const parameterEntries: SectionFunctionEntryParameter[] = []
                        const entry: SectionFunctionEntry = {
                            type: 'function',
                            id: sectionEntryIndex++,
                            name: signatureName,
                            parameter: parameterEntries,
                            returnType: returnType.split('|').map(x => x.trim()),
                            description: description,
                        }
                        section.entries.push(entry)
                        let parameterArea = signature.slice(signatureName.length).slice(1, -1)
                        if (parameterArea.trim().length !== 0) {
                            const optionalParameterArea = parameterArea.match(/\[[^\]]+]/gm)
                            if (optionalParameterArea) {
                                parameterArea = parameterArea.replace(/[\[\]]/gm, '')
                            }
                            for (let parameter of parameterArea.split(',').map(x => x.trim()).filter(x => !!x && x.length > 0)) {
                                let result: RegExpMatchArray | null
                                let defaultValue: string | undefined
                                let type: string[]
                                let isVararg: boolean
                                let name: string
                                if (parameter.includes('=')) {
                                    [parameter, defaultValue] = parameter.split('=').map(x => x.trim())
                                }
                                if (!!(result = /([\w|]+)\s+(\w+)?/gm.exec(parameter))) {
                                    if (result[1].includes('|')) {
                                        type = result[1].split('|').map(x => x.trim())
                                    } else {
                                        type = [result[1].trim()]
                                    }
                                    isVararg = false
                                    name = result[2].trim()
                                } else if (!!(result = /([\w|]+)?\s*\.\.(\.)?/gm.exec(parameter))) {
                                    if (result[1]) {
                                        if (result[1].includes('|')) {
                                            type = result[1].split('|').map(x => x.trim())
                                        } else {
                                            type = [result[1].trim()]
                                        }
                                    } else {
                                        type = ['any']
                                    }
                                    isVararg = true
                                    name = '$'
                                } else if (!!(result = /\w+/gm.exec(parameter))) {
                                    type = ['any']
                                    name = result[0].trim()
                                    console.log(name)
                                } else {
                                    // No clue what this is: Card.GetCardEffect(Card c,  [,  int effect_code]) Effect|nil, ...
                                }
                                type = type!.map(x => {
                                    if (x === 'nil') {
                                        return 'null'
                                    } else if (x === 'card') {
                                        return 'Card'
                                    } else if (x === 'int') {
                                        return 'number'
                                    } else if (x === 'bool') {
                                        return 'boolean'
                                    } else {
                                        return x
                                    }
                                })
                                parameterEntries.push({
                                    name: name!,
                                    text: `${isVararg! ? '...' : ''}${name!} : ${type!.length > 1 ? `(${type!.join(' | ')})[]` : isVararg! ? `${type![0]}[]` : type![0]}`,
                                    type: type!,
                                    isVararg: isVararg!,
                                    defaultValue: defaultValue
                                })
                            }
                        }
                    } else {
                        const entry: SectionVariableEntry = {
                            type: 'variable',
                            id: sectionEntryIndex++,
                            name: signatureName,
                            value: returnType,
                            description: description,
                        }
                        section.entries.push(entry)
                    }
                } catch (e) {
                    console.error(`couldn't parse ${signature}, ${e!.toString()}`)
                }
            }
        }
    }
    fs.writeFileSync('out/parsed-documentation.json', JSON.stringify(parsedDocumentation))
}