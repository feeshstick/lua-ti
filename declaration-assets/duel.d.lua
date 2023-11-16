---@class Duel
Duel = {}

---@name EnableGlobalFlag
---@description EnableGlobalFlag
---@see EnableGlobalFlag
---@param _1 number
---@return any
function Duel.EnableGlobalFlag(_1) end

---@name GetLP
---@description GetLP
---@see GetLP
---@param p number
---@return any
function Duel.GetLP(p) end

---@name SetLP
---@description SetLP
---@see SetLP
---@param p number
---@param lp number
---@return any
function Duel.SetLP(p,lp) end

---@name GetTurnPlayer
---@description GetTurnPlayer
---@see GetTurnPlayer
---@return any
function Duel.GetTurnPlayer() end

---@name GetTurnCount
---@description GetTurnCount
---@see GetTurnCount
---@param playerid number
---@return any
function Duel.GetTurnCount(playerid) end

---@name GetDrawCount
---@description GetDrawCount
---@see GetDrawCount
---@param playerid number
---@return any
function Duel.GetDrawCount(playerid) end

---@name RegisterEffect
---@description RegisterEffect
---@see RegisterEffect
---@param peffect Effect
---@param playerid number
---@return any
function Duel.RegisterEffect(peffect,playerid) end

---@name RegisterFlagEffect
---@description RegisterFlagEffect
---@see RegisterFlagEffect
---@param playerid number
---@param code number
---@param reset number
---@param flag number
---@param count number
---@param lab number
---@return any
function Duel.RegisterFlagEffect(playerid,code,reset,flag,count,lab) end

---@name GetFlagEffect
---@description GetFlagEffect
---@see GetFlagEffect
---@param playerid number
---@param code number
---@return any
function Duel.GetFlagEffect(playerid,code) end

---@name ResetFlagEffect
---@description ResetFlagEffect
---@see ResetFlagEffect
---@param playerid number
---@param code number
---@return any
function Duel.ResetFlagEffect(playerid,code) end

---@name SetFlagEffectLabel
---@description SetFlagEffectLabel
---@see SetFlagEffectLabel
---@param playerid number
---@param code number
---@param lab number
---@return any
function Duel.SetFlagEffectLabel(playerid,code,lab) end

---@name GetFlagEffectLabel
---@description GetFlagEffectLabel
---@see GetFlagEffectLabel
---@param playerid number
---@param code number
---@return any
function Duel.GetFlagEffectLabel(playerid,code) end

---@name Destroy
---@description Destroy
---@see Destroy
---@param _0 any
---@param reason number
---@param dest number
---@return any
function Duel.Destroy(_0,reason,dest) end

---@name Remove
---@description Remove
---@see Remove
---@param _0 any
---@param pos number
---@param reason number
---@param playerid number
---@return any
function Duel.Remove(_0,pos,reason,playerid) end

---@name SendtoGrave
---@description SendtoGrave
---@see SendtoGrave
---@param _0 any
---@param reason number
---@param playerid number
---@return any
function Duel.SendtoGrave(_0,reason,playerid) end

---@name Summon
---@description Summon
---@see Summon
---@param playerid number
---@param pcard Card
---@param ignore_count boolean
---@param peffect Effect
---@param min_tribute number
---@param zone number
---@return any
function Duel.Summon(playerid,pcard,ignore_count,peffect,min_tribute,zone) end

---@name SpecialSummonRule
---@description SpecialSummonRule
---@see SpecialSummonRule
---@param playerid number
---@param pcard Card
---@param sumtype number
---@return any
function Duel.SpecialSummonRule(playerid,pcard,sumtype) end

---@name SynchroSummon
---@description SynchroSummon
---@see SynchroSummon
---@return any
function Duel.SynchroSummon() end

---@name XyzSummon
---@description XyzSummon
---@see XyzSummon
---@return any
function Duel.XyzSummon() end

---@name LinkSummon
---@description LinkSummon
---@see LinkSummon
---@return any
function Duel.LinkSummon() end

---@name ProcedureSummon
---@description ProcedureSummon
---@see ProcedureSummon
---@param _0 any
---@param _1 any
---@param sumtype number
---@return any
function Duel.ProcedureSummon(_0,_1,sumtype) end

---@name PendulumSummon
---@description PendulumSummon
---@see PendulumSummon
---@return any
function Duel.PendulumSummon() end

---@name ProcedureSummonGroup
---@description ProcedureSummonGroup
---@see ProcedureSummonGroup
---@param _0 any
---@param sumtype number
---@return any
function Duel.ProcedureSummonGroup(_0,sumtype) end

---@name MSet
---@description MSet
---@see MSet
---@param playerid number
---@param pcard Card
---@param ignore_count boolean
---@param peffect Effect
---@param min_tribute number
---@param zone number
---@return any
function Duel.MSet(playerid,pcard,ignore_count,peffect,min_tribute,zone) end

---@name SSet
---@description SSet
---@see SSet
---@param playerid number
---@param _1 any
---@param _2 any
---@param confirm boolean
---@return any
function Duel.SSet(playerid,_1,_2,confirm) end

---@name CreateToken
---@description CreateToken
---@see CreateToken
---@param playerid number
---@param code number
---@return any
function Duel.CreateToken(playerid,code) end

---@name SpecialSummon
---@description SpecialSummon
---@see SpecialSummon
---@param _0 any
---@param sumtype number
---@param sumplayer number
---@param playerid number
---@param nocheck boolean
---@param nolimit boolean
---@param positions number
---@param zone number
---@return any
function Duel.SpecialSummon(_0,sumtype,sumplayer,playerid,nocheck,nolimit,positions,zone) end

---@name SpecialSummonStep
---@description SpecialSummonStep
---@see SpecialSummonStep
---@param pcard Card
---@param sumtype number
---@param sumplayer number
---@param playerid number
---@param nocheck boolean
---@param nolimit boolean
---@param positions number
---@param zone number
---@return any
function Duel.SpecialSummonStep(pcard,sumtype,sumplayer,playerid,nocheck,nolimit,positions,zone) end

---@name SpecialSummonComplete
---@description SpecialSummonComplete
---@see SpecialSummonComplete
---@return any
function Duel.SpecialSummonComplete() end

