import {Program} from "../../../components/nodes/meta/program.js";
import {Token} from "../../symbol-table.js";
import {ParameterContainer} from "../../../components/container-types.js";
import {GroupEnvironment} from "./categories/group-environment.js";
import {EffectEnvironment} from "./categories/effect-environment.js";
import {DuelEnvironment} from "./categories/duel-environment.js";
import {CardEnvironment} from "./categories/card-environment.js";
import {AuxiliaryEnvironment} from "./categories/auxiliary-environment.js";
import {Constants} from "./global-constants.js";
import {Context} from "./global-functions.js";

export enum NamedType {
    Card = "Card",
    Group = "Group",
    Effect = "Effect",
    Script = "Script",
}

export type EffectType =
    | Constants.EFFECT_TYPE_FIELD
    | Constants.EFFECT_TYPE_SINGLE
    | Constants.EFFECT_TYPE_ACTIVATE
    | Constants.EFFECT_TYPE_IGNITION

export function isEffectType(constant: Constants): constant is EffectType {
    return constant === Constants.EFFECT_TYPE_FIELD
        || constant === Constants.EFFECT_TYPE_SINGLE
        || constant === Constants.EFFECT_TYPE_ACTIVATE
}

type ContextEntry = [string, ($context: Context) => (...$: Token[]) => any]

export function createGlobalEnvironment(program: Program) {
    const globalEnvironment = {
        Effect: EffectEnvironment,
        Group:GroupEnvironment,
        Duel: DuelEnvironment,
        Card: CardEnvironment,
        aux: AuxiliaryEnvironment,
        Auxiliary: AuxiliaryEnvironment
    }
    
    function joinEntries(left: any, right: any) {
        return {
            ...reduceContextEntries(Object.entries(left)),
            ...right
        }
    }
    
    function createContext(): Context {
        return {
            createDefault(properties: Partial<Token["properties"]>): Token {
                const token = new Token(program.symbols.idProvider)
                for (let [key, val] of Object.entries(properties)) {
                    token.properties[key] = val
                }
                return token;
            }, createToken(properties: Partial<Token["properties"]>): Token {
                return this.createDefault(properties);
            }, createVoid(): Token {
                return this.createDefault({
                    type: 'void'
                });
            }, emitError(message: string) {
                program.propagateError(message)
            }, emitWarning(message: string) {
                program.propagateError(message)
            }, lookup(name: string): Token {
                return program.symbols.lookup(name) || this.createDefault({})
            }
        }
    }
    
    function reduceContextEntries(entries: ContextEntry[]): Object {
        const context = createContext()
        return entries.reduce((object, [name, _function]) => {
            object[name] = _function(context)
            return object
        }, {})
    }
    
    function getConstants() {
        const entries = Object.entries(Constants)
        return entries.slice(entries.length / 2).reduce((p, c) => {
            p[c[0]] = c[1]
            return p
        }, {})
    }
    
    return {
        ...{
            GetID() {
                const left = new Token(program.symbols.idProvider)
                const right = new Token(program.symbols.idProvider)
                left.properties.type = 'Script'
                left.properties.typeGuide = [
                    ['initial_effect', {
                        type: 'function',
                        parameter: (c: ParameterContainer) => { // <-- infer parameter type on function declaration
                            c.symbol = new Token(program.symbols.idProvider)
                            c.symbol.properties.type = 'Card'
                            c.symbol.properties.instance = {}
                        }
                    }]
                ]
                right.properties.instance = program.config.program.cardID
                return [left, right]
            }
        },
        ...globalEnvironment,
        ...getConstants(),
    }
}

