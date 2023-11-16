import fs from "fs";
import prettier from "prettier";

export interface CppToLuaClass {
    name: string
    functions: CppToLuaFunction[]
}

export interface CppToLuaParameter {
    name: string
    type: string
    isOptional: boolean
}

export interface CppToLuaFunction {
    name: string
    parameter: CppToLuaParameter[]
    returnType: string
    usesSelf: boolean
}

export function createBackendInterface(path, convertIntTypes: boolean): {
    ts: () => string,
    json: () => string,
    lua: () => string,
    structure: CppToLuaClass[]
} {
    const table: {
        [base: string]: {}
    } = {}
    const doLater: VoidFunction[] = []
    for (let file of fs.readdirSync(path)) {
        if (file.startsWith('lib') && file.endsWith('.cpp')) {
            const source = fs.readFileSync(path + '/' + file).toString('utf-8')
            const base = /LUA_MODULE (\w+)/gm.exec(source)
            if (base) {
                const baseName = base[1]
                const functions: {
                    [functionName: string]: {}
                } = {}
                doLater.push(() => {
                    for (let match of source.matchAll(/LUA_FUNCTION\((\w+)\) {(([^\n]*\n)*?)^}/gm)) {
                        const functionName = match[1]
                        const functionBody = match[2]
                        let properties: {
                            [key: string]: any
                        } = {}
                        let parameter: {
                            [key: string]: any
                        }[] = []
                        for (let line of functionBody.split(/\n/gm).map(line => line.trim()).filter(line => line.length > 0)) {
                            const lua_get = /lua_get<([^>]+)>\(L(, \d+)?\)/gm.exec(line)
                            const parameterCount = /\(L, (\d+)\)/gm.exec(line)
                            if (line.startsWith('check_param_count')) {
                                properties['parametercount'] = parseInt(parameterCount![1])
                            } else if (lua_get) {
                                let type = lua_get[1].split(',')[0].trim()
                                let variableName: string | undefined
                                let parameterIndex
                                if (lua_get[2]) {
                                    parameterIndex = parseInt(lua_get[2].match(/\d+/gm)![0])
                                    if (type.endsWith('*')) {
                                        type = type.slice(0, -1)
                                        type = type.slice(0, 1).toUpperCase() + type.slice(1)
                                    }
                                    if (line.includes('=')) {
                                        const [left, right] = line.split('=').map(item => item.trim())
                                        try {
                                            variableName = left.match(/\w+$/gm)![0]
                                        } catch (e) {
                                        }
                                    }
                                    if (!variableName) {
                                        variableName = '_' + parameterIndex
                                    }
                                    parameter[parameterIndex - 1] = {
                                        name: variableName,
                                        type: type
                                    }
                                }
                            }
                        }
                        properties['parameter'] = parameter
                        functions[functionName] = properties
                    }
                })
                table[baseName] = functions
            }
        }
    }
    for (let voidFunction of doLater) {
        voidFunction()
    }
    // // @ts-ignore
    // console.log(util.inspect(table, {
    //     depth: null,
    //     colors: true,
    //     compact: true
    // }))
    const text: string[] = []
    
    const classes: CppToLuaClass[] = []
    for (let [interfaceName, properties] of Object.keys(table).map(key => [key, table[key]])) {
        text.push('export type ' + interfaceName + ' = {')
        const _class: CppToLuaClass = {
            name: interfaceName as string,
            functions: []
        }
        for (let [functionName, functionProperties] of Object.keys(properties).map(fkey => [fkey, properties[fkey]])) {
            const _function: CppToLuaFunction = {
                name: functionName,
                parameter: [],
                returnType: 'any',
                usesSelf: false
            }
            let parameterCount = functionProperties.parameterCount
            if (typeof parameterCount === 'undefined') {
                parameterCount = functionProperties.parameter.length
            }
            text.push(`    ${functionName}:(`)
            let index = 0
            let isFirstSelf = false
            for (let parameterElement of functionProperties.parameter) {
                isFirstSelf = index === 0 && parameterElement && parameterElement.type === interfaceName
                if (isFirstSelf) {
                    _function.usesSelf = true
                }
                const isOptional = index >= parameterCount
                if (parameterElement) {
                    let type = parameterElement.type
                    if (type === 'function') {
                        type = 'Function'
                    }
                    text.push(`${parameterElement.name}${isOptional ? '?' : ''}:${type}`)
                    _function.parameter.push({
                        name: parameterElement.name,
                        isOptional: isOptional,
                        type: convertIntTypes ? convertType(type) : type
                    })
                } else {
                    text.push(`_${index}${isOptional ? '?' : ''}:any`)
                    _function.parameter.push({
                        name: '_' + index,
                        isOptional: isOptional,
                        type: 'any'
                    })
                }
                text.push(',')
                ++index
            }
            _class.functions.push(_function)
            text.push(') => any')
        }
        text.push('}')
        classes.push(_class)
    }
    
    function convertType(type: string): string {
        if (type.includes('int')) {
            return 'number'
        } else if (type === 'bool') {
            return 'boolean'
        } else {
            return type
        }
    }
    
    const luaDoc: string[] = []
    luaDoc.push('---@meta')
    for (let cls of classes) {
        luaDoc.push(`---@class ${cls.name}`)
        luaDoc.push(`---@description ${cls.name}_description`)
        for (let f of cls.functions) {
            for (let i = 1; i < f.parameter.length; i++) {
                const parameter = f.parameter[i]
                luaDoc.push(`---@param ${parameter.name}${parameter.isOptional ? '?' : ''} ${parameter.type} Description`)
            }
            luaDoc.push('---@returns ' + f.returnType)
            luaDoc.push(`---@description Description of ${f.name}`)
            luaDoc.push(`function ${cls.name}.${f.name}(${f.parameter.map(x => x.name)}) end`)
            luaDoc.push('')
        }
    }
    return {
        json(): string {
            return prettier.format(JSON.stringify(classes), {parser: 'json'});
        },
        lua(): string {
            return luaDoc.join('\n');
        },
        ts(): string {
            return prettier.format(text.join('\n'), {parser: 'babel-ts'});
        },
        structure: classes
    }
}