---@name SendtoHand
---@description SendtoHand
---@see SendtoHand
---@param _0 any
---@param playerid number
---@param reason number
---@return any
function Duel.SendtoHand(_0,playerid,reason) end

---@name SendtoDeck
---@description SendtoDeck
---@see SendtoDeck
---@param _0 any
---@param playerid number
---@param sequence number
---@param reason number
---@return any
function Duel.SendtoDeck(_0,playerid,sequence,reason) end

---@name SendtoExtraP
---@description SendtoExtraP
---@see SendtoExtraP
---@param _0 any
---@param playerid number
---@param reason number
---@return any
function Duel.SendtoExtraP(_0,playerid,reason) end

---@name Sendto
---@description Sendto
---@see Sendto
---@param _0 any
---@param location number
---@param reason number
---@param pos number
---@param playerid number
---@param sequence number
---@return any
function Duel.Sendto(_0,location,reason,pos,playerid,sequence) end

---@name RemoveCards
---@description RemoveCards
---@see RemoveCards
---@return any
function Duel.RemoveCards() end

---@name GetOperatedGroup
---@description GetOperatedGroup
---@see GetOperatedGroup
---@return any
function Duel.GetOperatedGroup() end

---@name IsCanAddCounter
---@description IsCanAddCounter
---@see IsCanAddCounter
---@param playerid number
---@param countertype number
---@param count number
---@param pcard Card
---@return any
function Duel.IsCanAddCounter(playerid,countertype,count,pcard) end

---@name RemoveCounter
---@description RemoveCounter
---@see RemoveCounter
---@param rplayer number
---@param self number
---@param oppo number
---@param countertype number
---@param count number
---@param reason number
---@return any
function Duel.RemoveCounter(rplayer,self,oppo,countertype,count,reason) end

---@name IsCanRemoveCounter
---@description IsCanRemoveCounter
---@see IsCanRemoveCounter
---@param rplayer number
---@param self number
---@param oppo number
---@param countertype number
---@param count number
---@param reason number
---@return any
function Duel.IsCanRemoveCounter(rplayer,self,oppo,countertype,count,reason) end

---@name GetCounter
---@description GetCounter
---@see GetCounter
---@param playerid number
---@param self number
---@param oppo number
---@param countertype number
---@return any
function Duel.GetCounter(playerid,self,oppo,countertype) end

---@name ChangePosition
---@description ChangePosition
---@see ChangePosition
---@param _0 any
---@param au number
---@param _2 any
---@param _3 any
---@param _4 any
---@param _6 boolean
---@return any
function Duel.ChangePosition(_0,au,_2,_3,_4,_6) end

---@name Release
---@description Release
---@see Release
---@param _0 any
---@param reason number
---@return any
function Duel.Release(_0,reason) end

---@name MoveToField
---@description MoveToField
---@see MoveToField
---@param pcard Card
---@param move_player number
---@param playerid number
---@param destination number
---@param positions number
---@param enable boolean
---@param zone number
---@return any
function Duel.MoveToField(pcard,move_player,playerid,destination,positions,enable,zone) end

---@name ReturnToField
---@description ReturnToField
---@see ReturnToField
---@param pcard Card
---@param _1 any
---@param zone number
---@return any
function Duel.ReturnToField(pcard,_1,zone) end

---@name MoveSequence
---@description MoveSequence
---@see MoveSequence
---@param pcard Card
---@param seq number
---@return any
function Duel.MoveSequence(pcard,seq) end

---@name SwapSequence
---@description SwapSequence
---@see SwapSequence
---@param pcard1 Card
---@param pcard2 Card
---@return any
function Duel.SwapSequence(pcard1,pcard2) end

---@name Activate
---@description Activate
---@see Activate
---@param peffect Effect
---@return any
function Duel.Activate(peffect) end

---@name SetChainLimit
---@description SetChainLimit
---@see SetChainLimit
---@param f Function
---@return any
function Duel.SetChainLimit(f) end

---@name SetChainLimitTillChainEnd
---@description SetChainLimitTillChainEnd
---@see SetChainLimitTillChainEnd
---@param f Function
---@return any
function Duel.SetChainLimitTillChainEnd(f) end

---@name GetChainMaterial
---@description GetChainMaterial
---@see GetChainMaterial
---@param playerid number
---@return any
function Duel.GetChainMaterial(playerid) end

---@name ConfirmDecktop
---@description ConfirmDecktop
---@see ConfirmDecktop
---@param playerid number
---@param count number
---@return any
function Duel.ConfirmDecktop(playerid,count) end

---@name ConfirmExtratop
---@description ConfirmExtratop
---@see ConfirmExtratop
---@param playerid number
---@param count number
---@return any
function Duel.ConfirmExtratop(playerid,count) end

---@name ConfirmCards
---@description ConfirmCards
---@see ConfirmCards
---@param playerid number
---@return any
function Duel.ConfirmCards(playerid) end

---@name SortDecktop
---@description SortDecktop
---@see SortDecktop
---@param sort_player number
---@param target_player number
---@param count number
---@return any
function Duel.SortDecktop(sort_player,target_player,count) end

---@name SortDeckbottom
---@description SortDeckbottom
---@see SortDeckbottom
---@param sort_player number
---@param target_player number
---@param count number
---@return any
function Duel.SortDeckbottom(sort_player,target_player,count) end

---@name CheckEvent
---@description CheckEvent
---@see CheckEvent
---@param ev number
---@param get_info boolean
---@return any
function Duel.CheckEvent(ev,get_info) end

---@name RaiseEvent
---@description RaiseEvent
---@see RaiseEvent
---@param _0 any
---@param code number
---@param peffect Effect
---@param r number
---@param rp number
---@param ep number
---@param ev number
---@return any
function Duel.RaiseEvent(_0,code,peffect,r,rp,ep,ev) end

---@name RaiseSingleEvent
---@description RaiseSingleEvent
---@see RaiseSingleEvent
---@param pcard Card
---@param code number
---@param peffect Effect
---@param r number
---@param rp number
---@param ep number
---@param ev number
---@return any
function Duel.RaiseSingleEvent(pcard,code,peffect,r,rp,ep,ev) end

