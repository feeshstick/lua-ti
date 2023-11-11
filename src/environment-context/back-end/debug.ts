import {Card} from "./card.js";
import {uint16_t, uint32_t, uint64_t, uint8_t} from "./types.js";

export type Debug = {
    Message: () => any;
    AddCard: (
        code: uint32_t,
        owner: uint8_t,
        playerid: uint8_t,
        location: uint16_t,
        sequence: uint16_t,
        position: uint8_t,
        proc: boolean
    ) => any;
    SetPlayerInfo: (
        playerid: uint8_t,
        lp: uint32_t,
        startcount: uint32_t,
        drawcount: uint32_t
    ) => any;
    PreSummon: (
        pcard: Card,
        summon_type: uint32_t,
        summon_location: uint8_t,
        summon_sequence: uint8_t,
        summon_pzone: boolean
    ) => any;
    PreEquip: (equip_card: Card, target: Card) => any;
    PreSetTarget: (t_card: Card, target: Card) => any;
    PreAddCounter: (pcard: Card, countertype: uint16_t, count: uint16_t) => any;
    ReloadFieldBegin: (flag: uint64_t, rule: uint8_t, build: boolean) => any;
    ReloadFieldEnd: () => any;
    PrintStacktrace: () => any;
    CardToStringWrapper: (pcard: Card) => any;
};