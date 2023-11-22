import {Token} from "../../symbol-table.js";
import {NodeKind} from "../../../components/container-types.js";
import {FunctionExpressionContainer} from "../../../components/nodes/expression/function-expression-container.js";
import {Constants, EffectType, Type} from "../global-environment.js";
import {visitDependencies} from "../global-initializer.js";

export type Card = {}

export const CardEnvironment = {
    RegisterEffect(card: Token, effect: Token) {
        const data = effect.properties.instance
        const type = Constants[data.type] as unknown as EffectType
        switch (type) {
            case Constants.EFFECT_TYPE_FIELD:
            case Constants.EFFECT_TYPE_SINGLE:
                Token.typeGuard(data.condition).properties.typeGuide = [{
                    type: 'function',
                    parameter: (e, tp) => {
                        e.symbol = new Token()
                        e.symbol.properties.type = Type.Effect
                        tp.symbol = new Token()
                        tp.symbol.properties.type = Type.Card
                    }
                }]
                visitDependencies(data.condition)
                break;
            case Constants.EFFECT_TYPE_ACTIVATE:
                if(Token.isToken(data.condition)){
                    data.condition.properties.typeGuide = [{
                        type: 'function',
                        parameter: (e, tp) => {
                            e.symbol = new Token()
                            e.symbol.properties.type = Type.Effect
                            tp.symbol = new Token()
                            tp.symbol.properties.instance = 0 // any number, sets this type to number
                        }
                    }]
                    visitDependencies(data.condition)
                }
                break;
            default:
                console.error(`type ${effect.properties.instance.type} is not a known type.`)
                break
        }
    }
}