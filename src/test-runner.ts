import fs from "fs";
import {Program} from "./compiler/components/nodes/meta/program.js";
import {visitTableBuilder} from "./compiler/table/table-builder.js";
import {NodeKind} from "./compiler/components/container-types.js";
import {Injector} from "./compiler/table/injector/Injector.js";
import {_Symbol} from "./compiler/table/symbol-table.js";

export function runTest(): number {
    for (let file of fs.readdirSync('test/cases')) {
        console.log(file)
        const program = Program.build({
            compilerOptions: {
                parserOptions: {
                    ignore: []
                },
                noTableCall: true,
                noLabel: true,
                noStringCall: true
            },
            program: {
                constants: {
                    path: 'assets/CardScripts',
                    files: [
                        {file: 'constant.lua'},
                        {file: 'archetype_setcode_constants.lua'},
                        {file: 'card_counter_constants.lua'},
                    ],
                    compilerOptions: {
                        parserOptions: {
                            ignore: [NodeKind.CallExpression]
                        },
                        noTableCall: true,
                        noLabel: true,
                        noStringCall: true
                    },
                },
                declarations: {
                    path: 'declaration-assets',
                    files: [
                        {
                            file: 'card.d.lua'
                        },
                        {file: 'debug.d.lua'},
                        {file: 'duel.d.lua'},
                        {file: 'group.d.lua'},
                        {
                            file: 'effect.d.lua',
                            inject: Injector.create({
                                Effect: {
                                    // TODO nested doesn't work
                                    CreateEffect: (symbol, system) => {
                                        system.access(NodeKind.CallExpression, call => {
                                            console.log('create effect')
                                        })
                                    }
                                }
                            })
                        },
                        {
                            file: 'type.d.lua',
                            inject: Injector.create({
                                GetID: (symbol, system) => {
                                    system.access(NodeKind.CallExpression, call => {
                                        const symbol = new _Symbol(call)
                                        symbol.properties.onAssign = container => {
                                            // local s,id = GetID()
                                            if (container[0]) {
                                                // self_table
                                                // allowCustomMember default = false, prevent uncontrolled member creation
                                                // e.g.: Duel.SendToGrave
                                                container[0].symbol.properties.allowCustomMember = true
                                                container[0].symbol.properties.onAccess = c => {
                                                    console.log('yeet')
                                                    return new _Symbol()
                                                }
                                            }
                                            if (container[1]) {
                                                // id
                                            }
                                        }
                                        return symbol
                                    })
                                }
                            })
                        },
                    ]
                },
                sources: {
                    path: 'test/cases',
                    files: [{file: file}],
                    compilerOptions: {
                        noDuplicateLocalDeclaration: true,
                        noUndeclaredVariables: true,
                        noLabel: true,
                        noStringCall: true,
                        noTableCall: true
                    }
                }
            }
        })
        visitTableBuilder(program)
        // try {
        // } catch (e) {
        //     program.diagnostic.prettyPrint()
        // }
    }
    return 0
}