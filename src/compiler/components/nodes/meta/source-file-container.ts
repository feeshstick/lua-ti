import fs from "fs";
import luaparse from "luaparse";
import {Container, NodeKind, SourceFileNode} from "../../types.js";
import {BaseContainer} from "../../base-container.js";
import {ChunkContainer} from "./chunk-container.js";
import {Scope} from "../../../scope/scope.js";
import {SymbolTable} from "../../../table/symbol-table.js";
import {default as ts, TypeAliasDeclaration} from "typescript";
import {createTable, GlobalTable} from "../../../table/symbol-table-2.js";

export class SourceFileContainer extends BaseContainer<NodeKind.SourceFile> {
    parent: Container | undefined;
    public readonly kind = NodeKind.SourceFile
    public readonly chunks: ChunkContainer[] = []
    public readonly rootSymbolTable: SymbolTable = new SymbolTable()
    public globalTable: GlobalTable = createTable()
    
    constructor(
        public readonly node: SourceFileNode
    ) {
        super(new Scope())
        if (this.node.typeDeclaration) {
            // const program = ts.createProgram({
            //     options: {
            //         declaration: true,
            //         noImplicitAny: false,
            //         noImplicitOverride: true,
            //         noImplicitReturns: true,
            //         noImplicitThis: true,
            //         preserveConstEnums: true,
            //         sourceMap: true,
            //         strict: true,
            //         allowUnusedLabels: false,
            //         alwaysStrict: true,
            //         declarationMap: true,
            //         experimentalDecorators: true,
            //         forceConsistentCasingInFileNames: true,
            //     },
            // })
            // generate(this.node.typeDeclaration)
            const ast: ts.SourceFile = ts.createSourceFile(this.node.typeDeclaration.path, this.node.typeDeclaration.source, ts.ScriptTarget.Latest, true)
            let hasEnvironmentRoot = false
            for (let statement of ast.statements) {
                if (statement.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                    const t = statement as TypeAliasDeclaration
                    if (t.name.getText() === '_ENV') {
                        hasEnvironmentRoot = true
                    }
                } else {
                    console.error(`child of SourceFile must be TypeAliasDeclaration ${
                        fs.realpathSync(this.node.typeDeclaration.path)
                    }:${statement.getStart(ast)} \n${statement.getFullText(ast)}`)
                    throw new Error()
                }
            }
            if (!hasEnvironmentRoot) {
                console.error('_ENV not found. must have type _ENV = {} as root type, referencing other declared types.')
                throw new Error()
            }
            this.rootSymbolTable.initializeEnvironment()
        }
        for (let sourceFile of node.files) {
            const ast = luaparse.parse(sourceFile.source, {
                locations: true,
                ranges: true,
                luaVersion: "5.3",
                scope: true,
                comments: true
            })
            const chunk = new ChunkContainer(sourceFile, ast, this, this.scope)
            this.chunks.push(chunk)
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