import {Program} from "../components/nodes/meta/program.js";
import {SymbolTable, Token} from "./symbol-table.js";
import {createStringBuilder} from "../utility/string-builder.js";
import {NodeKind, ParameterContainer} from "../components/container-types.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";

export type Card = {}
export type Effect = {
    [key: string]: any
}


function ref(instance: Token) {
    if (typeof instance.properties.instance !== 'undefined') {
        if (instance.properties.instance instanceof Token) {
            return ref(instance.properties.instance)
        } else {
            return instance.properties.instance
        }
    }
}

export enum Constants {
    EFFECT_TYPE_FIELD,
    EFFECT_TYPE_SINGLE,
    EFFECT_TYPE_ACTIVATE,
    EVENT_FREE_CHAIN,
    EFFECT_CANNOT_ATTACK_ANNOUNCE,
    LOCATION_SZONE,
    EFFECT_SELF_DESTROY,
    EFFECT_FLAG_SINGLE_RANGE,
    LOCATION_MZONE,
    LOCATION_HAND
}

export type EFFECT_TYPE =
    | Constants.EFFECT_TYPE_FIELD
    | Constants.EFFECT_TYPE_SINGLE
    | Constants.EFFECT_TYPE_ACTIVATE

export function globalInitializer(program: Program) {
    function getConstants() {
        const entries = Object.entries(Constants)
        return entries.slice(entries.length / 2).reduce((p, c) => {
            p[c[0]] = c[1]
            return p
        }, {})
    }
    
    const globals = {
        ...{
            GetID() {
                const left = new Token()
                const right = new Token()
                left.properties.type = 'Script'
                left.properties.typeGuide = [
                    ['initial_effect', {
                        type: 'function',
                        parameter: (c: ParameterContainer) => { // <-- infer parameter type on function declaration
                            c.symbol = new Token()
                            c.symbol.properties.type = 'Card'
                        }
                    }]
                ]
                right.properties.instance = program.config.program.cardID
                return [left, right]
            },
            Effect: {
                CreateEffect: (c: Token) => {
                    if (c.properties.type !== 'Card') {
                        console.error('not a card') // <-- if parameter NOT type=Card, throws Error
                    }
                    const token = new Token()
                    token.properties.type = 'Effect'
                    token.properties.instance = {}
                    return token
                },
                SetDescription(__self: Token, description: Token) {
                    __self.properties.instance['description'] = ref(description.properties.instance)
                },
                SetType(__self: Token, type: Token) {
                    __self.properties.instance['type'] = Constants[ref(type)]
                },
                SetTarget(__self: Token, operation: Token) {
                    __self.properties.instance['target'] = Constants[ref(operation)]
                },
                SetOperation(__self: Token, operation: Token) {
                    __self.properties.instance['operation'] = Constants[ref(operation)]
                },
                SetCondition(__self: Token, operation: Token) {
                    __self.properties.instance['condition'] = operation
                },
                SetCode(__self: Token, operation: Token) {
                    __self.properties.instance['code'] = Constants[ref(operation)]
                },
                SetRange(__self: Token, operation: Token) {
                    __self.properties.instance['range'] = Constants[ref(operation)]
                },
                SetTargetRange(__self: Token, number: Token, operation: Token) {
                    __self.properties.instance['target_range'] = Constants[ref(operation)]
                },
                SetProperty(__self: Token, operation: Token) {
                    __self.properties.instance['property'] = Constants[ref(operation)]
                },
            },
            Duel: {
                GetFieldGroupCount(player: Token, playerSide: Token, opponentSide: Token) {
                    if (player.properties.type) {
                        console.error(`expected=number actual=${player.properties.type}`)
                    } else if (player.properties.instance && typeof player.properties.instance !== 'number') {
                        console.error('not a number')
                    }
                }
            },
            Card: {
                RegisterEffect(card: Token, effect: Token) {
                    const data = effect.properties.instance
                    const type = Constants[data.type] as unknown as EFFECT_TYPE
                    switch (type) {
                        case Constants.EFFECT_TYPE_FIELD:
                            (data.condition as Token).properties.typeGuide = [{
                                type: 'function',
                                parameter: (e, tp) => {
                                    e.symbol = new Token()
                                    e.symbol.properties.type = 'Effect'
                                    tp.symbol = new Token()
                                    tp.symbol.properties.type = 'Card'
                                }
                            }];
                            for (let filterElement of (data.condition as Token).declarations.filter(x => x.kind === NodeKind.FunctionDeclaration)) {
                                (filterElement as FunctionExpressionContainer).visitLater!()
                            }
                            break;
                        case Constants.EFFECT_TYPE_SINGLE:
                            console.log(data.condition)
                            break;
                        case Constants.EFFECT_TYPE_ACTIVATE:
                            console.log(data.condition)
                            break;
                        default:
                            console.error(`type ${effect.properties.instance.type} is not a known type.`)
                            break
                    }
                }
            },
            aux: {
                Stringid: (left: Token, right: Token) => {
                    const token = new Token()
                    token.properties.instance = (Number(ref(left)) & 0xfffff) | Number(ref(right)) << 20
                    return token
                }
            },
        }, ...getConstants()
    }
    
    const global = program.symbols.global
    setEntries(global, globals)
    const out = createStringBuilder()
    global.getText(out)
    
    function setEntries(table: SymbolTable | Token, obj: any) {
        for (let key of Object.keys(obj)) {
            setEntry(key, obj[key])
        }
        
        function setEntry(key: string, objElement: any) {
            const token = new Token()
            table.enter(key, token)
            if (typeof objElement === 'object' && objElement) {
                setEntries(token, objElement)
                token.properties.immutable = true
            } else {
                token.properties.immutable = true
                token.properties.instance = objElement
            }
        }
    }
    
    function createScript() {
        return {}
    }
    
    function createEffect(card: Card): Effect {
        return {
            type: 'Effect',
            __index: {}
        }
    }
}