---@name CheckTiming
---@description CheckTiming
---@see CheckTiming
---@param tm number
---@return any
function Duel.CheckTiming(tm) end

---@name GetEnvironment
---@description GetEnvironment
---@see GetEnvironment
---@return any
function Duel.GetEnvironment() end

---@name IsEnvironment
---@description IsEnvironment
---@see IsEnvironment
---@param code number
---@param playerid number
---@param loc number
---@return any
function Duel.IsEnvironment(code,playerid,loc) end

---@name Win
---@description Win
---@see Win
---@param playerid number
---@param reason number
---@return any
function Duel.Win(playerid,reason) end

---@name Draw
---@description Draw
---@see Draw
---@param playerid number
---@param count number
---@param reason number
---@return any
function Duel.Draw(playerid,count,reason) end

---@name Damage
---@description Damage
---@see Damage
---@param playerid number
---@param amount number
---@param reason number
---@param is_step boolean
---@return any
function Duel.Damage(playerid,amount,reason,is_step) end

---@name Recover
---@description Recover
---@see Recover
---@param playerid number
---@param amount number
---@param reason number
---@param is_step boolean
---@return any
function Duel.Recover(playerid,amount,reason,is_step) end

---@name RDComplete
---@description RDComplete
---@see RDComplete
---@return any
function Duel.RDComplete() end

---@name Equip
---@description Equip
---@see Equip
---@param playerid number
---@param equip_card Card
---@param target Card
---@param up boolean
---@param step boolean
---@return any
function Duel.Equip(playerid,equip_card,target,up,step) end

---@name EquipComplete
---@description EquipComplete
---@see EquipComplete
---@return any
function Duel.EquipComplete() end

---@name GetControl
---@description GetControl
---@see GetControl
---@param _0 any
---@param playerid number
---@param reset_phase number
---@param reset_count number
---@param zone number
---@return any
function Duel.GetControl(_0,playerid,reset_phase,reset_count,zone) end

---@name SwapControl
---@description SwapControl
---@see SwapControl
---@param obj1 Lua_obj
---@param obj2 Lua_obj
---@param reset_phase number
---@param reset_count number
---@return any
function Duel.SwapControl(obj1,obj2,reset_phase,reset_count) end

---@name CheckLPCost
---@description CheckLPCost
---@see CheckLPCost
---@param playerid number
---@param cost number
---@return any
function Duel.CheckLPCost(playerid,cost) end

---@name PayLPCost
---@description PayLPCost
---@see PayLPCost
---@param playerid number
---@param cost number
---@return any
function Duel.PayLPCost(playerid,cost) end

---@name DiscardDeck
---@description DiscardDeck
---@see DiscardDeck
---@param playerid number
---@param count number
---@param reason number
---@return any
function Duel.DiscardDeck(playerid,count,reason) end

---@name DiscardHand
---@description DiscardHand
---@see DiscardHand
---@param playerid number
---@param findex Function
---@param min number
---@param max number
---@param reason number
---@param pexgroup Group
---@return any
function Duel.DiscardHand(playerid,findex,min,max,reason,pexgroup) end

---@name DisableShuffleCheck
---@description DisableShuffleCheck
---@see DisableShuffleCheck
---@param disable boolean
---@return any
function Duel.DisableShuffleCheck(disable) end

---@name DisableSelfDestroyCheck
---@description DisableSelfDestroyCheck
---@see DisableSelfDestroyCheck
---@param disable boolean
---@return any
function Duel.DisableSelfDestroyCheck(disable) end

---@name ShuffleDeck
---@description ShuffleDeck
---@see ShuffleDeck
---@param playerid number
---@return any
function Duel.ShuffleDeck(playerid) end

---@name ShuffleExtra
---@description ShuffleExtra
---@see ShuffleExtra
---@param playerid number
---@return any
function Duel.ShuffleExtra(playerid) end

---@name ShuffleHand
---@description ShuffleHand
---@see ShuffleHand
---@param playerid number
---@return any
function Duel.ShuffleHand(playerid) end

---@name ShuffleSetCard
---@description ShuffleSetCard
---@see ShuffleSetCard
---@param pgroup Group
---@return any
function Duel.ShuffleSetCard(pgroup) end

---@name ChangeAttacker
---@description ChangeAttacker
---@see ChangeAttacker
---@param new_attacker Card
---@param ignore_count boolean
---@return any
function Duel.ChangeAttacker(new_attacker,ignore_count) end

---@name ChangeAttackTarget
---@description ChangeAttackTarget
---@see ChangeAttackTarget
---@param target Card
---@param ignore boolean
---@return any
function Duel.ChangeAttackTarget(target,ignore) end

---@name AttackCostPaid
---@description AttackCostPaid
---@see AttackCostPaid
---@param paid number
---@return any
function Duel.AttackCostPaid(paid) end

---@name ForceAttack
---@description ForceAttack
---@see ForceAttack
---@param attacker Card
---@param attack_target Card
---@return any
function Duel.ForceAttack(attacker,attack_target) end

---@name CalculateDamage
---@description CalculateDamage
---@see CalculateDamage
---@param attacker Card
---@param attack_target Card
---@param new_attack boolean
---@return any
function Duel.CalculateDamage(attacker,attack_target,new_attack) end

---@name GetBattleDamage
---@description GetBattleDamage
---@see GetBattleDamage
---@param playerid number
---@return any
function Duel.GetBattleDamage(playerid) end

---@name ChangeBattleDamage
---@description ChangeBattleDamage
---@see ChangeBattleDamage
---@param playerid number
---@param dam number
---@param check boolean
---@return any
function Duel.ChangeBattleDamage(playerid,dam,check) end

---@name ChangeTargetCard
---@description ChangeTargetCard
---@see ChangeTargetCard
---@param count number
---@param pgroup Group
---@return any
function Duel.ChangeTargetCard(count,pgroup) end

---@name ChangeTargetPlayer
---@description ChangeTargetPlayer
---@see ChangeTargetPlayer
---@param count number
---@param playerid number
---@return any
function Duel.ChangeTargetPlayer(count,playerid) end

