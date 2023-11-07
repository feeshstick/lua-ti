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

## Case 3 - Type Inference (wip - and very difficult)

### Problem 

`Effect.CreateEffect(c)`, doesn't have a definition in the Script Library of [ProjectIgnis/CardScripts](https://github.com/ProjectIgnis/CardScripts).\
type of `e1` is the return type of `Effect.CreateEffect(c)`, which is `Effect`.
if `e1:SetCategory(CATEGORY_DAMAGE)` is written `e1:SetCatgory(CATEGORY_DAMAGE)` instead. It would throw a runtime error.

### Solution

There are lua Functions only available during runtime, but not during compile time.
A Typescript file can be provided to describe additional context for lua-ti.\
It'll be loaded to the symbol table, based on the `_ENV` type. Making it available during compile time.

Reasons for doing it in Typescript:
- Typescript allows for more complex types
- The type definitions can be compiled by Typescript itself (I don't have to do it)

```ts
type Card = {
    /**
     * @description can __self be used as material for linkCard
     * @param __self
     * @param linkCard
     * @param player
     * @returns boolean
     */
    IsCanBeLinkMaterial(__self: Card, linkCard?: Card, player?: number): boolean
    /**
     * @param __self
     * @param effect
     * @param force
     * @constructor
     */
    RegisterEffect(__self: Card, effect: Effect, force?: boolean): void
}

type Effect = {
    /**
     * @description Creates a new effect object with a "card" as its owner.
     * @param card
     * @constructor
     */
    CreateEffect(card: Card): Effect
    SetCategory(__self: Effect, category: number): void
    SetProperty(__self: Effect, property: number): void
    SetType(__self: Effect, type: number): void
    SetCode(__self: Effect, code: number): void
}

type Self = {
    initial_effect(card: Card): void
}

type _ENV = {
    Card: Card,
    Effect: Effect,
    GetID(): [Self, number]
}
```

Let's take this function as an example to infer some types:

#### Input

```lua
function Link.ConditionFilter(c,f,lc,tp)
	return c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))
end
```

##### Step 1 - Create a Symbol Table

This structure represents the Symbol Table for the function signature `Link.ConditionFilter(c,f,lc,tp)`.\
`unknown` for types we don't know yet

```
Link = {
    ConditionFilter(
        c : unknown,
        f : unknown,
        lc : unknown,
        tp : unknown
    ) : unknown
}
```

> The Symbol Table itself gives information about types. e.g.: we know that Link is a table with the properties described above

##### Step 2 - Analyse Usage of Environment (bind types)

Link.ConditionFilter has return-statement, which can be broken down into: again `unknown` noting types we don't know yet
```
logical-statement : unknown
    left: c:IsCanBeLinkMaterial(lc,tp) unknown
    operator: and
    right: (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp)) unknown
```
Let's look at `c:IsCanBeLinkMaterial(lc,tp)`, because it's the first expression in the logical statement
- `c:IsCanBeLinkMaterial(lc,tp)` is a call-expression with arguments `lc` and `tp`
- `c` has a member `IsCanBeLinkMaterial`
- Let's take a look at which type in `_ENV` has `IsCanBeLinkMaterial` with 2 arguments.
  - `Card : { IsCanBeLinkMaterial(__self: Card, linkCard?: Card, player?: number): boolean }`
  - if `c` has no type set yet and there are no other types with the same signature, it can be said that `c`, must be of type `Card`
    - if `c` is a card, the member call `c:IsCanBeLinkMaterial(lc,tp)` provides information about the arguments used
      - `lc` must be a `Card`
      - `tp` must be a `number`
  - the return value of `c:IsCanBeLinkMaterial(lc,tp)` is `boolean`

```
Link = {
    ConditionFilter(
        c : Card,
        f : unknown,
        lc : Card,
        tp : number
    ) : unknown
}
```

Let's look at `not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp)`
```
logical-statement : unknown
    left: c:IsCanBeLinkMaterial(lc,tp) : boolean
    operator: and
    right: logical-statement : unknown
        left: not f : unknown
        operator: or 
        right: f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp) : unknown
```
- note: `not f` is used because `f` can be `nil | false`, making the right part illegal when `f` is `nil | false` without the check
- `f` can be called with 4 arguments.
- update the symbol table, by setting the 2nd parameter of `ConditionFilter` to a function type
  - because the call-expression is used as expression that assigns a type (which is the return type of `ConditionFilter`), add a generic return to `f` (using type `any` would work too)
  
```typescript
Link = {
    ConditionFilter<RETURN_F>(
        c: Card,
        f: (a: unknown, b: unknown, c: unknown, d: unknown) => RETURN_F,
        lc: Card,
        tp: number
    ): unknown
}
```
Let's look at the individual arguments of `f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp)`
- parameter `a` of `f`, and first argument is the expression `c`
  - type of `a` is type of `c`, which is `Card`
- parameter `b` of `f`, and second argument is the expression `lc`
  - type of `b` is type of `lc`, which is `Card`
- parameter `c` of `f`, and third argument is the expression `SUMMON_TYPE_LINK|MATERIAL_LINK`
  - every binary-expression (except logical-expressions, with `and` or `or`), will produce a primitive result
    - during compile time we can lookup, which type `SUMMON_TYPE_LINK` and `MATERIAL_LINK` must be based on the operator used
      - `a | b`, where a, b are numbers, result in a number. a and b must be a number, if they are not it'll throw a runtime error
        - lookup `SUMMON_TYPE_LINK`,
          - if type of `SUMMON_TYPE_LINK` is defined, then compare it to required type; else (set type of `SUMMON_TYPE_LINK` to `number`), or throw compile time error
        - lookup `MATERIAL_LINK`,
          - if type of `MATERIAL_LINK` is defined, then compare it to required type; else (set type of `MATERIAL_LINK` to `number`), or throw compile time error
        - set type of `SUMMON_TYPE_LINK|MATERIAL_LINK` to `number`
  - type of `c` is type of `SUMMON_TYPE_LINK|MATERIAL_LINK`, which is `number`
- type of `b` is type of `lc`, which is `Card`
- parameter `d` of `f`, and fourth argument is the expression `tp`
  - type of `d` is type of `tp`, which is `number`
- `f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp)` returns type `RETURN_F`, if we replace the initial expression `c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))` with types for their expression `boolean and boolean or RETURN_F`, `ConditionFilter`, returns `boolean`, or whatever `f` returns

For readability i'll replace `a, b, c, d` with the parameter name used in the expression
(i'll not infer nil to be a type of f, for simplicity. But nil check could still be relevant in the future)

```typescript
Link = {
    ConditionFilter<RETURN_F>(
        c: Card,
        f: (c: Card, lc: Card, type: number, tp: number) => RETURN_F,
        lc: Card,
        tp: number
    ): boolean | RETURN_F
}
```

#### Output

or as annotation, which can be added to the source code as shown earlier.

```lua
---@generic E
---@param c any
---@param f fun(c: Card, lc: Card, type: number, tp: number) : E
---@param lc Card
---@param tp number
---@return boolean | E
function Link.ConditionFilter(c,f,lc,tp)
	return c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))
end
```

## Case 4 - Type Annotations for Semantic Analysis (wip)

Using type annotations for type checking.
(VSCode Plugins can already do that without having to compile, providing code completion for types that are legal. e.g.: for arguments, member expressions, etc. in real time)

Instead of using a Typescript interface to describe backend context, type annotations can be used to provide additional type context.\
Let's change the type annotation:
- remove the generic `E`
- make `f` return `any`
- make `Link.ConditionFilter` return `boolean`

```lua
---@param c any
---@param f fun(c:Card, lc: Card, _2: number, tp: number) : any
---@param lc Card
---@param tp number
---@return boolean
function Link.ConditionFilter(c,f,lc,tp)
    return c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))
end
```
We'd have to ensure that `f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp)` is cast to boolean\
(throwing an error at `Link.ConditionFilter(c,f,lc,tp)`)\
or
change the signature type `---@param f fun(c:Card, lc: Card, _2: number, tp: number) : boolean`,
(throwing an error, for all function calls of `Link.ConditionFilter(c,f,lc,tp)` 
when `f` is a function that could return a type that's not boolean)