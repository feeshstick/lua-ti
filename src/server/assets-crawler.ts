import fs from "fs";
import luaparse from "luaparse";
import {Chunk, Identifier, MemberExpression} from "luaparse/lib/ast.js";
import * as util from "util";

export namespace Server {
    
    type DirectoryMap = {
        [key: string]: DirectoryMap | {
            path: string
            declarations: DeclarationMap
        }
    }
    
    enum DeclarationKind {
        Function,
        Variable,
        Parameter,
    }
    
    interface AbstractDeclaration<E extends DeclarationKind> {
        kind: E
        id: number
    }
    
    interface VariableDeclaration extends AbstractDeclaration<DeclarationKind.Variable> {
        path: string
        name: string
    }
    
    interface FunctionDeclaration extends AbstractDeclaration<DeclarationKind.Function> {
        path: string
        parameter: ParameterDeclaration[]
    }
    
    interface ParameterDeclaration extends AbstractDeclaration<DeclarationKind.Parameter> {
        name: string
    }
    
    type Declaration = VariableDeclaration | FunctionDeclaration
    
    type DeclarationMap = {
        [key: string]: DeclarationMap | Declaration
    }
    
    export function buildAssets() {
        let declarationCounter = 0
        const reduction: DeclarationMap = {}
        const path = 'assets/CardScripts'
        const subFolderMap = new Map<string, {
            path: string,
            files: string[]
        }>()
        const subFolderScriptByDirectory = new Map<string, string[]>()
        const obj: DirectoryMap = crawl(path)
        subFolderReduction()
        
        fs.writeFileSync('out/directory-map.json', JSON.stringify(obj))
        fs.writeFileSync('out/sub-folder-directories.json', JSON.stringify(Array.from(subFolderMap.entries())))
        fs.writeFileSync('out/script-by-directory.json', JSON.stringify(Array.from(subFolderScriptByDirectory.entries())))
        
        function subFolderReduction() {
            for (let [name, data] of subFolderMap) {
                for (let file of data.files) {
                    if (!subFolderScriptByDirectory.has(file)) {
                        subFolderScriptByDirectory.set(file, [name])
                    } else {
                        subFolderScriptByDirectory.get(file)!.push(name)
                    }
                }
            }
        }
        
        console.log(util.inspect(reduction, {
            depth: null,
            compact: true,
            colors: true
        }))
        
        function crawl(path): DirectoryMap {
            const map: DirectoryMap = {}
            for (let file of fs.readdirSync(path)) {
                if (fs.lstatSync(path + '/' + file).isFile()) {
                    if (file.endsWith('.lua')) {
                        map[file.slice(0, -4)] = {
                            path: path + '/' + file,
                            declarations: extractDeclarations(path + '/' + file)
                        }
                    }
                } else {
                    if (!file.startsWith('.')) {
                        // map[file] = crawl(path + '/' + file)
                        subFolderMap.set(file, {
                            path: path + '/' + file,
                            files: fs.readdirSync(path + '/' + file)
                        })
                    }
                }
            }
            return map
        }
        
        function extractDeclarations(path: string): DeclarationMap {
            const map: DeclarationMap = {}
            const source = fs.readFileSync(path).toString('utf-8')
            const ast: Chunk = luaparse.parse(source, {
                locations: true,
                luaVersion: '5.3',
                ranges: true,
                comments: true,
                scope: true
            })
            for (let bodyElement of ast.body) {
                if (bodyElement.type === 'FunctionDeclaration' && bodyElement.identifier) {
                    const [name, functionDeclaration] = unwindMemberExpression(bodyElement.identifier, map, path, 0)
                    functionDeclaration.kind = DeclarationKind.Function
                    if (typeof functionDeclaration.id === 'undefined') {
                        functionDeclaration.id = declarationCounter++
                    }
                    functionDeclaration.path = path
                    functionDeclaration.parameter = bodyElement.parameters.map(x => {
                        switch (x.type) {
                            case "Identifier":
                                return x.name
                            case "VarargLiteral":
                                return '...'
                        }
                    }).map(x => ({
                        kind: DeclarationKind.Parameter,
                        name: x,
                        id: declarationCounter++
                    }))
                    propagateFunctionDeclaration(reduction, name.reverse(), functionDeclaration)
                }
            }
            return map
        }
        
        function propagateFunctionDeclaration(reduction: DeclarationMap, names: string[], declaration: FunctionDeclaration) {
            if (names.length === 1) {
                reduction[names[0]] = declaration
            } else {
                if (!reduction[names[0]]) {
                    reduction[names[0]] = {}
                }
                propagateFunctionDeclaration(reduction[names[0]] as DeclarationMap, names.slice(1), declaration)
            }
        }
        
        function unwindMemberExpression(expression: MemberExpression | Identifier, map: DeclarationMap, path: string, depth: number = 0): [string[], FunctionDeclaration] {
            switch (expression.type) {
                case "Identifier":
                    map[expression.name] = {}
                    return [[expression.name], map[expression.name] as FunctionDeclaration]
                case "MemberExpression": {
                    const target = unwindMemberExpression(expression.base as MemberExpression, map, path, depth + 1)
                    if (depth) {
                        return [[expression.identifier.name, ...target[0]], target[1]]
                    } else {
                        target[1][expression.identifier.name] = {
                            kind: DeclarationKind.Function,
                            id: declarationCounter++,
                        }
                        return [[expression.identifier.name, ...target[0]], target[1][expression.identifier.name]]
                    }
                }
            }
        }
    }
}