import {Token} from "../../../symbol-table.js";

export type Card = {}

export const CardEnvironment = {
    RegisterEffect(card: Token, effect: Token) {
        if(!card.properties.instance){
            card.properties.instance = {}
        }
        if(!card.properties.instance['effects']){
            card.properties.instance['effects'] = []
        }
        card.properties.instance['effects'].push(effect)
    },
    EnableReviveLimit(card: Token) {
        card.properties.instance['revive_limit'] = true
    }
}