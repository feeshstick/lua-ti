import {int32_t, size_t, uint16_t, uint32_t, uint8_t} from "./types.js";
import {Card} from "./card.js";

export type Group = {
    CreateGroup: () => any;
    Clone: (pgroup: Group) => any;
    DeleteGroup: (pgroup: Group) => any;
    KeepAlive: (pgroup: Group) => any;
    Clear: (pgroup: Group) => any;
    AddCard: (pgroup: Group) => any;
    RemoveCard: (pgroup: Group) => any;
    GetNext: (pgroup: Group) => any;
    GetFirst: (pgroup: Group) => any;
    TakeatPos: (pgroup: Group, pos: size_t) => any;
    GetCount: (pgroup: Group) => any;
    Filter: (pgroup: Group, findex: Function, pexgroup: Group) => any;
    Match: (pgroup: Group, findex: Function, pexgroup: Group) => any;
    FilterCount: (pgroup: Group, findex: Function, pexgroup: Group) => any;
    FilterSelect: (
        pgroup: Group,
        playerid: uint8_t,
        findex: Function,
        min: uint16_t,
        max: uint16_t
    ) => any;
    Select: (
        pgroup: Group,
        playerid: uint8_t,
        min: uint16_t,
        max: uint16_t
    ) => any;
    SelectUnselect: (
        pgroup1: Group,
        pgroup2: Group,
        playerid: uint8_t,
        finishable: boolean,
        cancelable: boolean,
        min: uint16_t,
        max: uint16_t
    ) => any;
    RandomSelect: (pgroup: Group, playerid: uint8_t, count: uint32_t) => any;
    IsExists: (
        pgroup: Group,
        findex: Function,
        count: uint16_t,
        pexgroup: Group
    ) => any;
    CheckWithSumEqual: (
        pgroup: Group,
        findex: Function,
        acc: uint32_t,
        min: int32_t,
        max: int32_t
    ) => any;
    SelectWithSumEqual: (
        pgroup: Group,
        playerid: uint8_t,
        findex: Function,
        acc: uint32_t,
        min: int32_t,
        max: int32_t
    ) => any;
    CheckWithSumGreater: (pgroup: Group, findex: Function, acc: uint32_t) => any;
    SelectWithSumGreater: (
        pgroup: Group,
        playerid: uint8_t,
        findex: Function,
        acc: uint32_t
    ) => any;
    GetMinGroup: (pgroup: Group, findex: Function) => any;
    GetMaxGroup: (pgroup: Group, findex: Function) => any;
    GetSum: (pgroup: Group, findex: Function) => any;
    GetBitwiseAnd: (pgroup: Group, findex: Function) => any;
    GetBitwiseOr: (pgroup: Group, findex: Function) => any;
    GetClass: (pgroup: Group, findex: Function) => any;
    GetClassCount: (pgroup: Group, findex: Function) => any;
    Remove: (pgroup: Group, findex: Function, pexception: Card) => any;
    __band: () => any;
    __add: () => any;
    __sub: (pgroup1: Group) => any;
    __len: (pgroup: Group) => any;
    __eq: (pgroup: Group, sgroup: Group) => any;
    Equal: (pgroup: Group, sgroup: Group) => any;
    __lt: (pgroup: Group, sgroup: Group) => any;
    __le: (pgroup: Group, sgroup: Group) => any;
    IsContains: (pgroup: Group, pcard: Card) => any;
    SearchCard: (pgroup: Group, findex: Function) => any;
    Split: (pgroup: Group, findex: Function, pexgroup: Group) => any;
    Includes: (pgroup1: Group, pgroup2: Group) => any;
    GetBinClassCount: (pgroup: Group, findex: Function) => any;
};