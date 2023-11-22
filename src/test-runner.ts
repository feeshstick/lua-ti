import fs from "fs";
import {Program} from "./compiler/components/nodes/meta/program.js";
import {collectAssignStatements} from "./compiler/table/table-assign-initializer.js";
import {globalInitializer} from "./compiler/table/global/global-initializer.js";
import {printAssignStatements, printSymbolCoverage, printSymbolTable} from "./utility/print.js";
import {visitTableBuilder2} from "./compiler/table/table-builder.js";

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
                path: 'test/cases',
                file: file,
                cardID: 123
            }
        })
    }
    return 0
}

export function runSimpleTest() {
    const program = Program.build({
        compilerOptions: {},
        program: {
            path: 'test/basic',
            file: 'get-id.lua',
            cardID: 123
        }
    })
    globalInitializer(program)
    collectAssignStatements(program)
    visitTableBuilder2(program)
    printSymbolCoverage(program.source)
    printSymbolTable(program.symbols)
    printAssignStatements(program.symbols)
}