import {Token} from "../../symbol-table.js";

export type ParameterChecker = (token: Token) => boolean
export const FunctionFactory = {
    createSignature(...validators: ParameterChecker[]) {
        return (...args: Token[]) => {
            if (args.length < validators.length) {
                console.error('error: missing arguments')
            }
            for (let i = 0; i < args.length; i++) {
                const validator = validators[i] as ParameterChecker | undefined
                const argument = args[i]
                if (validator) {
                    if (!validator(argument)) {
                        argument.emitError(`error: parameter ${i} type mismatch`)
                    }
                } else {
                    argument.emitError(`too many arguments`)
                }
            }
        }
    },
    createPrimitiveParameterCheck: function (type: string): ParameterChecker {
        return (token: Token) => {
            return type === typeof token.properties.instance
        }
    }
}
export const Type = {
    Number: FunctionFactory.createPrimitiveParameterCheck('number'),
    String: FunctionFactory.createPrimitiveParameterCheck('string'),
    Boolean: FunctionFactory.createPrimitiveParameterCheck('boolean'),
    Union: (left: ParameterChecker, right: ParameterChecker) => (token: Token) => left(token) || right(token),
    Effect: (token: Token) => token.properties.type === 'Effect',
    Group: (token: Token) => token.properties.type === 'Group',
    Card: (token: Token) => token.properties.type === 'Card',
    Null: (token: Token) => typeof token.properties.instance === 'object' && !token.properties.instance,
}
