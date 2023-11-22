import {Program} from "../../components/nodes/meta/program.js";
import {Token} from "../symbol-table.js";
import {ParameterContainer} from "../../components/container-types.js";
import {GroupEnvironment} from "./categories/group-environment.js";
import {EffectEnvironment} from "./categories/effect-environment.js";
import {DuelEnvironment} from "./categories/duel-environment.js";
import {CardEnvironment} from "./categories/card-environment.js";
import {AuxiliaryEnvironment} from "./categories/auxiliary-environment.js";

export enum Type {
    Card = "Card",
    Group = "Group",
    Effect = "Effect",
    Script = "Script"
}

export enum Constants {
    EFFECT_TYPE_FIELD,
    EFFECT_TYPE_SINGLE,
    EFFECT_TYPE_ACTIVATE,
    EFFECT_CANNOT_ATTACK_ANNOUNCE,
    EFFECT_SELF_DESTROY,
    EFFECT_FLAG_SINGLE_RANGE,
    EVENT_FREE_CHAIN,
    LOCATION_SZONE,
    LOCATION_MZONE,
    LOCATION_HAND
}

export type EffectType =
    | Constants.EFFECT_TYPE_FIELD
    | Constants.EFFECT_TYPE_SINGLE
    | Constants.EFFECT_TYPE_ACTIVATE

export function isEffectType(constant: Constants): constant is EffectType {
    return constant === Constants.EFFECT_TYPE_FIELD
        || constant === Constants.EFFECT_TYPE_SINGLE
        || constant === Constants.EFFECT_TYPE_ACTIVATE
}

const globalEnvironment = {
    Effect: EffectEnvironment,
    Group: GroupEnvironment,
    Duel: DuelEnvironment,
    Card: CardEnvironment,
    aux: AuxiliaryEnvironment
}

export function createGlobalEnvironment(program: Program) {
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
            }
        },
        ...globalEnvironment,
        ...getConstants(),
    }
}

