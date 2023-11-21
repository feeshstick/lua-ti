import {Program} from "../components/nodes/meta/program.js";
import {SymbolTable, Token} from "./symbol-table.js";
import {createStringBuilder} from "../utility/string-builder.js";
import {ParameterContainer} from "../components/container-types.js";

export type Card = {}
export type Effect = {
    [key: string]: any
}


export function globalInitializer(program: Program) {
    const globals = {
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
                return new Token()
            },
            SetType(__self: Token, type: Token) {
                console.log('SetType', __self, type)
            },
        },
        Duel: {},
        aux: {
            Stringid: (left: Token, right: Token) => {
                const token = new Token()
                token.properties.instance = 'some-string-id'
                return token
            }
        },
        EFFECT_TYPE_ACTIVATE: 1
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
