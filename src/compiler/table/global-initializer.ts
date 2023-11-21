import {Program} from "../components/nodes/meta/program.js";
import {SymbolTable, Token} from "./symbol-table.js";
import {createStringBuilder} from "../utility/string-builder.js";
import {ParameterContainer} from "../components/container-types.js";

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
    LOCATION_MZONE,
    LOCATION_HAND
}

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
                    __self.properties.instance['type'] = ref(type)
                },
                SetTarget(__self: Token, operation: Token) {
                },
                SetOperation(__self: Token, operation: Token) {
                },
                SetCondition(__self: Token, operation: Token) {
                },
            },
            Duel: {
                GetFieldGroupCount(player: Token, playerSide: Token, opponentSide: Token) {
                    if (player.properties.type) {
                        console.error('not a primitive type')
                    } else if (player.properties.instance && typeof player.properties.instance !== 'number') {
                        console.error('not a number')
                    }
                }
            },
            Card: {
                RegisterEffect(card: Token, effect: Token) {
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
