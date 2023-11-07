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

# Goal

I'll take https://github.com/ProjectIgnis/CardScripts as an example.

## Case 1

Considering the size of the project, code documentation is rather difficult.
In order to improve readability the addition of annotations would have several benefits:
- automatic generation of documentation
  - the wiki can be generated from extracting information from the annotations
  - type context for developing with the library, which can also be used by VSCode Plugins to provide code completion
- problem
  - doing it by hand would be a monumental task
- solution
  - lua-ti can be used to add annotations to the existing code base

### Example

```ts
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
```

> with proper type infer or data from the existing wiki, this program can be further improved. see case 3 for type infer

## Automatic generation of documentation

```lua
SUMMON_TYPE_LINK = 0x4c000000
MATERIAL_LINK = 0x8<<32
CATEGORY_DAMAGE = 0x80000
EFFECT_FLAG_PLAYER_TARGET = 0x800
EFFECT_TYPE_TRIGGER_F = 0x200
EFFECT_TYPE_SINGLE = 0x200
EVENT_DESTROYED = 1029

function Link.ConditionFilter(c,f,lc,tp)
	return c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))
end

function apply()
    local s,id=GetID()
    function s.initial_effect(c)
        --Damage
        local e1=Effect.CreateEffect(c)
        e1:SetCategory(CATEGORY_DAMAGE)
        e1:SetProperty(EFFECT_FLAG_PLAYER_TARGET)
        e1:SetType(EFFECT_TYPE_SINGLE+EFFECT_TYPE_TRIGGER_F)
        e1:SetCode(EVENT_DESTROYED)
        -- e1:SetCondition(s.drcon)
        -- e1:SetTarget(s.damtg)
        -- e1:SetOperation(s.damop)
        c:RegisterEffect(e1)
    end
    s.listed_series={0x12c}
end
```