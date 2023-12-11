import {Token} from "../../../symbol-table.js";
import {NamedType} from "../global-environment.js";
import {Constants} from "../global-constants.js";
import {NodeKind} from "../../../../components/container-types.js";
import {FunctionExpressionContainer} from "../../../../components/nodes/expression/function-expression-container.js";

export type Effect = {
    [key: string]: any
}

export const EffectEnvironment = {
    CreateEffect: CreateEffect,
    SetType(__self: Token, type: Token) {
        if (type.properties.type === 'BinaryExpression') {
            const expression = type.reference as {
                operator: string
                left: Token
                right: Token
            }
            __self.properties.instance['type'] = expression
        }
        if (typeof type.reference === 'number') {
            __self.properties.instance['type'] = Constants[type.reference]
        }
    },
    SetCondition(__self: Token, operation: Token) {
        const type = __self.properties.instance['type']
        const functionDeclaration = operation.getDeclaration().filter(x => x.kind === NodeKind.FunctionDeclaration)[0] as FunctionExpressionContainer
        // if (type.includes(Constants.EFFECT_TYPE_SINGLE)) {
        //     functionDeclaration.setTypeGuide(['number'])
        // } else if (type.includes(Constants.EFFECT_TYPE_FIELD)) {
        //     functionDeclaration.setTypeGuide(['Card'])
        // } else {
        //     functionDeclaration.setTypeGuide(['Card', 'Effect'])
        // }
        __self.properties.instance['condition'] = operation
    },
    SetDescription(__self: Token, description: Token) {
        __self.properties.instance['description'] = description.reference
    },
    SetTarget(__self: Token, operation: Token) {
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
    SetCategory(__self: Token, category: Token) {
        __self.properties.instance['category'] = Constants[category.reference]
    },
    SetOperation(__self: Token, operation: Token) {
    },
    SetCountLimit(__self: Token, count: Token, code: Token, flag: Token) {
    },
    SetCost(__self: Token, category: Token) {
    },
}

function CreateEffect(c: Token) {
    if (c.properties.type !== NamedType.Card) {
        c.emitError('not a card')
    }
    const token = c.createEmpty()
    token.properties.type = NamedType.Effect
    token.properties.instance = {}
    return token
}