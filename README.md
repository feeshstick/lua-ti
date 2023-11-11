# lua-ti

Typescript Environment centered around https://github.com/ProjectIgnis/CardScripts with the goal of making development and maintenance easier by providing:

- automatic generation of documentation
  - extracting signatures from files
- refactoring
  - generating type annotations
- syntax analysis
- semantic analysis
  - type inference
  - ensuring code style
- experimentation

# Example Usage

```typescript
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

---

# Roadmap

Because this Project is mainly focused around https://github.com/ProjectIgnis/CardScripts,
it'll be used for most examples

## Case 1 - Documentation

Considering the size of the project, code documentation is rather difficult. In order to improve readability the addition of annotations would have several benefits:
- the wiki can be generated from extracting information from the annotations
- type context for developing with the library, which can also be used by VSCode Plugins to provide code completion

### Problem
doing it by hand would be a monumental task

### solution
lua-ti can be used to add annotations to the existing code base

### Example

```typescript
interface ParameterAnnotation {
    name: string
    type: string
    isOptional: boolean
    description: string
}

interface ReturnAnnotation {
    type: string
}

interface FunctionAnnotation {
    name: string[]
    description: string
    parameter: ParameterAnnotation[]
    returns: ReturnAnnotation[]
    source: string
}

const annotations: FunctionAnnotation[] = []

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
sourceFileContainer.forEachDeep(node => {
    if (node.kind === NodeKind.FunctionDeclaration) {
        createFunctionAnnotations(node)
        return false
    }
    return true
})

function createFunctionAnnotations(node: FunctionExpressionContainer) {
    if (node.identifier) {
        const returns: ReturnAnnotation[] = []
        node.block.forEachDeep(statement => {
            if (statement.kind !== NodeKind.FunctionDeclaration) {
                if (statement.kind === NodeKind.ReturnStatement) {
                    for (let argument of statement.arguments) {
                        returns.push({
                            type: argument._type?.asString || 'any'
                        })
                    }
                }
                return true
            } else {
                return false
            }
        })
        annotations.push({
            name: node.identifier.text.split('.'),
            description: 'TODO',
            parameter: node.parameter.map(parameter => {
                if (parameter.kind === NodeKind.Identifier) {
                    return {
                        name: parameter.name,
                        type: parameter._type || 'any',
                        isOptional: false,
                        description: 'TODO'
                    }
                } else {
                    return {
                        name: '...',
                        description: 'TOOD',
                        isOptional: false,
                        type: parameter._type?.asString || 'any'
                    }
                }
            }) as ParameterAnnotation[],
            returns: returns,
            source: node.text
        })
    }
}

for (let annotation of annotations) {
    console.log(`---@name ${annotation.name.join('.')}`)
    console.log(`---@desc ${annotation.description}`)
    for (let parameterElement of annotation.parameter) {
        console.log(`---@param ${parameterElement.name}${parameterElement.isOptional ? '?' : ''} ${parameterElement.type} ${parameterElement.description}`)
    }
    if (annotation.returns.length !== 0) {
        console.log(`---@returns ${annotation.returns.map(x => x.type).join(', ')}`)
    }
    console.log(annotation.source.trim())
}
```

### Result

```lua
...
---@name Auxiliary.RemoveUntil
---@desc TODO
---@param card_or_group any TODO
---@param pos any TODO
---@param reason any TODO
---@param phase any TODO
---@param flag any TODO
---@param e any TODO
---@param tp any TODO
---@param oper any TODO
---@param cond any TODO
---@param reset any TODO
---@param reset_count any TODO
---@param hint any TODO
---@param effect_desc any TODO
---@returns any
function Auxiliary.RemoveUntil(card_or_group,pos,reason,phase,flag,e,tp,oper,cond,reset,reset_count,hint,effect_desc)
        local g=(type(card_or_group)=="Group" and card_or_group or Group.FromCards(card_or_group))
        if #g>0 and Duel.Remove(g,pos,reason|REASON_TEMPORARY)>0 and #g:Match(Card.IsLocation,nil,LOCATION_REMOVED)>0 then
                return aux.DelayedOperation(g,phase,flag,e,tp,oper,cond,reset,reset_count,hint,effect_desc)
        end
