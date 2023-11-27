import fs from "fs";
import luaparse, {Node} from "luaparse";
import {Chunk} from "luaparse/lib/ast.js";

export const DEFAULT_LUA_PARSE_OPTIONS: Partial<luaparse.Options> = {
    locations: true,
    scope: true,
    comments: true,
    luaVersion: '5.3',
    ranges: true
}

export type Tree<E> = Map<string, Tree<E>> | E
export type DeclarationType = 'variable' | 'function'
export type Range = [number, number]
export type CardID = number
export type DeclarationID = number
export type CardDirectory =
    | 'official'
    | 'unofficial'
export type AbstractDeclaration<E extends DeclarationType> = {
    type: E
    id: DeclarationID
    location: {
        [A in CardDirectory]: [CardID, Range[]][]
    }
}

export interface VariableDeclaration extends AbstractDeclaration<'variable'> {
    name: string
    path: string
    file: string
    isLocal: boolean
    nameList: string[]
}

export interface FunctionDeclaration extends AbstractDeclaration<'function'> {
    name: string
    nameList: string[]
    path: string
    file: string
    parameter: {
        name: string
    }[]
    isLocal: boolean
}

export type Declaration = VariableDeclaration | FunctionDeclaration
export type AssetMap = Tree<Asset>

export type Asset = {
    type: 'asset',
    path: string
    name: string
    declarations: Tree<Declaration>
}

export function buildAssets() {
    let idCounter = 0
    const assetMap: AssetMap = new Map()
    const listOfAllDeclarations: Declaration[] = []
    buildDeclarationAssets()
    fs.writeFileSync('out/asset-map.json', JSON.stringify(assetMap, replacer))
    fs.writeFileSync('out/declaration-list.json', JSON.stringify(listOfAllDeclarations, replacer))
    
    function buildDeclarationAssets() {
        const unofficialProc = fs.readdirSync('assets/CardScripts/unofficial')
            .filter(x => !x.startsWith('c'))
            .map(x => [x, 'assets/CardScripts/unofficial/' + x])
        const libraryProc = fs.readdirSync('assets/CardScripts')
            .map(x => [x, 'assets/CardScripts/' + x])
        for (let [file, path] of [
            ...libraryProc,
            ...unofficialProc
        ]) {
            if (fs.lstatSync(path).isFile() && file.endsWith('.lua')) {
                const assets: Asset = {
                    type: "asset",
                    name: file,
                    path: path,
                    declarations: new Map()
                }
                console.log('current_file ' + file)
                const source = fs.readFileSync(path).toString('utf-8')
                const ast: Chunk = luaparse.parse(source, {
                    locations: true,
                    scope: true,
                    comments: true,
                    luaVersion: '5.3',
                    ranges: true
                })
                for (let statement of ast.body) {
                    if (statement.type === 'FunctionDeclaration' && statement.identifier) {
                        const range = getRange(statement.identifier)
                        const name = source.slice(range[0], range[1])
                        const nameList = name.split('.')
                        const _entry: FunctionDeclaration = {
                            type: 'function',
                            path: path,
                            file: file,
                            isLocal: statement.isLocal,
                            name: name,
                            nameList: nameList,
                            id: idCounter++,
                            parameter: statement.parameters.map(x => ({
                                name: x.type === 'Identifier' ? x.name : '...'
                            })),
                            location: {
                                'official': [],
                                'unofficial': [],
                            }
                        }
                        enter(nameList, _entry, assets.declarations)
                        listOfAllDeclarations.push(_entry)
                    } else if (statement.type === 'AssignmentStatement' || statement.type === 'LocalStatement') {
                        for (let variable of statement.variables) {
                            const range = getRange(variable)
                            const name = source.slice(range[0], range[1])
                            const nameList = name.split('.')
                            const _entry: VariableDeclaration = {
                                type: 'variable',
                                path: path,
                                file: file,
                                name: name,
                                nameList: nameList,
                                id: idCounter++,
                                isLocal: statement.type === 'LocalStatement',
                                location: {
                                    'official': [],
                                    'unofficial': [],
                                }
                            }
                            enter(nameList, _entry, assets.declarations)
                            listOfAllDeclarations.push(_entry)
                        }
                    }
                }
                (assetMap as Map<any, any>).set(file, assets)
            }
        }
    }
    
    function getRange(node: Node): [number, number] {
        //@ts-ignore
        return node.range
    }
    
    function enter(name: string[], declaration: Declaration, assets: Tree<Declaration>) {
        if (name.length > 0) {
            const currentName = name.shift()!
            if (assets instanceof Map) {
                if (!assets.has(currentName)) {
                    if (name.length === 0) {
                        assets.set(currentName, declaration)
                    } else {
                        const map = new Map()
                        enter(name, declaration, map)
                        assets.set(currentName, map)
                    }
                } else {
                    const map = assets.get(currentName)
                    if (map && map instanceof Map) {
                        enter(name, declaration, map)
                    }
                }
            }
        }
    }
}

function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        }
    } else {
        return value;
    }
}