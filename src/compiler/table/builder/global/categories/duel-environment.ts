import {Token} from "../../../symbol-table.js";

export const DuelEnvironment = {
    GetFieldGroupCount: GetFieldGroupCount
}

function GetFieldGroupCount(player: Token, playerSide: Token, opponentSide: Token) {
    if (player.properties.type) {
        console.error(`expected=number actual=${player.properties.type}`)
    } else if (player.properties.instance && typeof player.properties.instance !== 'number') {
        console.error('not a number')
    }
}