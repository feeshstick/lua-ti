import {Argument, Command, Option} from "commander";
import {createBackendInterface} from "./utility/create-backend-interface.js";
import chalk from "chalk";
import fs from "fs";
import {createStringBuilder} from "./compiler/utility/string-builder.js";
import {testRunner} from "./test-runner.js";
import {ProjectFile, SourceFileContainer} from "./compiler/components/nodes/meta/source-file-container.js";
import {ExpressionContainer, NodeKind} from "./compiler/components/container-types.js";
import {buildTable, entries} from "./compiler/table/table-builder.js";
import * as util from "util";
import {Call, FunctionDeclaration, SymbolTable, Symbol} from "./compiler/table/symbol-table.js";
import {typeToString} from "./compiler/error/lua-ti-error.js";
import {Type, TypeKind} from "./compiler/type/type.js";
import {experiment} from "./experiment.js";
import {typeChecker} from "./compiler/type/type-checker.js";

fs;

const defaultProjectFile: ProjectFile = {
    declarations: [
        {
            files: [
                'archetype_setcode_constants.lua',
                'card_counter_constants.lua',
                'constant.lua',
            ],
            dir: 'assets/CardScripts',
            compilerOptions: {
                fileFlag: 'constants',
                strict: false,
                parserOptions: {
                    ignore: [
                        NodeKind.CallStatement
                    ]
                }
            }
        },
        {
            files: [
                'card.d.lua',
                'debug.d.lua',
                'duel.d.lua',
                'effect.d.lua',
                'group.d.lua',
                'type.d.lua',
            ],
            dir: 'declaration-assets',
            compilerOptions: {
                fileFlag: 'declarations',
                strict: false
            }
        }
    ],
    sourceFiles: {
        dir: 'test/cases',
        files: [],
        compilerOptions: {
            fileFlag: 'none',
            strict: true
        }
    }
}

function sanitize(name: string) {
    if (name === 'repeat') {
        return '_repeat'
    } else {
        return name
    }
}

function generateBackEndInterface(path: string, output: string, format: string, option: { NoInt?: boolean }) {
    const source = createBackendInterface(path, !!option.NoInt).structure
    // const source = createBackendInterface(path, !!option.NoInt)[format]()
    console.log(source)
    const files: [string, string][] = []
    for (let cppToLuaClass of source) {
        const file: string[] = []
        const fileName = cppToLuaClass.name.toLowerCase()
        const className = cppToLuaClass.name
        const out = createStringBuilder()
        out.println('---@meta')
        out.println('')
        out.println(`---@class ${className}`)
        out.println(`${className} = {}`)
        for (let _function of cppToLuaClass.functions) {
            out.println('')
            out.println(`---$function ${_function.name}`)
            out.println(`---@description ${_function.name}`)
            out.println(`---@see ${_function.name}`)
            for (let cppToLuaParameter of _function.parameter) {
                out.println(`---@param ${cppToLuaParameter.name} ${cppToLuaParameter.type} ${cppToLuaParameter.isOptional ? '| nil' : ''}`)
            }
            out.println(`---@return ${_function.returnType}`)
            out.println(`function ${className}.${sanitize(_function.name)}(${_function.parameter.map(parameter => parameter.name)}) end`)
        }
        files.push([fileName + '.d.lua', out.text])
    }
    
    for (let [name, text] of files) {
        fs.writeFileSync(output + '/' + name, text)
    }
}

function generateFrontEndInterface(format: string) {
    throw new Error("Not implemented.")
}

function validateConfig(configPath: string): ProjectConfiguration {
    throw new Error("Not implemented.")
}

interface ProjectConfiguration {
}

function generateAbstractSyntaxTree(config: ProjectConfiguration) {
    throw new Error("Not implemented.")
}