---@name ChangeTargetParam
---@description ChangeTargetParam
---@see ChangeTargetParam
---@param count number
---@param param number
---@return any
function Duel.ChangeTargetParam(count,param) end

---@name BreakEffect
---@description BreakEffect
---@see BreakEffect
---@return any
function Duel.BreakEffect() end

---@name ChangeChainOperation
---@description ChangeChainOperation
---@see ChangeChainOperation
---@param _1 number
---@param f Function
---@return any
function Duel.ChangeChainOperation(_1,f) end

---@name NegateActivation
---@description NegateActivation
---@see NegateActivation
---@param _1 number
---@return any
function Duel.NegateActivation(_1) end

---@name NegateEffect
---@description NegateEffect
---@see NegateEffect
---@param _1 number
---@return any
function Duel.NegateEffect(_1) end

---@name NegateRelatedChain
---@description NegateRelatedChain
---@see NegateRelatedChain
---@param pcard Card
---@param reset_flag number
---@return any
function Duel.NegateRelatedChain(pcard,reset_flag) end

---@name NegateSummon
---@description NegateSummon
---@see NegateSummon
---@return any
function Duel.NegateSummon() end

---@name IncreaseSummonedCount
---@description IncreaseSummonedCount
---@see IncreaseSummonedCount
---@param pcard Card
---@return any
function Duel.IncreaseSummonedCount(pcard) end

---@name CheckSummonedCount
---@description CheckSummonedCount
---@see CheckSummonedCount
---@param pcard Card
---@return any
function Duel.CheckSummonedCount(pcard) end

---@name GetLocationCount
---@description GetLocationCount
---@see GetLocationCount
---@param playerid number
---@param location number
---@param _2 any
---@param reason number
---@param zone number
---@return any
function Duel.GetLocationCount(playerid,location,_2,reason,zone) end

---@name GetMZoneCount
---@description GetMZoneCount
---@see GetMZoneCount
---@param playerid number
---@param _1 any
---@param _2 any
---@param reason number
---@param zone number
---@return any
function Duel.GetMZoneCount(playerid,_1,_2,reason,zone) end

---@name GetLocationCountFromEx
---@description GetLocationCountFromEx
---@see GetLocationCountFromEx
---@param playerid number
---@param _1 any
---@param _2 any
---@param type number
---@param zone number
---@return any
function Duel.GetLocationCountFromEx(playerid,_1,_2,type,zone) end

---@name GetUsableMZoneCount
---@description GetUsableMZoneCount
---@see GetUsableMZoneCount
---@param playerid number
---@return any
function Duel.GetUsableMZoneCount(playerid) end

---@name GetLinkedGroup
---@description GetLinkedGroup
---@see GetLinkedGroup
---@param rplayer number
---@param location1 number
---@param location2 number
---@return any
function Duel.GetLinkedGroup(rplayer,location1,location2) end

---@name GetLinkedGroupCount
---@description GetLinkedGroupCount
---@see GetLinkedGroupCount
---@param rplayer number
---@param location1 number
---@param location2 number
---@return any
function Duel.GetLinkedGroupCount(rplayer,location1,location2) end

---@name GetLinkedZone
---@description GetLinkedZone
---@see GetLinkedZone
---@param playerid number
---@return any
function Duel.GetLinkedZone(playerid) end

---@name GetFreeLinkedZone
---@description GetFreeLinkedZone
---@see GetFreeLinkedZone
---@param playerid number
---@return any
function Duel.GetFreeLinkedZone(playerid) end

---@name GetFieldCard
---@description GetFieldCard
---@see GetFieldCard
---@param playerid number
---@param location number
---@param sequence number
---@return any
function Duel.GetFieldCard(playerid,location,sequence) end

---@name CheckLocation
---@description CheckLocation
---@see CheckLocation
---@param playerid number
---@param location number
---@param sequence number
---@return any
function Duel.CheckLocation(playerid,location,sequence) end

---@name GetCurrentChain
---@description GetCurrentChain
---@see GetCurrentChain
---@param real boolean
---@return any
function Duel.GetCurrentChain(real) end

---@name GetChainInfo
---@description GetChainInfo
---@see GetChainInfo
---@param ch number
---@return any
function Duel.GetChainInfo(ch) end

---@name GetChainEvent
---@description GetChainEvent
---@see GetChainEvent
---@param count number
---@return any
function Duel.GetChainEvent(count) end

---@name GetFirstTarget
---@description GetFirstTarget
---@see GetFirstTarget
---@return any
function Duel.GetFirstTarget() end

---@name GetCurrentPhase
---@description GetCurrentPhase
---@see GetCurrentPhase
---@return any
function Duel.GetCurrentPhase() end

---@name SkipPhase
---@description SkipPhase
---@see SkipPhase
---@param playerid number
---@param phase number
---@param reset number
---@param count number
---@param value number
---@return any
function Duel.SkipPhase(playerid,phase,reset,count,value) end

---@name IsAttackCostPaid
---@description IsAttackCostPaid
---@see IsAttackCostPaid
---@return any
function Duel.IsAttackCostPaid() end

---@name IsDamageCalculated
---@description IsDamageCalculated
---@see IsDamageCalculated
---@return any
function Duel.IsDamageCalculated() end

---@name GetAttacker
---@description GetAttacker
---@see GetAttacker
---@return any
function Duel.GetAttacker() end

---@name GetAttackTarget
---@description GetAttackTarget
---@see GetAttackTarget
---@return any
function Duel.GetAttackTarget() end

---@name GetBattleMonster
---@description GetBattleMonster
---@see GetBattleMonster
---@param playerid number
---@return any
function Duel.GetBattleMonster(playerid) end

---@name NegateAttack
---@description NegateAttack
---@see NegateAttack
---@return any
function Duel.NegateAttack() end

---@name ChainAttack
---@description ChainAttack
---@see ChainAttack
---@param chain_attack_target Card
---@return any
function Duel.ChainAttack(chain_attack_target) end

---@name Readjust
---@description Readjust
---@see Readjust
---@return any
function Duel.Readjust() end

---@name AdjustInstantly
---@description AdjustInstantly
---@see AdjustInstantly
---@param pcard Card
---@return any
function Duel.AdjustInstantly(pcard) end

