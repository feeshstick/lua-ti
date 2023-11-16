import fs from "fs";
import luaparse, {Node} from "luaparse";
import {Container, FileReference, NodeKind, SourceFileNode} from "../../container-types.js";
import {BaseContainer} from "../../base-container.js";
import {ChunkContainer} from "./chunk-container.js";
import {Scope} from "../../scope.js";
import {createTable, GlobalTable} from "../../../table/symbol-table.js";
import {CompilerOptions} from "../../../compiler-options/compiler-options.js";
import {Comment} from "luaparse/lib/ast.js";

export class SourceFileContainer extends BaseContainer<NodeKind.SourceFile> {
    static build(config: {
        declarations: {
            dir: string
            files: string[]
            compilerOptions: CompilerOptions
        }[]
        sourceFiles: {
            dir: string
            files: string[]
            compilerOptions: CompilerOptions
        }
    }) {
        return new SourceFileContainer({
            files: [...config.declarations.flatMap(declaration => {
                return declaration.files.map(file => {
                    return {
                        path: declaration.dir + '/' + file,
                        name: file.slice(0, -4),
                        source: fs.readFileSync(declaration.dir + '/' + file).toString('utf-8'),
                        compilerOptions: declaration.compilerOptions
                    } as FileReference
                })
            }), ...config.sourceFiles.files.map(file => {
                return {
                    path: config.sourceFiles.dir + '/' + file,
                    name: file.slice(0, -4),
                    source: fs.readFileSync(config.sourceFiles.dir + '/' + file).toString('utf-8'),
                    compilerOptions: config.sourceFiles.compilerOptions
                } as FileReference
            })],
            range: [0, 0],
            type: 'SourceFile',
        })
    }
    
    static from(root: string, ...files: string[]) {
        return new SourceFileContainer({
            files: [...files.map(file => {
                return {
                    path: root + '/' + file,
                    name: file.slice(0, -4),
                    source: fs.readFileSync(root + '/' + file).toString('utf-8'),
                    compilerOptions: {
                        fileFlag: 'none',
                        strict: true
                    }
                } as FileReference
            })],
            range: [0, 0],
            type: 'SourceFile',
        })
    }
    
    parent: Container | undefined;
    public readonly kind = NodeKind.SourceFile
    public readonly chunks: ChunkContainer[] = []
    public globalTable: GlobalTable = createTable()
    
    constructor(
        public readonly node: SourceFileNode
    ) {
        super(new Scope())
        for (let sourceFile of node.files) {
            let commentStack: Comment[][] = []
            let prevType: Node['type'] | undefined
            let indent = 0
            const getCommentMatch = (line: number) => {
                for (let commentStackElement of commentStack) {
                    const commentEnd = commentStackElement[commentStackElement.length - 1].loc?.start.line
                    if (commentEnd == line - 1) {
                        return commentStackElement
                    }
                }
                return undefined
            }
            const ast = luaparse.parse(sourceFile.source, {
                locations: true,
                ranges: true,
                luaVersion: "5.3",
                scope: true,
                comments: true,
                onCreateScope: () => {
                    indent += 1
                },
                onDestroyScope: () => {
                    indent -= 1
                },
                onCreateNode: node => {
                    if (node.type === 'Comment') {
                        const match = getCommentMatch(node.loc!.start.line)
                        if (match) {
                            match.push(node)
                        } else {
                            commentStack.push([node])
                        }
                    }
                    prevType = node.type
                    if (node.type === 'FunctionDeclaration') {
                        const line = node.loc!.start.line
                        node['comments'] = getCommentMatch(line)
                    } else if (node.type === 'AssignmentStatement') {
                        const line = node.loc!.start.line
                        node['comments'] = getCommentMatch(line)
                    }
                }
            })
            const chunk = new ChunkContainer(sourceFile, ast, this, this.scope)
            this.chunks.push(chunk)
            // iterate over every node and init them (wouldn't be necessary with custom parser)
            chunk.forEachDeep(initContainer)
            
            function initContainer(node: Container) {
                node.onInit()
                return true
            }
            
        }
    }
    
    getGlobalTable() {
        return this.globalTable
    }
    
    forEachChild(node: (node: ChunkContainer) => void) {
        for (let chunk of this.chunks) {
            node(chunk)
        }
    }
    
}