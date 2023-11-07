import {TypeDeclarationSourceFile} from "./compiler/components/types.js";
import {createProject, ts} from "@ts-morph/bootstrap";
import {ScriptKind, TypeFormatFlags} from "@ts-morph/common";

export async function generate(
    declarations: TypeDeclarationSourceFile
) {
    const project = await createProject()
    const types = project.createSourceFile(declarations.path, declarations.source, {
        scriptKind: ScriptKind.TS
    })
    const program = project.createProgram()
    const checker = program.getTypeChecker()
    types.forEachChild(node => {
        if (ts.isTypeAliasDeclaration(node)) {
            if (node.name.getText() === '_ENV') {
                serializeTypeDeclaration(node)
            }
        }
    })
    
    function serializeTypeDeclaration(node: ts.TypeAliasDeclaration) {
        const symbol = checker.getSymbolAtLocation(node.name)
        console.log(checker.typeToString(checker.getTypeFromTypeNode(node.type), node, TypeFormatFlags.InTypeAlias))
        let indent = 0
        
        function print(symbolMap: ts.SymbolTable | undefined) {
            indent++
            indent--
        }
    }
}