end
...
```

> with proper type infer or data from the existing wiki, this program can be further improved. see case 3 for type infer

## Case 2 - Analysis

### Syntax Analysis

The AST is generated by [luaparse](https://fstirlitz.github.io/luaparse/).\
I plan on using a custom parser for better integration. 

### Semantic Analysis
 
By binding multiple files to one source node `SourceFile` a Symbol Table can be used to create Symbols across files.

#### Example

2 Files `main.lua` and `foo.lua`, are connected in the AST via Chunks, allowing for symbol access across files. 

```typescript
//language=lua
const main =`function foo() print("Hello World!") end`
//language=lua
const foo =`function main() foo() end main()`
const sourceFileContainer = new SourceFileContainer({
    type: "SourceFile",
    files: [
        {source: main, path: 'main.lua', name: 'main'},
        {source: foo, path: 'foo.lua', name: 'foo'}
    ],
    range: [0, 0]
})
print(sourceFileContainer, text => console.log(text))

function print(node: Container, out: (text: string) => void) {
    out(node.kind)
    node.forEachChild(node => print(node, text => out('    ' + text)))
}
```

#### Result

```
SourceFile
    Chunk
        Block
            FunctionDeclaration
                Identifier
                Block
                    CallStatement
                        CallExpression
                            Identifier
                            StringLiteral
    Chunk
        Block
            FunctionDeclaration
                Identifier
                Block
                    CallStatement
                        CallExpression
                            Identifier
            CallStatement
                CallExpression
                    Identifier

```

> ### Goal: Configuration Files
> 
> Provide a configuration file
> 
> ```json
> {
>   "tableCallExpressions": "warn"
> }
> ```
> 
> Example implementation
> 
> ```typescript
> type Configuration = { tableCallExpressions: 'warn' | 'error' | true }
> const configuration: Configuration = {
>     tableCallExpressions: 'warn'
> }
> const main = `function foo(table) print(table) end`
> const foo = `function main() foo{[0]="Hello World!"} end main()`
> const sourceFileContainer = new SourceFileContainer({
>     type: "SourceFile",
>     files: [
>         {source: main, path: 'main.lua', name: 'main'},
>         {source: foo, path: 'foo.lua', name: 'foo'}
>     ],
>     range: [0, 0]
> })
> sourceFileContainer.forEachDeepChildFirst(chunk => {
>     if (chunk.kind === NodeKind.Chunk) {
>         chunk.forEachDeepChildFirst(node => {
>             if (node.kind === NodeKind.TableCallExpression) {
>                 switch (configuration.tableCallExpressions) {
>                     case "warn":
>                         console.warn(chalk.yellowBright(`[WARN] : tableCallExpression file:///${chunk.sourceFile.path}:${node.errLoc}`))
>                         break
>                     case "error":
>                         console.warn(chalk.redBright(`[ERROR] : tableCallExpression file:///${chunk.sourceFile.path}:${node.errLoc}`))
>                         break
>                     case true:
>                     default:
>                         break
>                 }
>             }
>         })
>     }
> })
> ```
> 
> Result: `[WARN] : tableCallExpression at file:///foo.lua:1:16`
> 

> ### Goal: Create Tests 
> e.g.:
> - duplicate declaration
> 
> ```lua
> function foo(a, b)
>     local a = a -- `[ERROR] : duplicate declaration at file:///foo.lua:1:16`
> end
> ```
> 
> - overwriting constant values
>   - by defining declarations as constant via annotation that can be specified in the configuration `---@constant`
>   - by adding a file `constant.lua` to `constantFiles: ["constant.lua"]`, in the configuration
>   - by code style e.g.: adding a regular expression to the configuration to match constants `constantFilter: /[A-Z_]+/`
>
> ```lua
> function foo()
>     SUMMON_TYPE_LINK = 5 -- `[ERROR] : Attempt to assign to const or readonly variable at file:///foo.lua:1:16`
> end
> ```
> 
> - expressions that can be simplified
> 
> ```lua
> function foo(a)
>     local c = a and a or b -- `[WARN] : a and a is a file:///foo.lua:1:16` 
> end
> ```
> 
> - nil check
> 
> ```lua
> ---@param f function | nil
> function foo(f)
>     f() -- `[ERROR] : Cannot invoke an object which is possibly 'nil' file:///foo.lua:1:16`
> end
> ```
> 
