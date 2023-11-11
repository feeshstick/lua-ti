import {int32_t, Lua_obj, uint16_t, uint32_t, uint64_t, uint8_t} from "./types.js";
import {Card} from "./card.js";

export type Effect = {
    CreateEffect: (pcard: Card) => any;
    GlobalEffect: () => any;
    Clone: (peffect: Effect) => any;
    Reset: (peffect: Effect) => any;
    GetFieldID: (peffect: Effect) => any;
    SetDescription: (peffect: Effect, description: uint64_t) => any;
    SetCode: (peffect: Effect, code: uint32_t) => any;
    SetRange: (peffect: Effect, range: uint16_t) => any;
    SetTargetRange: (
        peffect: Effect,
        s_range: uint16_t,
        o_range: uint16_t
    ) => any;
    SetAbsoluteRange: (
        peffect: Effect,
        playerid: uint8_t,
        s: uint16_t,
        o: uint16_t
    ) => any;
    SetCountLimit: (
        peffect: Effect,
        count: uint8_t,
        code: uint32_t,
        flag: uint8_t
    ) => any;
    SetReset: (peffect: Effect, v: uint32_t, c: uint16_t) => any;
    SetType: (peffect: Effect, v: uint16_t) => any;
    SetProperty: (peffect: Effect, v1: uint32_t, v2: uint32_t) => any;
    SetLabel: (peffect: Effect) => any;
    SetLabelObject: (peffect: Effect, _2: Lua_obj) => any;
    SetCategory: (peffect: Effect, v: uint32_t) => any;
    SetHintTiming: (peffect: Effect, vs: uint32_t) => any;
    SetCondition: (peffect: Effect, findex: Function) => any;
    SetTarget: (peffect: Effect, findex: Function) => any;
    SetCost: (peffect: Effect, findex: Function) => any;
    SetValue: (peffect: Effect, value: int32_t) => any;
    SetOperation: (peffect: Effect, findex: Function) => any;
    SetOwnerPlayer: (peffect: Effect, p: uint8_t) => any;
    GetDescription: (peffect: Effect) => any;
    GetCode: (peffect: Effect) => any;
    GetRange: (peffect: Effect) => any;
    GetTargetRange: (peffect: Effect) => any;
    GetCountLimit: (peffect: Effect) => any;
    GetReset: (peffect: Effect) => any;
    GetType: (peffect: Effect) => any;
    GetProperty: (peffect: Effect) => any;
    GetLabel: (peffect: Effect) => any;
    GetLabelObject: (peffect: Effect) => any;
    GetCategory: (peffect: Effect) => any;
    GetOwner: (peffect: Effect) => any;
    GetHandler: (peffect: Effect) => any;
    GetOwnerPlayer: (peffect: Effect) => any;
    GetHandlerPlayer: (peffect: Effect) => any;
    GetHintTiming: (peffect: Effect) => any;
    GetCondition: (peffect: Effect) => any;
    GetTarget: (peffect: Effect) => any;
    GetCost: (peffect: Effect) => any;
    GetValue: (peffect: Effect) => any;
    GetOperation: (peffect: Effect) => any;
    GetActiveType: (peffect: Effect) => any;
    IsActiveType: (peffect: Effect, _2: uint32_t) => any;
    IsHasProperty: (peffect: Effect, tflag1: uint32_t, tflag2: uint32_t) => any;
    IsHasCategory: (peffect: Effect, _2: uint32_t) => any;
    IsHasType: (peffect: Effect, _2: uint16_t) => any;
    IsActivatable: (
        peffect: Effect,
        playerid: uint8_t,
        neglect_loc: boolean,
        neglect_target: boolean
    ) => any;
    IsActivated: (peffect: Effect) => any;
    GetActivateLocation: (peffect: Effect) => any;
    GetActivateSequence: (peffect: Effect) => any;
    CheckCountLimit: (peffect: Effect, p: uint8_t) => any;
    UseCountLimit: (
        peffect: Effect,
        p: uint8_t,
        count: uint32_t,
        oath_only: boolean
    ) => any;
};