---@name GetFieldGroup
---@description GetFieldGroup
---@see GetFieldGroup
---@param playerid number
---@param location1 number
---@param location2 number
---@return any
function Duel.GetFieldGroup(playerid,location1,location2) end

---@name GetFieldGroupCount
---@description GetFieldGroupCount
---@see GetFieldGroupCount
---@param playerid number
---@param location1 number
---@param location2 number
---@return any
function Duel.GetFieldGroupCount(playerid,location1,location2) end

---@name GetDecktopGroup
---@description GetDecktopGroup
---@see GetDecktopGroup
---@param playerid number
---@param count number
---@return any
function Duel.GetDecktopGroup(playerid,count) end

---@name GetDeckbottomGroup
---@description GetDeckbottomGroup
---@see GetDeckbottomGroup
---@param playerid number
---@param count number
---@return any
function Duel.GetDeckbottomGroup(playerid,count) end

---@name GetExtraTopGroup
---@description GetExtraTopGroup
---@see GetExtraTopGroup
---@param playerid number
---@param count number
---@return any
function Duel.GetExtraTopGroup(playerid,count) end

---@name GetMatchingGroup
---@description GetMatchingGroup
---@see GetMatchingGroup
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param pexgroup Group
---@return any
function Duel.GetMatchingGroup(findex,self,location1,location2,pexgroup) end

---@name GetMatchingGroupCount
---@description GetMatchingGroupCount
---@see GetMatchingGroupCount
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param pexgroup Group
---@return any
function Duel.GetMatchingGroupCount(findex,self,location1,location2,pexgroup) end

---@name GetFirstMatchingCard
---@description GetFirstMatchingCard
---@see GetFirstMatchingCard
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param pexgroup Group
---@return any
function Duel.GetFirstMatchingCard(findex,self,location1,location2,pexgroup) end

---@name IsExistingMatchingCard
---@description IsExistingMatchingCard
---@see IsExistingMatchingCard
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param fcount number
---@param pexgroup Group
---@return any
function Duel.IsExistingMatchingCard(findex,self,location1,location2,fcount,pexgroup) end

---@name SelectMatchingCard
---@description SelectMatchingCard
---@see SelectMatchingCard
---@param playerid number
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param min number
---@param max number
---@return any
function Duel.SelectMatchingCard(playerid,findex,self,location1,location2,min,max) end

---@name SelectCardsFromCodes
---@description SelectCardsFromCodes
---@see SelectCardsFromCodes
---@param playerid number
---@param min number
---@param max number
---@param cancelable boolean
---@param ret_index boolean
---@return any
function Duel.SelectCardsFromCodes(playerid,min,max,cancelable,ret_index) end

---@name GetReleaseGroup
---@description GetReleaseGroup
---@see GetReleaseGroup
---@param playerid number
---@param hand boolean
---@param oppo boolean
---@return any
function Duel.GetReleaseGroup(playerid,hand,oppo) end

---@name GetReleaseGroupCount
---@description GetReleaseGroupCount
---@see GetReleaseGroupCount
---@param playerid number
---@param hand boolean
---@param oppo boolean
---@return any
function Duel.GetReleaseGroupCount(playerid,hand,oppo) end

---@name CheckReleaseGroup
---@description CheckReleaseGroup
---@see CheckReleaseGroup
---@return any
function Duel.CheckReleaseGroup() end

---@name CheckReleaseGroupEx
---@description CheckReleaseGroupEx
---@see CheckReleaseGroupEx
---@return any
function Duel.CheckReleaseGroupEx() end

---@name SelectReleaseGroup
---@description SelectReleaseGroup
---@see SelectReleaseGroup
---@return any
function Duel.SelectReleaseGroup() end

---@name SelectReleaseGroupEx
---@description SelectReleaseGroupEx
---@see SelectReleaseGroupEx
---@return any
function Duel.SelectReleaseGroupEx() end

---@name GetTributeGroup
---@description GetTributeGroup
---@see GetTributeGroup
---@param target Card
---@return any
function Duel.GetTributeGroup(target) end

---@name GetTributeCount
---@description GetTributeCount
---@see GetTributeCount
---@param target Card
---@param mg Group
---@param ex boolean
---@return any
function Duel.GetTributeCount(target,mg,ex) end

---@name CheckTribute
---@description CheckTribute
---@see CheckTribute
---@param target Card
---@param min number
---@param _2 any
---@param mg Group
---@param _4 any
---@param zone number
---@return any
function Duel.CheckTribute(target,min,_2,mg,_4,zone) end

---@name SelectTribute
---@description SelectTribute
---@see SelectTribute
---@param playerid number
---@param target Card
---@param min number
---@param max number
---@param mg Group
---@param _5 any
---@param zone number
---@param cancelable boolean
---@return any
function Duel.SelectTribute(playerid,target,min,max,mg,_5,zone,cancelable) end

---@name GetTargetCount
---@description GetTargetCount
---@see GetTargetCount
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param pexgroup Group
---@return any
function Duel.GetTargetCount(findex,self,location1,location2,pexgroup) end

---@name IsExistingTarget
---@description IsExistingTarget
---@see IsExistingTarget
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param count number
---@param pexgroup Group
---@return any
function Duel.IsExistingTarget(findex,self,location1,location2,count,pexgroup) end

---@name SelectTarget
---@description SelectTarget
---@see SelectTarget
---@param playerid number
---@param findex Function
---@param self number
---@param location1 number
---@param location2 number
---@param min number
---@param max number
---@return any
function Duel.SelectTarget(playerid,findex,self,location1,location2,min,max) end

---@name SelectFusionMaterial
---@description SelectFusionMaterial
---@see SelectFusionMaterial
---@param playerid number
---@param pcard Card
---@param pgroup Group
---@param cg Group
---@param chkf number
---@return any
function Duel.SelectFusionMaterial(playerid,pcard,pgroup,cg,chkf) end

---@name SetFusionMaterial
---@description SetFusionMaterial
---@see SetFusionMaterial
---@param pgroup Group
---@return any
function Duel.SetFusionMaterial(pgroup) end

