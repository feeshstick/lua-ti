# lua-ti

## (wip)

# Example Usage

```ts
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
```