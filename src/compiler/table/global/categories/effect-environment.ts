import {Token} from "../../symbol-table.js";
import {Constants, Type} from "../global-environment.js";

export type Effect = {
    [key: string]: any
}

export const EffectEnvironment = {
    CreateEffect: CreateEffect,
    SetDescription(__self: Token, description: Token) {
        __self.properties.instance['description'] = description.reference
    },
    SetType(__self: Token, type: Token) {
        __self.properties.instance['type'] = Constants[type.reference]
    },
    SetTarget(__self: Token, operation: Token) {
        __self.properties.instance['target'] = Constants[operation.reference]
    },
    SetOperation(__self: Token, operation: Token) {
        __self.properties.instance['operation'] = Constants[operation.reference]
    },
    SetCondition(__self: Token, operation: Token) {
        __self.properties.instance['condition'] = operation
    },
    SetCode(__self: Token, operation: Token) {
        __self.properties.instance['code'] = Constants[operation.reference]
    },
    SetRange(__self: Token, operation: Token) {
        __self.properties.instance['range'] = Constants[operation.reference]
    },
    SetTargetRange(__self: Token, number: Token, operation: Token) {
        __self.properties.instance['target_range'] = Constants[operation.reference]
    },
    SetProperty(__self: Token, operation: Token) {
        __self.properties.instance['property'] = Constants[operation.reference]
    },
}

function CreateEffect(c: Token) {
    if (c.properties.type !== Type.Card) {
        console.error('not a card') // <-- if parameter NOT type=Card, throws Error
    }
    const token = new Token()
    token.properties.type = Type.Effect
    token.properties.instance = {}
    return token
}