---@name GetRitualMaterial
---@description GetRitualMaterial
---@see GetRitualMaterial
---@param playerid number
---@param check_level boolean
---@return any
function Duel.GetRitualMaterial(playerid,check_level) end

---@name ReleaseRitualMaterial
---@description ReleaseRitualMaterial
---@see ReleaseRitualMaterial
---@param pgroup Group
---@return any
function Duel.ReleaseRitualMaterial(pgroup) end

---@name GetFusionMaterial
---@description GetFusionMaterial
---@see GetFusionMaterial
---@param playerid number
---@return any
function Duel.GetFusionMaterial(playerid) end

---@name IsSummonCancelable
---@description IsSummonCancelable
---@see IsSummonCancelable
---@return any
function Duel.IsSummonCancelable() end

---@name SetSelectedCard
---@description SetSelectedCard
---@see SetSelectedCard
---@return any
function Duel.SetSelectedCard() end

---@name GrabSelectedCard
---@description GrabSelectedCard
---@see GrabSelectedCard
---@return any
function Duel.GrabSelectedCard() end

---@name SetTargetCard
---@description SetTargetCard
---@see SetTargetCard
---@return any
function Duel.SetTargetCard() end

---@name ClearTargetCard
---@description ClearTargetCard
---@see ClearTargetCard
---@return any
function Duel.ClearTargetCard() end

---@name SetTargetPlayer
---@description SetTargetPlayer
---@see SetTargetPlayer
---@param playerid number
---@return any
function Duel.SetTargetPlayer(playerid) end

---@name SetTargetParam
---@description SetTargetParam
---@see SetTargetParam
---@param param number
---@return any
function Duel.SetTargetParam(param) end

---@name SetOperationInfo
---@description SetOperationInfo
---@see SetOperationInfo
---@param ct number
---@param cate number
---@param pobj Lua_obj
---@param count number
---@param playerid number
---@param param number
---@return any
function Duel.SetOperationInfo(ct,cate,pobj,count,playerid,param) end

---@name GetOperationInfo
---@description GetOperationInfo
---@see GetOperationInfo
---@param ct number
---@param cate number
---@return any
function Duel.GetOperationInfo(ct,cate) end

---@name SetPossibleOperationInfo
---@description SetPossibleOperationInfo
---@see SetPossibleOperationInfo
---@param ct number
---@param cate number
---@param pobj Lua_obj
---@param count number
---@param playerid number
---@param param number
---@return any
function Duel.SetPossibleOperationInfo(ct,cate,pobj,count,playerid,param) end

---@name GetPossibleOperationInfo
---@description GetPossibleOperationInfo
---@see GetPossibleOperationInfo
---@param ct number
---@param cate number
---@return any
function Duel.GetPossibleOperationInfo(ct,cate) end

---@name GetOperationCount
---@description GetOperationCount
---@see GetOperationCount
---@param ct number
---@return any
function Duel.GetOperationCount(ct) end

---@name ClearOperationInfo
---@description ClearOperationInfo
---@see ClearOperationInfo
---@param ct number
---@return any
function Duel.ClearOperationInfo(ct) end

---@name Overlay
---@description Overlay
---@see Overlay
---@param target Card
---@param _1 any
---@param send_materials_to_grave boolean
---@return any
function Duel.Overlay(target,_1,send_materials_to_grave) end

---@name GetOverlayGroup
---@description GetOverlayGroup
---@see GetOverlayGroup
---@param rplayer number
---@param self number
---@param oppo number
---@param targetsgroup Group
---@return any
function Duel.GetOverlayGroup(rplayer,self,oppo,targetsgroup) end

---@name GetOverlayCount
---@description GetOverlayCount
---@see GetOverlayCount
---@param rplayer number
---@param self number
---@param oppo number
---@param pgroup Group
---@return any
function Duel.GetOverlayCount(rplayer,self,oppo,pgroup) end

---@name CheckRemoveOverlayCard
---@description CheckRemoveOverlayCard
---@see CheckRemoveOverlayCard
---@param playerid number
---@param self number
---@param oppo number
---@param count number
---@param reason number
---@param pgroup Group
---@return any
function Duel.CheckRemoveOverlayCard(playerid,self,oppo,count,reason,pgroup) end

---@name RemoveOverlayCard
---@description RemoveOverlayCard
---@see RemoveOverlayCard
---@param playerid number
---@param self number
---@param oppo number
---@param min number
---@param max number
---@param reason number
---@param pgroup Group
---@return any
function Duel.RemoveOverlayCard(playerid,self,oppo,min,max,reason,pgroup) end

---@name Hint
---@description Hint
---@see Hint
---@param htype number
---@param playerid number
---@param desc number
---@return any
function Duel.Hint(htype,playerid,desc) end

---@name HintSelection
---@description HintSelection
---@see HintSelection
---@param _0 any
---@param selection boolean
---@return any
function Duel.HintSelection(_0,selection) end

---@name SelectEffectYesNo
---@description SelectEffectYesNo
---@see SelectEffectYesNo
---@param playerid number
---@param pcard Card
---@param desc number
---@return any
function Duel.SelectEffectYesNo(playerid,pcard,desc) end

---@name SelectYesNo
---@description SelectYesNo
---@see SelectYesNo
---@param playerid number
---@param desc number
---@return any
function Duel.SelectYesNo(playerid,desc) end

---@name SelectOption
---@description SelectOption
---@see SelectOption
---@param playerid number
---@param sel_hint boolean
---@return any
function Duel.SelectOption(playerid,sel_hint) end

---@name SelectPosition
---@description SelectPosition
---@see SelectPosition
---@param playerid number
---@param pcard Card
---@param positions number
---@return any
function Duel.SelectPosition(playerid,pcard,positions) end

---@name SelectDisableField
---@description SelectDisableField
---@see SelectDisableField
---@param playerid number
---@param count number
---@param location1 number
---@param location2 number
---@param _4 any
---@param all_field boolean
---@return any
function Duel.SelectDisableField(playerid,count,location1,location2,_4,all_field) end

---@name SelectFieldZone
---@description SelectFieldZone
---@see SelectFieldZone
---@param playerid number
---@param count number
---@param location1 number
---@param location2 number
---@param filter number
---@return any
function Duel.SelectFieldZone(playerid,count,location1,location2,filter) end