function generateSymbolTable(out) {
    const project: ProjectFile = {...defaultProjectFile}
    project.sourceFiles.files.push('argument-type-mismatch-1.lua')
    const sourceFile = SourceFileContainer.build(project)
    let _table: SymbolTable | undefined
    for (let chunk of sourceFile.chunks) {
        if (chunk.compilerOptions.fileFlag === 'none') {
            _table = chunk.block.getLocalTable()
        }
    }
    buildTable(sourceFile)
    typeChecker(sourceFile)
    type ReducedNode = {
        meta: { [key: string]: any },
        member: { [key: string]: any }
        parameter?: { [key: string]: any }
        semi?: { [key: string]: any }
        constant?: { [key: string]: any }
    }
    const map: Map<number, ReducedNode> = new Map()
    const symbolTable: Map<string, SymbolTable> = new Map()
    const table = reduceSymbolTable(_table!)
    
    fs.writeFileSync(out, 'const symbols = ' + util.inspect(table, {
        compact: true,
        depth: null,
        colors: false
    }))
    
    function reduceSymbolTable(table: SymbolTable) {
        if (symbolTable.has(table.name!)) {
            return table.name!
        } else {
            const obj: ReducedNode = {
                meta: {},
                member: {}
            }
            for (let [kind, name, entry] of table.kindEntries()) {
                if (!obj[kind]) {
                    obj[kind] = {}
                }
                obj[kind]![name] = reduceVariable(entry)
            }
            return obj
        }
    }
    
    function reduceCalls(calls: Array<Call> | undefined) {
        if (calls) {
            return calls.map(x => {
                return {
                    returns: reduceVariable(x.returns),
                    arguments: x.arguments.map(arg => {
                        return reduceVariable(arg.symbol)
                    })
                }
            })
        } else {
            return []
        }
    }
    
    function reduceFunctionDeclaration(functionDeclaration: FunctionDeclaration) {
        return {
            returns: functionDeclaration.returns.map(x => {
                return x.arguments.map(y => {
                    return reduceVariable(y)
                })
            }),
            parameter: functionDeclaration.parameter.map(param => {
                return reduceVariable(param.symbol)
            })
        }
    }
    
    function reduceType(type: Type | undefined) {
        if (type) {
            switch (type.kind) {
                case TypeKind.Any:
                    return 'any'
                case TypeKind.Vararg:
                    return 'vararg'
                case TypeKind.Null:
                    return 'null'
                case TypeKind.Number:
                    return 'number'
                case TypeKind.Boolean:
                    return 'number'
                case TypeKind.String:
                    return 'string'
                case TypeKind.NumberLiteral:
                    return type.value
                case TypeKind.StringLiteral:
                    return type.value
                case TypeKind.BooleanLiteral:
                    return type.value
                case TypeKind.Name:
                    return type.name
                case TypeKind.List:
                    return {
                        kind: 'list',
                        list: type.list.map(x => reduceType(x))
                    }
                case TypeKind.Union:
                    return {
                        kind: 'union',
                        list: type.list.map(x => reduceType(x))
                    }
                case TypeKind.Array:
                    return {
                        kind: 'array',
                        type: reduceType(type.baseType)
                    }
                case TypeKind.Function:
                    return {
                        kind: 'function',
                        parameter: type.parameter.map(x => reduceType(x)),
                        returns: reduceType(type.returns)
                    }
                case TypeKind.Class:
                    return {
                        kind: 'class',
                        member: entries(type.member).reduce((p, [key, val]) => {
                            p[key] = reduceType(val)
                            return p
                        }, {})
                    }
                case TypeKind.Parameter:
                    return {
                        kind: 'parameter',
                        type: reduceType(type.type),
                        name: type.name,
                        isOptional: type.isOptional
                    }
                case TypeKind.Conditional:
                    break;
                case TypeKind.ClassMember:
                    return reduceType(type.type)
            }
        } else {
            return undefined
        }
    }
    
    function reduceVariable(value: Symbol) {
        if (map.has(value.id)) {
            return map.get(value.id)
        } else {
            const obj: ReducedNode = {
                meta: {
                    id: value.id,
                    typeAsString: typeToString(value.type),
                    type: reduceType(value.type)
                },
                member: {}
            }
            if (value.calls) {
                obj.meta['calls'] = reduceCalls(value.calls)
            }
            if (value.functionDeclaration) {
                obj.meta['functionDeclaration'] = reduceFunctionDeclaration(value.functionDeclaration)
            }
            map.set(value.id, obj)
            if (value.member) {
                for (let [key, _value] of entries(value.member)) {
                    obj.member[key] = reduceVariable(_value)
                }
            }
            return obj
        }
    }
}

