import {Argument, Command, Option} from "commander";
import {createBackendInterface} from "./utility/create-backend-interface.js";
import chalk from "chalk";
import fs from "fs";
import {createStringBuilder} from "./compiler/utility/string-builder.js";
import {testRunner} from "./test-runner.js";
import {SourceFileContainer} from "./compiler/components/nodes/meta/source-file-container.js";
import {ExpressionContainer, NodeKind} from "./compiler/components/container-types.js";
import {entries} from "./compiler/table/table-builder.js";

fs;


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

function generateSymbolTable(config: ProjectConfiguration) {
    throw new Error("Not implemented.")
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
    program.command('table')
        .description('Symbol Table')
        .addArgument(new Argument('config', 'path to Project config file'))
        .action(config => {
            generateSymbolTable(validateConfig(config))
        })
    program.command('test')
        .description('Run tests')
        .action(() => {
            testRunner()
        })
    program.parse()
}

cli()