---@name AnnounceRace
---@description AnnounceRace
---@see AnnounceRace
---@param playerid number
---@param count number
---@param available number
---@return any
function Duel.AnnounceRace(playerid,count,available) end

---@name AnnounceAttribute
---@description AnnounceAttribute
---@see AnnounceAttribute
---@param playerid number
---@param count number
---@param available number
---@return any
function Duel.AnnounceAttribute(playerid,count,available) end

---@name AnnounceNumberRange
---@description AnnounceNumberRange
---@see AnnounceNumberRange
---@param playerid number
---@param min number
---@param max number
---@return any
function Duel.AnnounceNumberRange(playerid,min,max) end

---@name AnnounceCard
---@description AnnounceCard
---@see AnnounceCard
---@param playerid number
---@param ttype number
---@return any
function Duel.AnnounceCard(playerid,ttype) end

---@name AnnounceType
---@description AnnounceType
---@see AnnounceType
---@param playerid number
---@return any
function Duel.AnnounceType(playerid) end

---@name AnnounceNumber
---@description AnnounceNumber
---@see AnnounceNumber
---@param playerid number
---@return any
function Duel.AnnounceNumber(playerid) end

---@name AnnounceCoin
---@description AnnounceCoin
---@see AnnounceCoin
---@param playerid number
---@param sel_hint boolean
---@return any
function Duel.AnnounceCoin(playerid,sel_hint) end

---@name TossCoin
---@description TossCoin
---@see TossCoin
---@param playerid number
---@param count number
---@return any
function Duel.TossCoin(playerid,count) end

---@name TossDice
---@description TossDice
---@see TossDice
---@param playerid number
---@param count1 number
---@param count2 number
---@return any
function Duel.TossDice(playerid,count1,count2) end

---@name RockPaperScissors
---@description RockPaperScissors
---@see RockPaperScissors
---@param _repeat boolean
---@return any
function Duel.RockPaperScissors(_repeat) end

---@name GetCoinResult
---@description GetCoinResult
---@see GetCoinResult
---@return any
function Duel.GetCoinResult() end

---@name GetDiceResult
---@description GetDiceResult
---@see GetDiceResult
---@return any
function Duel.GetDiceResult() end

---@name SetCoinResult
---@description SetCoinResult
---@see SetCoinResult
---@return any
function Duel.SetCoinResult() end

---@name SetDiceResult
---@description SetDiceResult
---@see SetDiceResult
---@return any
function Duel.SetDiceResult() end

---@name IsDuelType
---@description IsDuelType
---@see IsDuelType
---@param duel_type number
---@return any
function Duel.IsDuelType(duel_type) end

---@name GetDuelType
---@description GetDuelType
---@see GetDuelType
---@return any
function Duel.GetDuelType() end

---@name IsPlayerAffectedByEffect
---@description IsPlayerAffectedByEffect
---@see IsPlayerAffectedByEffect
---@param playerid number
---@param code number
---@return any
function Duel.IsPlayerAffectedByEffect(playerid,code) end

---@name GetPlayerEffect
---@description GetPlayerEffect
---@see GetPlayerEffect
---@param playerid number
---@param code number
---@return any
function Duel.GetPlayerEffect(playerid,code) end

---@name IsPlayerCanDraw
---@description IsPlayerCanDraw
---@see IsPlayerCanDraw
---@param playerid number
---@param count number
---@return any
function Duel.IsPlayerCanDraw(playerid,count) end

---@name IsPlayerCanDiscardDeck
---@description IsPlayerCanDiscardDeck
---@see IsPlayerCanDiscardDeck
---@param playerid number
---@param count number
---@return any
function Duel.IsPlayerCanDiscardDeck(playerid,count) end

---@name IsPlayerCanDiscardDeckAsCost
---@description IsPlayerCanDiscardDeckAsCost
---@see IsPlayerCanDiscardDeckAsCost
---@param playerid number
---@param count number
---@return any
function Duel.IsPlayerCanDiscardDeckAsCost(playerid,count) end

---@name IsPlayerCanSummon
---@description IsPlayerCanSummon
---@see IsPlayerCanSummon
---@param playerid number
---@param sumtype number
---@param pcard Card
---@return any
function Duel.IsPlayerCanSummon(playerid,sumtype,pcard) end

---@name CanPlayerSetMonster
---@description CanPlayerSetMonster
---@see CanPlayerSetMonster
---@param playerid number
---@param sumtype number
---@param pcard Card
---@return any
function Duel.CanPlayerSetMonster(playerid,sumtype,pcard) end

---@name CanPlayerSetSpellTrap
---@description CanPlayerSetSpellTrap
---@see CanPlayerSetSpellTrap
---@param playerid number
---@param pcard Card
---@return any
function Duel.CanPlayerSetSpellTrap(playerid,pcard) end

---@name IsPlayerCanSpecialSummon
---@description IsPlayerCanSpecialSummon
---@see IsPlayerCanSpecialSummon
---@param playerid number
---@param sumtype number
---@param sumpos number
---@param toplayer number
---@param pcard Card
---@return any
function Duel.IsPlayerCanSpecialSummon(playerid,sumtype,sumpos,toplayer,pcard) end

---@name IsPlayerCanFlipSummon
---@description IsPlayerCanFlipSummon
---@see IsPlayerCanFlipSummon
---@param playerid number
---@param pcard Card
---@return any
function Duel.IsPlayerCanFlipSummon(playerid,pcard) end

---@name IsPlayerCanSpecialSummonMonster
---@description IsPlayerCanSpecialSummonMonster
---@see IsPlayerCanSpecialSummonMonster
---@param playerid number
---@param code number
---@param _3 number
---@param type number
---@param attack number
---@param defense number
---@param level number
---@param race number
---@param attribute number
---@param pos number
---@param _10 any
---@param sumtype number
---@return any
function Duel.IsPlayerCanSpecialSummonMonster(playerid,code,_3,type,attack,defense,level,race,attribute,pos,_10,sumtype) end

