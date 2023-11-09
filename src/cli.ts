import fs from "fs";
import {SourceFileContainer} from "./compiler/components/nodes/meta/source-file-container.js";
import {luaSourceMapTest} from "./test/lua-source-map-tests.js";
import {Container, FileReference, isExpressionContainer} from "./compiler/components/types.js";
import {createBackendInterface} from "./utility/create-backend-interface.js";
import {tableVisitor} from "./compiler/table/table-builder-2.js";
import chalk from "chalk";

// import {luaSourceMapTest} from "./test.lua/lua-source-map-tests.js";

luaSourceMapTest;
fs;

export function cli() {
    switch (process.argv[2]) {
        case 'types': {
            const sourceFileContainer = new SourceFileContainer({
                type: 'SourceFile',
                typeDeclaration: {
                    path: 'src/test/typedef.ts',
                    source: fs.readFileSync('src/test/typedef.ts').toString('utf-8'),
                    name: 'typedef.ts'
                },
                files: [{
                    source: fs.readFileSync('src/test/test.lua').toString('utf-8'),
                    path: 'src/test/test.lua',
                    name: 'test.lua'
                }],
                range: [0, 0],
            })
            tableVisitor[sourceFileContainer.kind](sourceFileContainer)
            print(sourceFileContainer, text => console.log(text))
            // tableBuilder(sourceFileContainer)
            // sourceFileContainer.symbols.print()
            break
        }
        case 'backend-interface': {
            createBackendInterface()
            break
        }
        default:
            const sourceFiles: FileReference[] = []
            for (let fileName of fs.readdirSync('assets/CardScripts')) {
                if (fileName.endsWith('.lua')) {
                    const source = fs.readFileSync('assets/CardScripts/' + fileName).toString('utf-8')
                    sourceFiles.push({
                        name: fileName.slice(0, -4),
                        source: source,
                        path: 'assets/CardScripts/' + fileName
                    })
                }
            }
            const sourceFileContainer = new SourceFileContainer({
                type: "SourceFile",
                files: sourceFiles,
                range: [0, 0]
            })
            tableVisitor[sourceFileContainer.kind](sourceFileContainer)
            print(sourceFileContainer, text => console.log(text))
            break
    }
}


function print(node: Container, out: (text: string) => void) {
    out('#' + node.id + ' ' + node.kind + ' : ' + (isExpressionContainer(node) ? (node._type?.asString || 'unknown') +' '+ (node.__symbol ? chalk.bgCyanBright(' ') : chalk.bgRedBright(' ')) : '<Statement>') + ' ')
    for (let flag of node._flags) {
        out('    > ' + flag)
    }
    node.forEachChild(node => {
        print(node, text => out('    ' + text))
        return true
    })
}