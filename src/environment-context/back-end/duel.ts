import {int32_t, int64_t, int8_t, Lua_obj, uint16_t, uint32_t, uint64_t, uint8_t} from "./types.js";
import {Effect} from "./effect.js";
import {Card} from "./card.js";
import {Group} from "./group.js";

export type Duel = {
    EnableGlobalFlag: (_1: uint32_t) => any;
    GetLP: (p: int8_t) => any;
    SetLP: (p: int8_t, lp: int32_t) => any;
    GetTurnPlayer: () => any;
    GetTurnCount: (playerid: uint8_t) => any;
    GetDrawCount: (playerid: uint8_t) => any;
    RegisterEffect: (peffect: Effect, playerid: uint8_t) => any;
    RegisterFlagEffect: (
        playerid: uint8_t,
        code: uint32_t,
        reset: uint32_t,
        flag: uint32_t,
        count: uint16_t,
        lab: uint32_t
    ) => any;
    GetFlagEffect: (playerid: uint8_t, code: uint32_t) => any;
    ResetFlagEffect: (playerid: uint8_t, code: uint32_t) => any;
    SetFlagEffectLabel: (playerid: uint8_t, code: uint32_t, lab: int32_t) => any;
    GetFlagEffectLabel: (playerid: uint8_t, code: uint32_t) => any;
    Destroy: (_0: any, reason: uint32_t, dest: uint16_t) => any;
    Remove: (_0: any, pos: uint8_t, reason: uint32_t, playerid: uint8_t) => any;
    SendtoGrave: (_0: any, reason: uint32_t, playerid: uint8_t) => any;
    Summon: (
        playerid: uint8_t,
        pcard: Card,
        ignore_count: boolean,
        peffect: Effect,
        min_tribute: uint8_t,
        zone: uint32_t
    ) => any;
    SpecialSummonRule: (playerid: uint8_t, pcard: Card, sumtype: uint32_t) => any;
    SynchroSummon: () => any;
    XyzSummon: () => any;
    LinkSummon: () => any;
    ProcedureSummon: (_0: any, _1: any, sumtype: uint32_t) => any;
    PendulumSummon: () => any;
    ProcedureSummonGroup: (_0: any, sumtype: uint32_t) => any;
    MSet: (
        playerid: uint8_t,
        pcard: Card,
        ignore_count: boolean,
        peffect: Effect,
        min_tribute: uint8_t,
        zone: uint32_t
    ) => any;
    SSet: (playerid: uint8_t, _1: any, _2: any, confirm: boolean) => any;
    CreateToken: (playerid: uint8_t, code: uint32_t) => any;
    SpecialSummon: (
        _0: any,
        sumtype: uint32_t,
        sumplayer: uint8_t,
        playerid: uint8_t,
        nocheck: boolean,
        nolimit: boolean,
        positions: uint8_t,
        zone: uint32_t
    ) => any;
    SpecialSummonStep: (
        pcard: Card,
        sumtype: uint32_t,
        sumplayer: uint8_t,
        playerid: uint8_t,
        nocheck: boolean,
        nolimit: boolean,
        positions: uint8_t,
        zone: uint32_t
    ) => any;
    SpecialSummonComplete: () => any;
    SendtoHand: (_0: any, playerid: uint8_t, reason: uint32_t) => any;
    SendtoDeck: (
        _0: any,
        playerid: uint8_t,
        sequence: int32_t,
        reason: uint32_t
    ) => any;
    SendtoExtraP: (_0: any, playerid: uint8_t, reason: uint32_t) => any;
    Sendto: (
        _0: any,
        location: uint16_t,
        reason: uint32_t,
        pos: uint8_t,
        playerid: uint8_t,
        sequence: uint32_t
    ) => any;
    RemoveCards: () => any;
    GetOperatedGroup: () => any;
    IsCanAddCounter: (
        playerid: uint8_t,
        countertype: uint16_t,
        count: uint32_t,
        pcard: Card
    ) => any;
    RemoveCounter: (
        rplayer: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        countertype: uint16_t,
        count: uint32_t,
        reason: uint32_t
    ) => any;
    IsCanRemoveCounter: (
        rplayer: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        countertype: uint16_t,
        count: uint32_t,
        reason: uint32_t
    ) => any;
    GetCounter: (
        playerid: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        countertype: uint16_t
    ) => any;
    ChangePosition: (
        _0: any,
        au: uint8_t,
        _2: any,
        _3: any,
        _4: any,
        _6: boolean
    ) => any;
    Release: (_0: any, reason: uint32_t) => any;
    MoveToField: (
        pcard: Card,
        move_player: uint8_t,
        playerid: uint8_t,
        destination: uint16_t,
        positions: uint8_t,
        enable: boolean,
        zone: uint32_t
    ) => any;
    ReturnToField: (pcard: Card, _1: any, zone: uint32_t) => any;
    MoveSequence: (pcard: Card, seq: uint8_t) => any;
    SwapSequence: (pcard1: Card, pcard2: Card) => any;
    Activate: (peffect: Effect) => any;
    SetChainLimit: (f: Function) => any;
    SetChainLimitTillChainEnd: (f: Function) => any;
    GetChainMaterial: (playerid: uint8_t) => any;
    ConfirmDecktop: (playerid: uint8_t, count: uint32_t) => any;
    ConfirmExtratop: (playerid: uint8_t, count: uint32_t) => any;
    ConfirmCards: (playerid: uint8_t) => any;
    SortDecktop: (
        sort_player: uint8_t,
        target_player: uint8_t,
        count: uint32_t
    ) => any;
    SortDeckbottom: (
        sort_player: uint8_t,
        target_player: uint8_t,
        count: uint32_t
    ) => any;
    CheckEvent: (ev: uint32_t, get_info: boolean) => any;
    RaiseEvent: (
        _0: any,
        code: uint32_t,
        peffect: Effect,
        r: uint32_t,
        rp: uint8_t,
        ep: uint8_t,
        ev: uint32_t
    ) => any;
    RaiseSingleEvent: (
        pcard: Card,
        code: uint32_t,
        peffect: Effect,
        r: uint32_t,
        rp: uint8_t,
        ep: uint8_t,
        ev: uint32_t
    ) => any;
    CheckTiming: (tm: uint32_t) => any;
    GetEnvironment: () => any;
    IsEnvironment: (code: uint32_t, playerid: uint8_t, loc: uint16_t) => any;
    Win: (playerid: uint8_t, reason: uint32_t) => any;
    Draw: (playerid: uint8_t, count: uint32_t, reason: uint32_t) => any;
    Damage: (
        playerid: uint8_t,
        amount: int64_t,
        reason: uint32_t,
        is_step: boolean
    ) => any;
    Recover: (
        playerid: uint8_t,
        amount: int64_t,
        reason: uint32_t,
        is_step: boolean
    ) => any;
    RDComplete: () => any;
    Equip: (
        playerid: uint8_t,
        equip_card: Card,
        target: Card,
        up: boolean,
        step: boolean
    ) => any;
    EquipComplete: () => any;
    GetControl: (
        _0: any,
        playerid: uint8_t,
        reset_phase: uint16_t,
        reset_count: uint8_t,
        zone: uint32_t
    ) => any;
    SwapControl: (
        obj1: Lua_obj,
        obj2: Lua_obj,
        reset_phase: uint16_t,
        reset_count: uint8_t
    ) => any;
    CheckLPCost: (playerid: uint8_t, cost: uint32_t) => any;
    PayLPCost: (playerid: uint8_t, cost: uint32_t) => any;
    DiscardDeck: (playerid: uint8_t, count: uint16_t, reason: uint32_t) => any;
    DiscardHand: (
        playerid: uint8_t,
        findex: Function,
        min: uint16_t,
        max: uint16_t,
        reason: uint32_t,
        pexgroup: Group
    ) => any;
    DisableShuffleCheck: (disable: boolean) => any;
    DisableSelfDestroyCheck: (disable: boolean) => any;
    ShuffleDeck: (playerid: uint8_t) => any;
    ShuffleExtra: (playerid: uint8_t) => any;
    ShuffleHand: (playerid: uint8_t) => any;
    ShuffleSetCard: (pgroup: Group) => any;
    ChangeAttacker: (new_attacker: Card, ignore_count: boolean) => any;
    ChangeAttackTarget: (target: Card, ignore: boolean) => any;
    AttackCostPaid: (paid: uint8_t) => any;
    ForceAttack: (attacker: Card, attack_target: Card) => any;
    CalculateDamage: (
        attacker: Card,
        attack_target: Card,
        new_attack: boolean
    ) => any;
    GetBattleDamage: (playerid: uint8_t) => any;
    ChangeBattleDamage: (playerid: uint8_t, dam: uint32_t, check: boolean) => any;
    ChangeTargetCard: (count: uint8_t, pgroup: Group) => any;
    ChangeTargetPlayer: (count: uint8_t, playerid: uint8_t) => any;
    ChangeTargetParam: (count: uint8_t, param: int32_t) => any;
    BreakEffect: () => any;
    ChangeChainOperation: (_1: uint8_t, f: Function) => any;
    NegateActivation: (_1: uint8_t) => any;
    NegateEffect: (_1: uint8_t) => any;
    NegateRelatedChain: (pcard: Card, reset_flag: uint32_t) => any;
    NegateSummon: () => any;
    IncreaseSummonedCount: (pcard: Card) => any;
    CheckSummonedCount: (pcard: Card) => any;
    GetLocationCount: (
        playerid: uint8_t,
        location: uint8_t,
        _2: any,
        reason: uint32_t,
        zone: uint32_t
    ) => any;
    GetMZoneCount: (
        playerid: uint8_t,
        _1: any,
        _2: any,
        reason: uint32_t,
        zone: uint32_t
    ) => any;
    GetLocationCountFromEx: (
        playerid: uint8_t,
        _1: any,
        _2: any,
        type: uint32_t,
        zone: uint32_t
    ) => any;
    GetUsableMZoneCount: (playerid: uint8_t) => any;
    GetLinkedGroup: (
        rplayer: uint8_t,
        location1: uint16_t,
        location2: uint16_t
    ) => any;
    GetLinkedGroupCount: (
        rplayer: uint8_t,
        location1: uint16_t,
        location2: uint16_t
    ) => any;
    GetLinkedZone: (playerid: uint8_t) => any;
    GetFreeLinkedZone: (playerid: uint8_t) => any;
    GetFieldCard: (
        playerid: uint8_t,
        location: uint16_t,
        sequence: uint32_t
    ) => any;
    CheckLocation: (
        playerid: uint8_t,
        location: uint16_t,
        sequence: uint32_t
    ) => any;
    GetCurrentChain: (real: boolean) => any;
    GetChainInfo: (ch: uint8_t) => any;
    GetChainEvent: (count: uint8_t) => any;
    GetFirstTarget: () => any;
    GetCurrentPhase: () => any;
    SkipPhase: (
        playerid: uint8_t,
        phase: uint16_t,
        reset: uint32_t,
        count: uint16_t,
        value: uint32_t
    ) => any;
    IsAttackCostPaid: () => any;
    IsDamageCalculated: () => any;
    GetAttacker: () => any;
    GetAttackTarget: () => any;
    GetBattleMonster: (playerid: uint8_t) => any;
    NegateAttack: () => any;
    ChainAttack: (chain_attack_target: Card) => any;
    Readjust: () => any;
    AdjustInstantly: (pcard: Card) => any;
    GetFieldGroup: (
        playerid: uint8_t,
        location1: uint16_t,
        location2: uint16_t
    ) => any;
    GetFieldGroupCount: (
        playerid: uint8_t,
        location1: uint16_t,
        location2: uint16_t
    ) => any;
    GetDecktopGroup: (playerid: uint8_t, count: uint32_t) => any;
    GetDeckbottomGroup: (playerid: uint8_t, count: uint32_t) => any;
    GetExtraTopGroup: (playerid: uint8_t, count: uint32_t) => any;
    GetMatchingGroup: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        pexgroup: Group
    ) => any;
    GetMatchingGroupCount: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        pexgroup: Group
    ) => any;
    GetFirstMatchingCard: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        pexgroup: Group
    ) => any;
    IsExistingMatchingCard: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        fcount: uint32_t,
        pexgroup: Group
    ) => any;
    SelectMatchingCard: (
        playerid: uint8_t,
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        min: uint16_t,
        max: uint16_t
    ) => any;
    SelectCardsFromCodes: (
        playerid: uint8_t,
        min: uint16_t,
        max: uint16_t,
        cancelable: boolean,
        ret_index: boolean
    ) => any;
    GetReleaseGroup: (playerid: uint8_t, hand: boolean, oppo: boolean) => any;
    GetReleaseGroupCount: (playerid: uint8_t, hand: boolean, oppo: boolean) => any;
    CheckReleaseGroup: () => any;
    CheckReleaseGroupEx: () => any;
    SelectReleaseGroup: () => any;
    SelectReleaseGroupEx: () => any;
    GetTributeGroup: (target: Card) => any;
    GetTributeCount: (target: Card, mg: Group, ex: boolean) => any;
    CheckTribute: (
        target: Card,
        min: uint16_t,
        _2: any,
        mg: Group,
        _4: any,
        zone: uint32_t
    ) => any;
    SelectTribute: (
        playerid: uint8_t,
        target: Card,
        min: uint16_t,
        max: uint16_t,
        mg: Group,
        _5: any,
        zone: uint32_t,
        cancelable: boolean
    ) => any;
    GetTargetCount: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        pexgroup: Group
    ) => any;
    IsExistingTarget: (
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        count: uint16_t,
        pexgroup: Group
    ) => any;
    SelectTarget: (
        playerid: uint8_t,
        findex: Function,
        self: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        min: uint16_t,
        max: uint16_t
    ) => any;
    SelectFusionMaterial: (
        playerid: uint8_t,
        pcard: Card,
        pgroup: Group,
        cg: Group,
        chkf: uint32_t
    ) => any;
    SetFusionMaterial: (pgroup: Group) => any;
    GetRitualMaterial: (playerid: uint8_t, check_level: boolean) => any;
    ReleaseRitualMaterial: (pgroup: Group) => any;
    GetFusionMaterial: (playerid: uint8_t) => any;
    IsSummonCancelable: () => any;
    SetSelectedCard: () => any;
    GrabSelectedCard: () => any;
    SetTargetCard: () => any;
    ClearTargetCard: () => any;
    SetTargetPlayer: (playerid: uint8_t) => any;
    SetTargetParam: (param: uint32_t) => any;
    SetOperationInfo: (
        ct: uint32_t,
        cate: uint32_t,
        pobj: Lua_obj,
        count: uint8_t,
        playerid: uint8_t,
        param: int32_t
    ) => any;
    GetOperationInfo: (ct: uint32_t, cate: uint32_t) => any;
    SetPossibleOperationInfo: (
        ct: uint32_t,
        cate: uint32_t,
        pobj: Lua_obj,
        count: uint8_t,
        playerid: uint8_t,
        param: int32_t
    ) => any;
    GetPossibleOperationInfo: (ct: uint32_t, cate: uint32_t) => any;
    GetOperationCount: (ct: uint32_t) => any;
    ClearOperationInfo: (ct: uint32_t) => any;
    Overlay: (target: Card, _1: any, send_materials_to_grave: boolean) => any;
    GetOverlayGroup: (
        rplayer: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        targetsgroup: Group
    ) => any;
    GetOverlayCount: (
        rplayer: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        pgroup: Group
    ) => any;
    CheckRemoveOverlayCard: (
        playerid: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        count: uint16_t,
        reason: uint32_t,
        pgroup: Group
    ) => any;
    RemoveOverlayCard: (
        playerid: uint8_t,
        self: uint8_t,
        oppo: uint8_t,
        min: uint16_t,
        max: uint16_t,
        reason: uint32_t,
        pgroup: Group
    ) => any;
    Hint: (htype: uint8_t, playerid: uint8_t, desc: uint64_t) => any;
    HintSelection: (_0: any, selection: boolean) => any;
    SelectEffectYesNo: (playerid: uint8_t, pcard: Card, desc: uint64_t) => any;
    SelectYesNo: (playerid: uint8_t, desc: uint64_t) => any;
    SelectOption: (playerid: uint8_t, sel_hint: boolean) => any;
    SelectPosition: (playerid: uint8_t, pcard: Card, positions: uint8_t) => any;
    SelectDisableField: (
        playerid: uint8_t,
        count: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        _4: any,
        all_field: boolean
    ) => any;
    SelectFieldZone: (
        playerid: uint8_t,
        count: uint8_t,
        location1: uint16_t,
        location2: uint16_t,
        filter: uint32_t
    ) => any;
    AnnounceRace: (playerid: uint8_t, count: uint8_t, available: uint64_t) => any;
    AnnounceAttribute: (
        playerid: uint8_t,
        count: uint8_t,
        available: uint32_t
    ) => any;
    AnnounceNumberRange: (playerid: uint8_t, min: uint32_t, max: uint32_t) => any;
    AnnounceCard: (playerid: uint8_t, ttype: uint32_t) => any;
    AnnounceType: (playerid: uint8_t) => any;
    AnnounceNumber: (playerid: uint8_t) => any;
    AnnounceCoin: (playerid: uint8_t, sel_hint: boolean) => any;
    TossCoin: (playerid: uint8_t, count: uint8_t) => any;
    TossDice: (playerid: uint8_t, count1: uint8_t, count2: uint8_t) => any;
    RockPaperScissors: (repeat: boolean) => any;
    GetCoinResult: () => any;
    GetDiceResult: () => any;
    SetCoinResult: () => any;
    SetDiceResult: () => any;
    IsDuelType: (duel_type: uint64_t) => any;
    GetDuelType: () => any;
    IsPlayerAffectedByEffect: (playerid: uint8_t, code: uint32_t) => any;
    GetPlayerEffect: (playerid: uint8_t, code: uint32_t) => any;
    IsPlayerCanDraw: (playerid: uint8_t, count: uint32_t) => any;
    IsPlayerCanDiscardDeck: (playerid: uint8_t, count: uint32_t) => any;
    IsPlayerCanDiscardDeckAsCost: (playerid: uint8_t, count: uint32_t) => any;
    IsPlayerCanSummon: (playerid: uint8_t, sumtype: uint32_t, pcard: Card) => any;
    CanPlayerSetMonster: (
        playerid: uint8_t,
        sumtype: uint32_t,
        pcard: Card
    ) => any;
    CanPlayerSetSpellTrap: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanSpecialSummon: (
        playerid: uint8_t,
        sumtype: uint32_t,
        sumpos: uint8_t,
        toplayer: uint8_t,
        pcard: Card
    ) => any;
    IsPlayerCanFlipSummon: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanSpecialSummonMonster: (
        playerid: uint8_t,
        code: uint32_t,
        _3: uint16_t,
        type: uint32_t,
        attack: int32_t,
        defense: int32_t,
        level: uint32_t,
        race: uint64_t,
        attribute: uint32_t,
        pos: uint8_t,
        _10: any,
        sumtype: uint32_t
    ) => any;
    IsPlayerCanSpecialSummonCount: (playerid: uint8_t, count: uint32_t) => any;
    IsPlayerCanRelease: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanRemove: (playerid: uint8_t, pcard: Card, reason: uint32_t) => any;
    IsPlayerCanSendtoHand: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanSendtoGrave: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanSendtoDeck: (playerid: uint8_t, pcard: Card) => any;
    IsPlayerCanAdditionalSummon: (playerid: uint8_t) => any;
    IsPlayerCanPendulumSummon: () => any;
    IsPlayerCanProcedureSummonGroup: (_0: any, sumtype: uint32_t) => any;
    IsChainNegatable: () => any;
    IsChainDisablable: (chaincount: uint8_t) => any;
    IsChainSolving: () => any;
    CheckChainTarget: (chaincount: uint8_t, pcard: Card) => any;
    CheckChainUniqueness: () => any;
    GetActivityCount: (playerid: uint8_t) => any;
    CheckPhaseActivity: () => any;
    AddCustomActivityCounter: (
        counter_id: uint32_t,
        activity_type: uint8_t,
        findex: Function
    ) => any;
    GetCustomActivityCount: (
        counter_id: uint32_t,
        playerid: uint8_t,
        activity_type: uint8_t
    ) => any;
    GetBattledCount: (playerid: uint8_t) => any;
    IsAbleToEnterBP: () => any;
    // originally max: uint32_t, max: uint32_t; duplicate?
    GetRandomNumber: (min: uint32_t, max: uint32_t) => any;
    AssumeReset: () => any;
    GetCardFromCardID: (id: uint32_t) => any;
    LoadScript: (_0: any, check_cache: boolean) => any;
    TagSwap: (playerid: uint8_t) => any;
    GetPlayersCount: (playerid: uint8_t) => any;
    SwapDeckAndGrave: (playerid: uint8_t) => any;
    MajesticCopy: (
        pcard: Card,
        ccard: Card,
        resv: uint32_t,
        resc: uint16_t
    ) => any;
    GetStartingHand: (playerid: uint8_t) => any;
    GetCardSetcodeFromCode: (code: uint32_t) => any;
};