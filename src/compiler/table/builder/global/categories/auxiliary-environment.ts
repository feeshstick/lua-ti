import {Token} from "../../../symbol-table.js";
import {FunctionFactory, Type} from "../check-factory.js";

export const AuxiliaryEnvironment = {
    Stringid: Stringid,
    bfgcost: FunctionFactory.createSignature(
        Type.Effect,
        Type.Number,
        Type.Union(
            Type.Group,
            Type.Null
        ),
        Type.Number,
        Type.Number,
        Type.Effect,
        Type.Number,
        Type.Number,
        Type.Number
    ),
    bdocon: FunctionFactory.createSignature(
        Type.Effect,
        Type.Number,
        Type.Union(
            Type.Group,
            Type.Null
        ),
        Type.Number,
        Type.Number,
        Type.Effect,
        Type.Number,
        Type.Number
    )
}

function Stringid(left: Token, right: Token,...data:Token[]) {
    const token = left.createEmpty()
    if(data.length>0){
        for (let datum of data) {
            datum.emitError(`too many arguments`,`tid=${datum.tid}`)
        }
    }
    token.properties.instance = (Number(left.reference) & 0xfffff) | Number(right.reference) << 20
    return token
}

export type EffectCheck = {

}