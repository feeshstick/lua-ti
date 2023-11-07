import fs from "fs";
import {SourceFileContainer} from "./compiler/components/nodes/meta/source-file-container.js";
import {luaSourceMapTest} from "./test/lua-source-map-tests.js";
import {FileReference, NodeKind} from "./compiler/components/types.js";
import {tableBuilder} from "./compiler/table/table-builder.js";
import {createBackendInterface} from "./utility/create-backend-interface.js";

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
            tableBuilder(sourceFileContainer)
            sourceFileContainer.symbols.print()
            break
        }
        case 'backend-interface': {
            createBackendInterface()
            break
        }
        default:
            /**
             * Example Program
             * binds all library files in assets/CardScripts
             * then print all identifier of all function declarations and print their path + location
             * e.g.:
             * select_field_return_cards file:///.../lua-ti/assets/CardScripts/utility.lua:2234:0
             * Auxiliary.DefaultFieldReturnOp file:///.../lua-ti/assets/CardScripts/utility.lua:2255:0
             */
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
            sourceFileContainer.forEachDeep(chunk => {
                if (chunk.kind === NodeKind.Chunk) {
                    chunk.forEachDeep(node => {
                        if (node.kind === NodeKind.FunctionDeclaration) {
                            console.log(node.identifier?.text + ' file:///' + fs.realpathSync(chunk.sourceFile.path).replaceAll(/\\/gm, '/') + ':' + node.errLoc)
                        }
                        return true
                    })
                    return false
                }
                return true
            })
            break
    }
}

