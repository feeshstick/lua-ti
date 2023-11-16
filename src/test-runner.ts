import {SourceFileContainer} from "./compiler/components/nodes/meta/source-file-container.js";
import {buildTable} from "./compiler/table/table-builder.js";
import {NodeKind} from "./compiler/components/container-types.js";
import fs from "fs";
import chalk from "chalk";

export function testRunner() {
    const dir = fs.readdirSync('test/cases')
    for (let i = 0; i < dir.length; i++) {
        let time = new Date().getTime()
        let file = dir[i];
        console.log(`Test: ${chalk.rgb(128, 188, 255)(`"${file}"`)}`)
        try {
            // proper Project class will be created later
            const sourceFile = SourceFileContainer.build({
                // declaration files and constants
                // constants, ignore CallStatements because Duel.load... hasn't been loaded yet
                declarations: [
                    {
                        files: [
                            'archetype_setcode_constants.lua',
                            'card_counter_constants.lua',
                            'constant.lua',
                        ],
                        dir: 'assets/CardScripts',
                        compilerOptions: { // <- customize compiler-options for each individual chunk
                            fileFlag: 'constants',
                            strict: false,
                            parserOptions: {
                                ignore: [
                                    NodeKind.CallStatement
                                ]
                            }
                        }
                    },
                    // \w+\.d\.lua files, Just the signature of functions defined at front or back end with type annotations,
                    // Important for symbol-table: allows to resolve Duel\.\w+ ... If a name of a function has mistakes, it'll throw an error.
                    // "             type-checker: checks proper type usage e.g.: f(i:number); f("test") will throw error
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
                    files: [
                        file
                    ],
                    compilerOptions: {
                        fileFlag: 'none',
                        strict: true
                    }
                }
            })
            console.log(`>\t${chalk.rgb(255, 255, 128)(`${new Date().getTime() - time}ms`)}\tsetup`)
            time = new Date().getTime()
            buildTable(sourceFile)
            console.log(`>\t${chalk.rgb(255, 255, 128)(`${new Date().getTime() - time}ms`)}\ttable`)
            console.log(`>\t${chalk.rgb(128, 255, 128)('no error found')}`)
        } catch (e) {
            console.log(`>\t${chalk.rgb(255, 128, 128)('error')}`)
            // @ts-ignore
            console.error(e.message)
        }
    }
}