function printConstants(corePath: string) {
    const sourceFiles = SourceFileContainer.from(corePath, ...[
        'archetype_setcode_constants.lua',
        'card_counter_constants.lua',
        'constant.lua',
    ])
    const map: Map<string, ExpressionContainer | number> = new Map()
    const toEval = `
    const table={}
    function set(name, value){
        table[name]=BigInt(value)
    }
    function get(name){
        return table[name]
    }
    ((lines)=>{
        for (var x of lines) {
            x()
        }
        return table
    })
    `;
    const names: string[] = []
    const _test: string[] = []
    sourceFiles.forEachDeep(node => {
        if (node.kind === NodeKind.AssignmentStatement) {
            const left = node.variables[0]
            names.push(left.text)
            const right = node.init[0].text
            if (!right.includes('{')) {
                const line = `() => {
                try{
                    set("${left.text}", ${
                    right
                        .replace(/\n/gm, '')
                        .replace(/\w+/gm, f => {
                            if (f.match(/[A-Z_]+/gm)) {
                                return `get("${f}")`
                            } else {
                                return `BigInt(${f})`
                            }
                        })
                })} catch(e){}}`;
                _test.push(line)
            }
        }
        return true
    });
    const nameWidth = names.map(x => x.length).reduce((p, c) => Math.max(p, c), 0)
    const obj: {
        [key: string]: BigInt
    } = eval(`${toEval}([${_test.join(',')}])`)
    const out = createStringBuilder()
    for (let [key, value] of entries(obj)) {
        out.println(key.toString().padEnd(nameWidth, ' '), value.toString(2).padStart(64, '0'))
    }
    console.log(out.text)
}

function listFunction(path: string, name: string) {
    const args: string[][] = []
    for (let string of fs.readdirSync(path)) {
        try {
            for (let string1 of fs.readdirSync(path + '/' + string)) {
                if (string1.endsWith('.lua')) {
                    console.log(string1)
                    const sourceFile: SourceFileContainer = SourceFileContainer.from(path + '/' + string, string1)
                    sourceFile.forEachDeep(node => {
                        if (node.kind === NodeKind.CallExpression) {
                            if (node.base.text.includes(name)) {
                                args.push(node.arguments.map(x => x.text))
                            }
                        }
                        return true
                    })
                }
            }
        } catch (e) {
        
        }
    }
    const map: Map<number, Set<string>> = new Map()
    for (let arg of args) {
        for (let i = 0; i < arg.length; i++) {
            let string = arg[i];
            if (!map.has(i)) {
                map.set(i, new Set())
            }
            map.get(i)!.add(string)
        }
    }
    console.log(util.inspect(map, {
        compact: true,
        colors: true,
        depth: null
    }))
}

export function cli() {
    const program = new Command()
    program
        .name('lua-ti')
        .description(`Custom lua compiler for ${chalk.bold(`"Project Ignis - EDOPro"`)}\n${chalk.blueBright(">++('>")}`)
        .version('0.0.1');
    program.command('compile')
        .description('compile based on project configuration')
        .addArgument(new Argument('config', 'path to Project config file'))
    program.command('backi')
        .description(`Generates back end interface of ${chalk.bold(`"Project Ignis - EDOPro"`)}`)
        .addArgument(new Argument('path', 'path to ygopro-core'))
        .addArgument(new Argument('out', 'output path'))
        .addArgument(new Argument('format', 'output format of interface')
            .choices(['lua', 'ts', 'json'])
            .default('ts')
            .argOptional())
        .addOption(new Option('-no-int', 'convert int to number types'))
        .action((path, output, format, option: { NoInt?: boolean }) => {
            generateBackEndInterface(path, output, format, option)
        })
    program.command('constant')
        .description('Prints all constant values')
        .addArgument(new Argument('path', 'path to ygopro-core'))
        .action((corePath) => {
            printConstants(corePath)
        })
    program.command('fronti')
        .description(`Generates front end interface of ${chalk.bold(`"Project Ignis - EDOPro"`)}`)
        .addArgument(new Argument('format', 'Output format of interface')
            .choices(['lua', 'ts', 'json'])
            .default('ts'))
        .action((format => {
            generateFrontEndInterface(format)
        }))
    program.command('absyn')
        .description('Abstract Syntax Tree')
        .addArgument(new Argument('config', 'path to Project config file'))
        .action(config => {
            generateAbstractSyntaxTree(validateConfig(config))
        })
    program.command('symbols')
        .description('Symbol Table')
        .addArgument(new Argument('out', 'output'))
        .action(out => {
            generateSymbolTable(out)
        })
    program.command('test')
        .description('Run tests')
        .action(() => {
            testRunner()
        })
    program.command('list')
        .description('Lists usage of a function')
        .addArgument(new Argument('path', 'path to ygopro-core'))
        .addArgument(new Argument('function', 'function name'))
        .action((path, name) => {
            listFunction(path, name)
        })
    program.command('experiment')
        .action(() => {
            experiment()
        })
    program.parse()
}

cli()