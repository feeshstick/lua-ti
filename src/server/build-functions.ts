import fs from "fs";
import {Documentation, SectionFunctionEntry, SectionFunctionEntryParameter} from "./build-documentation-assets.js";
import prettier from "prettier";
import {Token} from "../compiler/table/symbol-table.js";

interface FunctionSignature {
    name: string
    category: string
}

export function buildFunctions() {
    const source = fs.readFileSync('out/parsed-documentation.json').toString('utf-8')
    const documentation: Documentation[] = JSON.parse(source)
    const output = {
        variable: new Set<string>(),
        function: new Set<string>(),
    }
    const prefixMap: Map<string, Map<string, SectionFunctionEntry>> = new Map()
    const normalMap: Map<string, SectionFunctionEntry> = new Map()
    const factory = {
        context: {
            createToken: (partial: Partial<Token['properties']>) => {
                return factory.call(`$context.createToken`, [JSON.stringify(partial)])
            },
            createDefault: (types: string[], defaultValue: string) => {
                if (types.length === 1) {
                    const type = types[0]
                    if (type === 'boolean') {
                        if (defaultValue === 'false') {
                            return factory.createPrimitiveInstance(false)
                        } else if (defaultValue === 'true') {
                            return factory.createPrimitiveInstance(true)
                        }
                    } else if (type === 'number') {
                        if (defaultValue.match(/^\d+$/gm)) {
                            return factory.createPrimitiveInstance(parseInt(defaultValue))
                        } else if (defaultValue.match(/0x[A-Fa-f0-9]+/gm)) {
                            return factory.createPrimitiveInstance(parseInt(defaultValue, 16))
                        } else if (defaultValue.match(/[A-Z_]+/)) {
                            return `$context.lookup("${defaultValue}")`
                        } else {
                            return factory.createTypedInstance('number') + ` /* WARNING: "${defaultValue}" is not a known number notation */`
                        }
                    } else if (type === 'Card' || type === 'Group') {
                        return factory.context.createToken({
                            type: type,
                            instance: {}
                        }) + `/* WARNING: Assuming instance with properties: type="${type}" instance={}*/`
                    }
                    return `$context.createToken({}) /* WARNING: Dummy Method, cause I don't know how to handle this */`
                } else {
                    return `$context.createToken({}) /* WARNING: Dummy Method, cause I don't know how to handle this */`
                }
            },
            emitError: (message: string) => {
                return factory.call(`$context.emitError`, [`("${message.replaceAll('"', '\\"')}")`])
            },
            emitWarning: (message: string) => {
                return factory.call('$context.emitWarning', [`"${message.replaceAll('"', '\\"')}"`])
            },
            createVoid: () => {
                return factory.call(`$context.createVoid`, [])
            },
        },
        body: (data: string[], delimiter: string = '') => {
            return `{${data.join(delimiter + '\n')}}`
        },
        forLoop: (variable: string, condition: string, increment: string, body: string[]) => {
            return `for(${variable};${condition};${increment})${factory.body(body)}`
        },
        member: (name: string, value: string) => {
            return `${name}: ${value}`
        },
        function(parameter: string[], body: string) {
            return `(${parameter.join(',')}) => ${body}`
        },
        call(f: string, args: string[]) {
            return `(${f})(${args.join(',')})`
        },
        return(argument: string[]) {
            if (argument.length === 0) {
                return `return;\n`
            } else if (argument.length === 1) {
                return `return ${argument[0]};\n`
            } else {
                return `return [${argument.join(',')}];\n`
            }
        },
        if(condition: string, body: string[]): ElseIfBuilder {
            const statements: string[] = [
                `if (${condition}) ${factory.body(body)}`
            ]
            return {
                complete(): string {
                    return statements.join('\n');
                }, else(body: string[]): string {
                    statements.push(`else ${factory.body(body)}`)
                    return this.complete()
                }, elseIf(condition: string, body: string[]): ElseIfBuilder {
                    statements.push(`else if (${condition}) ${factory.body(body)}`)
                    return this;
                }
            }
        },
        error(message: string) {
            return `throw new Error(${message});`;
        },
        constStatement: (name: string, value: string, exports: boolean = false) => {
            return `${exports ? 'export ' : ''}const ${name} = ${value};`
        },
        letStatement(name: string, value: string) {
            return `${factory.let(name, value)};`
        },
        assignStatement(name: string, value: string) {
            return `${factory.assign(name, value)};`
        },
        let(name: string, value: string) {
            return `let ${name} = ${value}`
        },
        assign(name: string, value: string) {
            return `${name} = ${value}`
        },
        createPrimitiveInstance(object: any) {
            return factory.context.createToken({instance: object});
        },
        createTypedInstance(type: string) {
            return factory.context.createToken({type: type});
        }
    }
    type ElseIfBuilder = {
        elseIf(condition: string, body: string[]): ElseIfBuilder
        else(body: string[]): string
        complete(): string
    }
    for (let doc of documentation) {
        for (let data of doc.data) {
            for (let entry of data.entries) {
                switch (entry.type) {
                    case "variable":
                        output.variable.add(entry.value)
                        break;
                    case "function":
                        const split = entry.name.split('.')
                        if (split.length === 2) {
                            if (!prefixMap.has(split[0])) {
                                prefixMap.set(split[0], new Map())
                            }
                            const target = prefixMap.get(split[0])!
                            target.set(split[1], entry)
                        } else {
                            normalMap.set(entry.name, entry)
                        }
                        break;
                }
            }
        }
    }
    
    function createExistenceCheck(index: number, parameter: SectionFunctionEntryParameter) {
        const isVararg = parameter.isVararg
        if (isVararg) {
            return [
                factory.constStatement('$args', `$.slice(${index})`),
                factory.constStatement('$length', `$args.length`)
            ].join('\n')
        } else {
            return [
                factory.letStatement('_' + parameter.name, `$[${index}]`),
                factory.if(`typeof _${parameter.name} === 'undefined' \n|| (typeof _${parameter.name}.properties.instance === 'object' && !_${parameter.name}.properties.instance)`, [
                    parameter.defaultValue
                        ? factory.assignStatement('_' + parameter.name, factory.context.createDefault(parameter.type, parameter.defaultValue))
                        + `/* Set Default = ${parameter.defaultValue} */`
                        : factory.context.emitError(parameter.name + ' is missing')
                ]).complete()
            ].join('\n')
        }
    }
    
    function createReturn(entry: SectionFunctionEntry): string[] {
        const lines: string[] = []
        const returnType = entry.returnType.join('|')
            .replaceAll('/', '|')
            .replaceAll('flag', '')
            .replaceAll('int', 'number')
            .replaceAll('bool', 'boolean')
            .replaceAll('effect', 'Effect')
            .replaceAll('group', 'Group')
            .replaceAll('nil', 'null')
            .replaceAll(' ', '')
        if (returnType.includes('|') || returnType.includes(',')) {
            lines.push(`/* WARNING: @${entry.name} return type "${returnType}" needs custom implementation,\ntype might be based on parameter,\n"|" or "," needs additional context */`)
            lines.push(factory.context.emitWarning(`return type "${returnType}" not implemented`))
        } else if (returnType === 'function') {
            lines.push(`/* WARNING: @${entry.name} return type "${returnType}" needs custom implementation,\ntype might be based on parameter,\nfunction type is too vague to infer further */`)
            lines.push(factory.context.emitWarning(`return type "${returnType}" not implemented`))
        } else {
            switch (returnType) {
                case 'string':
                    returnPrimitiveInstance('')
                    break
                case 'number':
                    returnPrimitiveInstance(0)
                    break
                case 'boolean':
                    returnPrimitiveInstance(true)
                    break
                case 'null':
                    returnPrimitiveInstance(null)
                    break
                case 'void':
                    lines.push(factory.return([factory.context.createVoid()]))
                    break
                case 'Card':
                case 'Group':
                case 'Effect':
                    returnInstance(returnType)
                    break
            }
            
            function returnPrimitiveInstance(object: any) {
                lines.push(factory.return([factory.createPrimitiveInstance(object)]))
            }
            
            function returnInstance(type: string) {
                if (entry.name.startsWith(type) && entry.parameter.length > 0) {
                    lines.push(`/* WARNING: @${entry.name} Property Change not implemented*/`)
                    lines.push(`/* WARNING: @${entry.name} Assuming first Argument is argument getting returned*/`)
                    lines.push(factory.return(['_' + entry.parameter[0].name]))
                } else {
                    lines.push(`/* WARNING: @${entry.name} Assuming instance with properties: type="${type}" instance={}*/`)
                    lines.push(factory.return([factory.context.createToken({type: type, instance: {}})]))
                }
            }
        }
        return lines
    }
    
    function createTypeCheck(name: string, isVararg: boolean, types: string[]) {
        if (isVararg) {
            return factory.forLoop(factory.let('$i', '0'), `$i < $length`, `$i++`, [
                factory.constStatement('$value', '$args[$i]'),
                createTypeCheck('$value', false, types)
            ])
        } else {
            if (types.length === 1) {
                let type = types[0]
                const warnings: string[] = []
                let test: string
                if (type === 'effect' || type === 'card' || type === 'group') {
                    const newType = type.slice(0, 1).toUpperCase() + type.slice(1)
                    warnings.push(`WARNING: '${type}' replaced with '${newType}'`)
                    type = newType
                }
                if (type === 'Card' || type === 'Effect' || type === 'Group') {
                    test = `_${name}.properties.type !== '${type}'`
                } else if (type === 'number' || type === 'string' || type === 'boolean' || type === 'null' || type === 'function') {
                    if (type === 'null') {
                        test = `(!_${name} && typeof _${name} !== 'object')`
                    } else {
                        if (type === 'function') {
                            warnings.push(`WARNING: type 'function' is to vague to infer.`)
                        }
                        test = `typeof _${name}.properties.instance !== '${type}'`
                    }
                }
                if (test!) {
                    return [
                        warnings.map(x => `/* ${x} */`).join('\n'),
                        factory.if(test, [
                            factory.context.emitError(`argument type mismatch type of '${name}' is not ${type}`)
                        ]).complete(),
                        factory.if(`!_${name}.properties.typeByUsage`, [
                            factory.assign(`_${name}.properties.typeByUsage`, `new Set(["${type}"])`)
                        ]).else([
                            `_${name}.properties.typeByUsage.add("${type}")`
                        ])
                    ]
                }
            }
            return `/* WARNING: Unknown type ${types.join(',')}, cannot check type */`
        }
    }
    
    function createFunction(entry: SectionFunctionEntry) {
        const hasVarargs = entry.parameter.map(x => x.isVararg).reduce((p, c) => p || c, false)
        return factory.function([
            '$context: Context'
        ], factory.function([
            `...$:Token[]`
        ], factory.body([
            ...[hasVarargs ? undefined : factory.if(`$.length > ${entry.parameter.length}`, [
                factory.context.emitWarning("too many arguments")
            ]).complete()].filter(x => !!x) as string[],
            ...entry.parameter.map((parameter, i) => createExistenceCheck(i, parameter)),
            ...entry.parameter.flatMap(parameter => {
                return createTypeCheck(parameter.name, parameter.isVararg, parameter.type)
            }),
            ...createReturn(entry)
        ])))
    }
    
    const imports = `
export interface Context {
    emitError(message: string)
    
    emitWarning(message: string)
    lookup(name: string): Token
    
    createToken(properties: Partial<Token['properties']>):Token
    createDefault(properties: Partial<Token['properties']>):Token
    createVoid():Token
}
    `
    const environment = factory.constStatement('autoFunctions', factory.body([
        ...Array.from(prefixMap.entries()).map(([key, val]) => {
            return factory.member(key, factory.body([
                ...Array.from(val.entries()).map(([functionName, entry]) => {
                    return factory.member(functionName, createFunction(entry))
                })
            ], ','))
        }),
        ...Array.from(normalMap).map(([key, val]) => {
            return factory.member(key, createFunction(val))
        })
    ], ','), true)
    fs.writeFileSync('out/functions.ts', imports + prettier.format(environment, {
        parser: 'babel',
        semi: false,
        singleQuote: true
    }))
}