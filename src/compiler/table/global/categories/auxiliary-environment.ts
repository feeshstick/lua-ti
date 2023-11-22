import {Token} from "../../symbol-table.js";

export const AuxiliaryEnvironment = {
    Stringid: Stringid
}

function Stringid(left: Token, right: Token) {
    const token = new Token()
    token.properties.instance = (Number(left.reference) & 0xfffff) | Number(right.reference) << 20
    return token
}