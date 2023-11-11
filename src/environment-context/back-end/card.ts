import {int32_t, lua_Integer, uint16_t, uint32_t, uint64_t, uint8_t} from "./types.js";
import {Effect} from "./effect.js";
import {Group} from "./group.js";

export type Card = {
    GetCode: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    GetOriginalCode: (pcard: Card) => any;
    GetOriginalCodeRule: (pcard: Card) => any;
    GetSetCard: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    GetOriginalSetCard: (pcard: Card) => any;
    GetPreviousSetCard: (pcard: Card) => any;
    GetType: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    GetOriginalType: (pcard: Card) => any;
    GetLevel: (pcard: Card) => any;
    GetRank: (pcard: Card) => any;
    GetLink: (pcard: Card) => any;
    GetSynchroLevel: (pcard: Card, scard: Card) => any;
    GetRitualLevel: (pcard: Card, scard: Card) => any;
    GetOriginalLevel: (pcard: Card) => any;
    GetOriginalRank: (pcard: Card) => any;
    IsXyzLevel: (pcard: Card, xyzcard: Card, lv: uint32_t) => any;
    GetLeftScale: (pcard: Card) => any;
    GetOriginalLeftScale: (pcard: Card) => any;
    GetRightScale: (pcard: Card) => any;
    GetOriginalRightScale: (pcard: Card) => any;
    GetLinkMarker: (pcard: Card) => any;
    IsLinkMarker: (pcard: Card, dir: uint32_t) => any;
    GetLinkedGroup: (pcard: Card) => any;
    GetLinkedGroupCount: (pcard: Card) => any;
    GetLinkedZone: (pcard: Card) => any;
    GetFreeLinkedZone: (pcard: Card) => any;
    GetMutualLinkedGroup: (pcard: Card) => any;
    GetMutualLinkedGroupCount: (pcard: Card) => any;
    GetMutualLinkedZone: (pcard: Card) => any;
    IsLinked: (pcard: Card) => any;
    IsExtraLinked: (pcard: Card) => any;
    GetColumnGroup: (pcard: Card, left: uint8_t, right: uint8_t) => any;
    GetColumnGroupCount: (pcard: Card, left: uint8_t, right: uint8_t) => any;
    GetColumnZone: (
        pcard: Card,
        loc: uint16_t,
        left: uint8_t,
        right: uint8_t
    ) => any;
    IsAllColumn: (pcard: Card) => any;
    GetAttribute: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    GetOriginalAttribute: (pcard: Card) => any;
    GetRace: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    GetOriginalRace: (pcard: Card) => any;
    GetAttack: (pcard: Card) => any;
    GetBaseAttack: (pcard: Card) => any;
    GetTextAttack: (pcard: Card) => any;
    GetDefense: (pcard: Card) => any;
    GetBaseDefense: (pcard: Card) => any;
    GetTextDefense: (pcard: Card) => any;
    GetPreviousCodeOnField: (pcard: Card) => any;
    GetPreviousTypeOnField: (pcard: Card) => any;
    GetPreviousLevelOnField: (pcard: Card) => any;
    GetPreviousRankOnField: (pcard: Card) => any;
    GetPreviousAttributeOnField: (pcard: Card) => any;
    GetPreviousRaceOnField: (pcard: Card) => any;
    GetPreviousAttackOnField: (pcard: Card) => any;
    GetPreviousDefenseOnField: (pcard: Card) => any;
    GetOwner: (pcard: Card) => any;
    GetControler: (pcard: Card) => any;
    GetPreviousControler: (pcard: Card) => any;
    GetReason: (pcard: Card) => any;
    GetReasonCard: (pcard: Card) => any;
    GetReasonPlayer: (pcard: Card) => any;
    GetReasonEffect: (pcard: Card) => any;
    SetReason: (pcard: Card, reason: uint32_t, _3: boolean) => any;
    SetReasonCard: (pcard: Card, rcard: Card) => any;
    SetReasonPlayer: (pcard: Card, rp: uint8_t) => any;
    SetReasonEffect: (pcard: Card, re: Effect) => any;
    GetPosition: (pcard: Card) => any;
    GetPreviousPosition: (pcard: Card) => any;
    GetBattlePosition: (pcard: Card) => any;
    GetLocation: (pcard: Card) => any;
    GetPreviousLocation: (pcard: Card) => any;
    GetSequence: (pcard: Card) => any;
    GetPreviousSequence: (pcard: Card) => any;
    GetSummonType: (pcard: Card) => any;
    GetSummonLocation: (pcard: Card) => any;
    GetSummonPlayer: (pcard: Card) => any;
    GetDestination: (pcard: Card) => any;
    GetLeaveFieldDest: (pcard: Card) => any;
    GetTurnID: (pcard: Card) => any;
    GetFieldID: (pcard: Card) => any;
    GetRealFieldID: (pcard: Card) => any;
    GetCardID: (pcard: Card) => any;
    IsOriginalCodeRule: (pcard: Card) => any;
    IsOriginalCode: (pcard: Card) => any;
    IsCode: (pcard: Card) => any;
    IsSummonCode: (
        pcard: Card,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsSetCard: (
        pcard: Card,
        _1: any,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsOriginalSetCard: (pcard: Card) => any;
    IsPreviousSetCard: (pcard: Card) => any;
    IsType: (
        pcard: Card,
        ttype: uint32_t,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsExactType: (
        pcard: Card,
        ttype: uint32_t,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsOriginalType: (pcard: Card, ttype: uint32_t) => any;
    IsLevel: (_1: Card) => any;
    IsRank: (_1: Card) => any;
    IsLink: (_1: Card) => any;
    IsAttack: (pcard: Card) => any;
    IsDefense: (pcard: Card) => any;
    IsRace: (
        pcard: Card,
        trace: uint64_t,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsOriginalRace: (pcard: Card, trace: uint64_t) => any;
    IsAttribute: (
        pcard: Card,
        tattrib: uint32_t,
        scard: Card,
        sumtype: uint64_t,
        playerid: uint8_t
    ) => any;
    IsOriginalAttribute: (pcard: Card, tattrib: uint32_t) => any;
    IsReason: (pcard: Card, treason: uint32_t) => any;
    IsSummonType: (pcard: Card) => any;
    IsSummonLocation: (pcard: Card, loc: uint16_t) => any;
    IsSummonPlayer: (pcard: Card, player: uint8_t) => any;
    IsStatus: (pcard: Card, tstatus: uint32_t) => any;
    IsNotTuner: (pcard: Card, scard: Card, playerid: uint8_t) => any;
    SetStatus: (pcard: Card, tstatus: uint32_t, enable: boolean) => any;
    IsGeminiState: (pcard: Card) => any;
    EnableGeminiState: (pcard: Card) => any;
    SetTurnCounter: (pcard: Card, ct: uint16_t) => any;
    GetTurnCounter: (pcard: Card) => any;
    SetMaterial: (pcard: Card) => any;
    GetMaterial: (pcard: Card) => any;
    GetMaterialCount: (pcard: Card) => any;
    GetEquipGroup: (pcard: Card) => any;
    GetEquipCount: (pcard: Card) => any;
    GetEquipTarget: (pcard: Card) => any;
    GetPreviousEquipTarget: (pcard: Card) => any;
    CheckEquipTarget: (pcard: Card, target: Card) => any;
    CheckUnionTarget: (pcard: Card, target: Card) => any;
    GetUnionCount: (pcard: Card) => any;
    GetOverlayGroup: (pcard: Card) => any;
    GetOverlayCount: (pcard: Card) => any;
    GetOverlayTarget: (pcard: Card) => any;
    CheckRemoveOverlayCard: (
        pcard: Card,
        playerid: uint8_t,
        count: uint16_t,
        reason: uint32_t
    ) => any;
    RemoveOverlayCard: (
        pcard: Card,
        playerid: uint8_t,
        min: uint16_t,
        max: uint16_t,
        reason: uint32_t
    ) => any;
    GetAttackedGroup: (pcard: Card) => any;
    GetAttackedGroupCount: (pcard: Card) => any;
    GetAttackedCount: (pcard: Card) => any;
    GetBattledGroup: (pcard: Card) => any;
    GetBattledGroupCount: (pcard: Card) => any;
    GetAttackAnnouncedCount: (pcard: Card) => any;
    IsDirectAttacked: (pcard: Card) => any;
    SetCardTarget: (pcard: Card, ocard: Card) => any;
    GetCardTarget: (pcard: Card) => any;
    GetFirstCardTarget: (pcard: Card) => any;
    GetCardTargetCount: (pcard: Card) => any;
    IsHasCardTarget: (pcard: Card, rcard: Card) => any;
    CancelCardTarget: (pcard: Card, rcard: Card) => any;
    GetOwnerTarget: (pcard: Card) => any;
    GetOwnerTargetCount: (pcard: Card) => any;
    GetActivateEffect: (pcard: Card) => any;
    CheckActivateEffect: (
        pcard: Card,
        neglect_con: boolean,
        neglect_cost: boolean,
        copy_info: boolean
    ) => any;
    RegisterEffect: (pcard: Card, peffect: Effect, forced: boolean) => any;
    IsHasEffect: (pcard: Card, code: uint32_t, check_player: uint8_t) => any;
    GetCardEffect: (pcard: Card, code: uint32_t) => any;
    ResetEffect: (pcard: Card, code: uint32_t, type: uint32_t) => any;
    GetEffectCount: (pcard: Card, code: uint32_t) => any;
    RegisterFlagEffect: (
        pcard: Card,
        code: uint32_t,
        reset: uint32_t,
        flag: uint32_t,
        count: uint16_t,
        lab: lua_Integer,
        desc: uint64_t
    ) => any;
    GetFlagEffect: (pcard: Card, code: uint32_t) => any;
    ResetFlagEffect: (pcard: Card, code: uint32_t) => any;
    SetFlagEffectLabel: (pcard: Card, code: uint32_t, lab: uint32_t) => any;
    GetFlagEffectLabel: (pcard: Card, code: uint32_t) => any;
    CreateRelation: (pcard: Card, rcard: Card, reset: uint32_t) => any;
    ReleaseRelation: (pcard: Card, rcard: Card) => any;
    CreateEffectRelation: (pcard: Card, peffect: Effect) => any;
    ReleaseEffectRelation: (pcard: Card, peffect: Effect) => any;
    ClearEffectRelation: (pcard: Card) => any;
    IsRelateToEffect: (pcard: Card, peffect: Effect) => any;
    IsRelateToChain: (pcard: Card, chain_count: uint8_t) => any;
    IsRelateToCard: (pcard: Card, rcard: Card) => any;
    IsRelateToBattle: (pcard: Card) => any;
    CopyEffect: (
        pcard: Card,
        code: uint32_t,
        reset: uint32_t,
        count: uint8_t
    ) => any;
    ReplaceEffect: (
        pcard: Card,
        code: uint32_t,
        reset: uint32_t,
        count: uint8_t
    ) => any;
    EnableUnsummonable: (pcard: Card) => any;
    EnableReviveLimit: (pcard: Card) => any;
    CompleteProcedure: (pcard: Card) => any;
    IsDisabled: (pcard: Card) => any;
    IsDestructable: (pcard: Card, peffect: Effect) => any;
    IsSummonableCard: (pcard: Card) => any;
    IsSpecialSummonable: (pcard: Card, sumtype: uint32_t) => any;
    IsFusionSummonableCard: (pcard: Card, summon_type: uint32_t) => any;
    IsSynchroSummonable: () => any;
    IsXyzSummonable: () => any;
    IsLinkSummonable: () => any;
    IsProcedureSummonable: (
        _0: any,
        cardtype: uint32_t,
        sumtype: uint32_t
    ) => any;
    IsSummonable: (
        pcard: Card,
        ign: boolean,
        peffect: Effect,
        minc: uint16_t,
        zone: uint16_t
    ) => any;
    IsMSetable: (
        pcard: Card,
        ign: boolean,
        peffect: Effect,
        minc: uint16_t,
        zone: uint32_t
    ) => any;
    IsSSetable: (pcard: Card, ign: boolean) => any;
    IsCanBeSpecialSummoned: (
        pcard: Card,
        peffect: Effect,
        sumtype: uint32_t,
        sumplayer: uint8_t,
        nocheck: boolean,
        nolimit: boolean,
        sumpos: uint8_t,
        _7: any,
        zone: uint32_t
    ) => any;
    IsAbleToHand: (pcard: Card) => any;
    IsAbleToDeck: (pcard: Card) => any;
    IsAbleToExtra: (pcard: Card) => any;
    IsAbleToGrave: (pcard: Card) => any;
    IsAbleToRemove: (pcard: Card, _1: any, pos: uint8_t, reason: uint32_t) => any;
    IsAbleToHandAsCost: (pcard: Card) => any;
    IsAbleToDeckAsCost: (pcard: Card) => any;
    IsAbleToExtraAsCost: (pcard: Card) => any;
    IsAbleToDeckOrExtraAsCost: (pcard: Card) => any;
    IsAbleToGraveAsCost: (pcard: Card) => any;
    IsAbleToRemoveAsCost: (pcard: Card, pos: uint8_t) => any;
    IsReleasable: (pcard: Card) => any;
    IsReleasableByEffect: (pcard: Card) => any;
    IsDiscardable: (pcard: Card, reason: uint32_t) => any;
    CanAttack: (pcard: Card) => any;
    CanChainAttack: (pcard: Card, ac: uint8_t, monsteronly: boolean) => any;
    IsFaceup: (pcard: Card) => any;
    IsAttackPos: (pcard: Card) => any;
    IsFacedown: (pcard: Card) => any;
    IsDefensePos: (pcard: Card) => any;
    IsPosition: (pcard: Card, pos: uint8_t) => any;
    IsPreviousPosition: (pcard: Card, pos: uint8_t) => any;
    IsControler: (pcard: Card, con: uint8_t) => any;
    IsPreviousControler: (pcard: Card, con: uint8_t) => any;
    IsOnField: (pcard: Card) => any;
    IsLocation: (pcard: Card, loc: uint16_t) => any;
    IsPreviousLocation: (pcard: Card, loc: uint16_t) => any;
    IsLevelBelow: (pcard: Card, lvl: uint32_t) => any;
    IsLevelAbove: (pcard: Card, lvl: uint32_t) => any;
    IsRankBelow: (pcard: Card, rnk: uint32_t) => any;
    IsRankAbove: (pcard: Card, rnk: uint32_t) => any;
    IsLinkBelow: (pcard: Card, lnk: uint32_t) => any;
    IsLinkAbove: (pcard: Card, lnk: uint32_t) => any;
    IsAttackBelow: (pcard: Card, atk: int32_t) => any;
    IsAttackAbove: (pcard: Card, atk: int32_t) => any;
    IsDefenseBelow: (pcard: Card, def: int32_t) => any;
    IsDefenseAbove: (pcard: Card, def: int32_t) => any;
    IsPublic: (pcard: Card) => any;
    IsForbidden: (pcard: Card) => any;
    IsAbleToChangeControler: (pcard: Card) => any;
    IsControlerCanBeChanged: (pcard: Card, ign: boolean, zone: uint32_t) => any;
    AddCounter: (
        pcard: Card,
        countertype: uint16_t,
        count: uint16_t,
        singly: boolean
    ) => any;
    RemoveCounter: (
        pcard: Card,
        rplayer: uint8_t,
        countertype: uint16_t,
        count: uint16_t,
        reason: uint32_t
    ) => any;
    RemoveAllCounters: (pcard: Card) => any;
    GetCounter: (pcard: Card, countertype: uint16_t) => any;
    GetAllCounters: (pcard: Card) => any;
    HasCounters: (pcard: Card) => any;
    EnableCounterPermit: (
        pcard: Card,
        countertype: uint16_t,
        prange: uint16_t
    ) => any;
    SetCounterLimit: (pcard: Card, countertype: uint16_t, limit: uint32_t) => any;
    IsCanChangePosition: (pcard: Card) => any;
    IsCanTurnSet: (pcard: Card) => any;
    IsCanAddCounter: (
        pcard: Card,
        countertype: uint16_t,
        count: uint16_t,
        singly: boolean,
        loc: uint16_t
    ) => any;
    IsCanRemoveCounter: (
        pcard: Card,
        playerid: uint8_t,
        countertype: uint16_t,
        count: uint16_t,
        reason: uint32_t
    ) => any;
    IsCanBeFusionMaterial: (
        pcard: Card,
        fcard: Card,
        summon_type: uint64_t
    ) => any;
    IsCanBeSynchroMaterial: (
        pcard: Card,
        scard: Card,
        tuner: Card,
        playerid: uint8_t
    ) => any;
    IsCanBeRitualMaterial: (pcard: Card, scard: Card) => any;
    IsCanBeXyzMaterial: (
        pcard: Card,
        scard: Card,
        _2: any,
        reason: uint32_t
    ) => any;
    IsCanBeLinkMaterial: (pcard: Card, scard: Card, playerid: uint8_t) => any;
    IsCanBeMaterial: (
        pcard: Card,
        sumtype: uint64_t,
        scard: Card,
        playerid: uint8_t
    ) => any;
    CheckFusionMaterial: (
        pcard: Card,
        pgroup: Group,
        cg: Group,
        chkf: uint32_t
    ) => any;
    CheckFusionSubstitute: (pcard: Card, fcard: Card) => any;
    IsImmuneToEffect: (pcard: Card, peffect: Effect) => any;
    IsCanBeDisabledByEffect: (
        pcard: Card,
        peffect: Effect,
        is_monster_effect: boolean
    ) => any;
    IsCanBeEffectTarget: (pcard: Card, peffect: Effect) => any;
    IsCanBeBattleTarget: (pcard: Card, bcard: Card) => any;
    AddMonsterAttribute: (
        pcard: Card,
        type: uint32_t,
        attribute: uint32_t,
        race: uint64_t,
        level: uint32_t,
        atk: int32_t,
        def: int32_t
    ) => any;
    AddMonsterAttributeComplete: () => any;
    CancelToGrave: (pcard: Card, cancel: boolean) => any;
    GetTributeRequirement: (pcard: Card) => any;
    GetBattleTarget: (pcard: Card) => any;
    GetAttackableTarget: (pcard: Card) => any;
    SetHint: (pcard: Card, type: uint8_t, value: uint64_t) => any;
    ReverseInDeck: (pcard: Card) => any;
    SetUniqueOnField: (
        pcard: Card,
        _2: uint8_t,
        _3: uint8_t,
        unique_code: uint32_t,
        location: uint8_t
    ) => any;
    CheckUniqueOnField: (
        pcard: Card,
        check_player: uint8_t,
        check_location: uint8_t,
        icard: Card
    ) => any;
    ResetNegateEffect: (pcard: Card) => any;
    AssumeProperty: (pcard: Card, assume: uint32_t, _3: uint64_t) => any;
    SetSPSummonOnce: (pcard: Card, spsummon_code: uint32_t) => any;
    lua_name: (pcard: Card) => any;
    Setcode: (pcard: Card, _2: uint16_t) => any;
    Recreate: (
        pcard: Card,
        code: uint32_t,
        _2: any,
        //originally _4 duplicate identifier?
        _3: uint16_t,
        _4: any,
        _5: any,
        _6: any,
        _7: any,
        _8: any,
        _9: any,
        _10: any,
        _11: any,
        _12: any,
        _14: boolean
    ) => any;
    Cover: (pcard: Card, cover: uint32_t) => any;
};