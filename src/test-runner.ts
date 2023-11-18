import fs from "fs";
import {Program} from "./compiler/components/nodes/meta/program.js";
import {visitTableBuilder} from "./compiler/table/table-builder.js";
import {NodeKind} from "./compiler/components/container-types.js";

export function runTest(): number {
    for (let file of fs.readdirSync('test/cases')) {
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
                            file: 'card.d.lua',
                            inject: {
                                Card: {
                                    RegisterEffect: context => {
                                        return (__self, effect) => {
                                            console.log('RegisterEffect context')
                                        }
                                    }
                                }
                            }
                        },
                        {file: 'debug.d.lua'},
                        {file: 'duel.d.lua'},
                        {file: 'group.d.lua'},
                        {
                            file: 'effect.d.lua',
                            inject: {
                                Effect: {
                                    CreateEffect: context => {
                                        return card => {
                                            console.log('CreateEffect context')
                                        }
                                    }
                                }
                            }
                        },
                        {
                            file: 'type.d.lua',
                            inject: {
                                GetID: context => {
                                    return () => {
                                        console.log('GetID context')
                                    }
                                }
                            }
                        },
                    ]
                },
                sources: {
                    path: 'test/cases',
                    files: [
                        {file: 'argument-type-mismatch-1.lua'}
                    ]
                    
                }
            }
        })
        visitTableBuilder(program)
        console.log(program.symbols)
    }
    return 0
}