---@name IsPlayerCanSpecialSummonCount
---@description IsPlayerCanSpecialSummonCount
---@see IsPlayerCanSpecialSummonCount
---@param playerid number
---@param count number
---@return any
function Duel.IsPlayerCanSpecialSummonCount(playerid,count) end

---@name IsPlayerCanRelease
---@description IsPlayerCanRelease
---@see IsPlayerCanRelease
---@param playerid number
---@param pcard Card
---@return any
function Duel.IsPlayerCanRelease(playerid,pcard) end

---@name IsPlayerCanRemove
---@description IsPlayerCanRemove
---@see IsPlayerCanRemove
---@param playerid number
---@param pcard Card
---@param reason number
---@return any
function Duel.IsPlayerCanRemove(playerid,pcard,reason) end

---@name IsPlayerCanSendtoHand
---@description IsPlayerCanSendtoHand
---@see IsPlayerCanSendtoHand
---@param playerid number
---@param pcard Card
---@return any
function Duel.IsPlayerCanSendtoHand(playerid,pcard) end

---@name IsPlayerCanSendtoGrave
---@description IsPlayerCanSendtoGrave
---@see IsPlayerCanSendtoGrave
---@param playerid number
---@param pcard Card
---@return any
function Duel.IsPlayerCanSendtoGrave(playerid,pcard) end

---@name IsPlayerCanSendtoDeck
---@description IsPlayerCanSendtoDeck
---@see IsPlayerCanSendtoDeck
---@param playerid number
---@param pcard Card
---@return any
function Duel.IsPlayerCanSendtoDeck(playerid,pcard) end

---@name IsPlayerCanAdditionalSummon
---@description IsPlayerCanAdditionalSummon
---@see IsPlayerCanAdditionalSummon
---@param playerid number
---@return any
function Duel.IsPlayerCanAdditionalSummon(playerid) end

---@name IsPlayerCanPendulumSummon
---@description IsPlayerCanPendulumSummon
---@see IsPlayerCanPendulumSummon
---@return any
function Duel.IsPlayerCanPendulumSummon() end

---@name IsPlayerCanProcedureSummonGroup
---@description IsPlayerCanProcedureSummonGroup
---@see IsPlayerCanProcedureSummonGroup
---@param _0 any
---@param sumtype number
---@return any
function Duel.IsPlayerCanProcedureSummonGroup(_0,sumtype) end

---@name IsChainNegatable
---@description IsChainNegatable
---@see IsChainNegatable
---@return any
function Duel.IsChainNegatable() end

---@name IsChainDisablable
---@description IsChainDisablable
---@see IsChainDisablable
---@param chaincount number
---@return any
function Duel.IsChainDisablable(chaincount) end

---@name IsChainSolving
---@description IsChainSolving
---@see IsChainSolving
---@return any
function Duel.IsChainSolving() end

---@name CheckChainTarget
---@description CheckChainTarget
---@see CheckChainTarget
---@param chaincount number
---@param pcard Card
---@return any
function Duel.CheckChainTarget(chaincount,pcard) end

---@name CheckChainUniqueness
---@description CheckChainUniqueness
---@see CheckChainUniqueness
---@return any
function Duel.CheckChainUniqueness() end

---@name GetActivityCount
---@description GetActivityCount
---@see GetActivityCount
---@param playerid number
---@return any
function Duel.GetActivityCount(playerid) end

---@name CheckPhaseActivity
---@description CheckPhaseActivity
---@see CheckPhaseActivity
---@return any
function Duel.CheckPhaseActivity() end

---@name AddCustomActivityCounter
---@description AddCustomActivityCounter
---@see AddCustomActivityCounter
---@param counter_id number
---@param activity_type number
---@param findex Filter
---@return any
function Duel.AddCustomActivityCounter(counter_id,activity_type,findex) end

---@name GetCustomActivityCount
---@description GetCustomActivityCount
---@see GetCustomActivityCount
---@param counter_id number 
---@param playerid number 
---@param activity_type number 
---@return any
function Duel.GetCustomActivityCount(counter_id,playerid,activity_type) end

---@name GetBattledCount
---@description GetBattledCount
---@see GetBattledCount
---@param playerid number 
---@return any
function Duel.GetBattledCount(playerid) end

---@name IsAbleToEnterBP
---@description IsAbleToEnterBP
---@see IsAbleToEnterBP
---@return any
function Duel.IsAbleToEnterBP() end

---@name GetRandomNumber
---@description GetRandomNumber
---@see GetRandomNumber
---@param min number
---@param max number 
---@return any
function Duel.GetRandomNumber(min,max) end

---@name AssumeReset
---@description AssumeReset
---@see AssumeReset
---@return any
function Duel.AssumeReset() end

---@name GetCardFromCardID
---@description GetCardFromCardID
---@see GetCardFromCardID
---@param id number 
---@return any
function Duel.GetCardFromCardID(id) end

---@name LoadScript
---@description LoadScript
---@see LoadScript
---@param _0 any 
---@param check_cache boolean 
---@return any
function Duel.LoadScript(_0,check_cache) end

---@name TagSwap
---@description TagSwap
---@see TagSwap
---@param playerid number 
---@return any
function Duel.TagSwap(playerid) end

---@name GetPlayersCount
---@description GetPlayersCount
---@see GetPlayersCount
---@param playerid number 
---@return any
function Duel.GetPlayersCount(playerid) end

---@name SwapDeckAndGrave
---@description SwapDeckAndGrave
---@see SwapDeckAndGrave
---@param playerid number 
---@return any
function Duel.SwapDeckAndGrave(playerid) end

---@name MajesticCopy
---@description MajesticCopy
---@see MajesticCopy
---@param pcard Card 
---@param ccard Card 
---@param resv number 
---@param resc number 
---@return any
function Duel.MajesticCopy(pcard,ccard,resv,resc) end

---@name GetStartingHand
---@description GetStartingHand
---@see GetStartingHand
---@param playerid number 
---@return any
function Duel.GetStartingHand(playerid) end

---@name GetCardSetcodeFromCode
---@description GetCardSetcodeFromCode
---@see GetCardSetcodeFromCode
---@param code number 
---@return any
function Duel.GetCardSetcodeFromCode(code) end