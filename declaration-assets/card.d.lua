---@class Card
Card = {}

---@name GetCode
---@description GetCode
---@see GetCode
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.GetCode(pcard,scard,sumtype,playerid) end

---@name GetOriginalCode
---@description GetOriginalCode
---@see GetOriginalCode
---@param pcard Card
---@return any
function Card.GetOriginalCode(pcard) end

---@name GetOriginalCodeRule
---@description GetOriginalCodeRule
---@see GetOriginalCodeRule
---@param pcard Card
---@return any
function Card.GetOriginalCodeRule(pcard) end

---@name GetSetCard
---@description GetSetCard
---@see GetSetCard
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.GetSetCard(pcard,scard,sumtype,playerid) end

---@name GetOriginalSetCard
---@description GetOriginalSetCard
---@see GetOriginalSetCard
---@param pcard Card
---@return any
function Card.GetOriginalSetCard(pcard) end

---@name GetPreviousSetCard
---@description GetPreviousSetCard
---@see GetPreviousSetCard
---@param pcard Card
---@return any
function Card.GetPreviousSetCard(pcard) end

---@name GetType
---@description GetType
---@see GetType
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.GetType(pcard,scard,sumtype,playerid) end

---@name GetOriginalType
---@description GetOriginalType
---@see GetOriginalType
---@param pcard Card
---@return any
function Card.GetOriginalType(pcard) end

---@name GetLevel
---@description GetLevel
---@see GetLevel
---@param pcard Card
---@return any
function Card.GetLevel(pcard) end

---@name GetRank
---@description GetRank
---@see GetRank
---@param pcard Card
---@return any
function Card.GetRank(pcard) end

---@name GetLink
---@description GetLink
---@see GetLink
---@param pcard Card
---@return any
function Card.GetLink(pcard) end

---@name GetSynchroLevel
---@description GetSynchroLevel
---@see GetSynchroLevel
---@param pcard Card
---@param scard Card
---@return any
function Card.GetSynchroLevel(pcard,scard) end

---@name GetRitualLevel
---@description GetRitualLevel
---@see GetRitualLevel
---@param pcard Card
---@param scard Card
---@return any
function Card.GetRitualLevel(pcard,scard) end

---@name GetOriginalLevel
---@description GetOriginalLevel
---@see GetOriginalLevel
---@param pcard Card
---@return any
function Card.GetOriginalLevel(pcard) end

---@name GetOriginalRank
---@description GetOriginalRank
---@see GetOriginalRank
---@param pcard Card
---@return any
function Card.GetOriginalRank(pcard) end

---@name IsXyzLevel
---@description IsXyzLevel
---@see IsXyzLevel
---@param pcard Card
---@param xyzcard Card
---@param lv number
---@return any
function Card.IsXyzLevel(pcard,xyzcard,lv) end

---@name GetLeftScale
---@description GetLeftScale
---@see GetLeftScale
---@param pcard Card
---@return any
function Card.GetLeftScale(pcard) end

---@name GetOriginalLeftScale
---@description GetOriginalLeftScale
---@see GetOriginalLeftScale
---@param pcard Card
---@return any
function Card.GetOriginalLeftScale(pcard) end

---@name GetRightScale
---@description GetRightScale
---@see GetRightScale
---@param pcard Card
---@return any
function Card.GetRightScale(pcard) end

---@name GetOriginalRightScale
---@description GetOriginalRightScale
---@see GetOriginalRightScale
---@param pcard Card
---@return any
function Card.GetOriginalRightScale(pcard) end

---@name GetLinkMarker
---@description GetLinkMarker
---@see GetLinkMarker
---@param pcard Card
---@return any
function Card.GetLinkMarker(pcard) end

---@name IsLinkMarker
---@description IsLinkMarker
---@see IsLinkMarker
---@param pcard Card
---@param dir number
---@return any
function Card.IsLinkMarker(pcard,dir) end

---@name GetLinkedGroup
---@description GetLinkedGroup
---@see GetLinkedGroup
---@param pcard Card
---@return any
function Card.GetLinkedGroup(pcard) end

---@name GetLinkedGroupCount
---@description GetLinkedGroupCount
---@see GetLinkedGroupCount
---@param pcard Card
---@return any
function Card.GetLinkedGroupCount(pcard) end

---@name GetLinkedZone
---@description GetLinkedZone
---@see GetLinkedZone
---@param pcard Card
---@return any
function Card.GetLinkedZone(pcard) end

---@name GetFreeLinkedZone
---@description GetFreeLinkedZone
---@see GetFreeLinkedZone
---@param pcard Card
---@return any
function Card.GetFreeLinkedZone(pcard) end

---@name GetMutualLinkedGroup
---@description GetMutualLinkedGroup
---@see GetMutualLinkedGroup
---@param pcard Card
---@return any
function Card.GetMutualLinkedGroup(pcard) end

---@name GetMutualLinkedGroupCount
---@description GetMutualLinkedGroupCount
---@see GetMutualLinkedGroupCount
---@param pcard Card
---@return any
function Card.GetMutualLinkedGroupCount(pcard) end

---@name GetMutualLinkedZone
---@description GetMutualLinkedZone
---@see GetMutualLinkedZone
---@param pcard Card
---@return any
function Card.GetMutualLinkedZone(pcard) end

---@name IsLinked
---@description IsLinked
---@see IsLinked
---@param pcard Card
---@return any
function Card.IsLinked(pcard) end

---@name IsExtraLinked
---@description IsExtraLinked
---@see IsExtraLinked
---@param pcard Card
---@return any
function Card.IsExtraLinked(pcard) end

---@name GetColumnGroup
---@description GetColumnGroup
---@see GetColumnGroup
---@param pcard Card
---@param left number
---@param right number
---@return any
function Card.GetColumnGroup(pcard,left,right) end

---@name GetColumnGroupCount
---@description GetColumnGroupCount
---@see GetColumnGroupCount
---@param pcard Card
---@param left number
---@param right number
---@return any
function Card.GetColumnGroupCount(pcard,left,right) end

---@name GetColumnZone
---@description GetColumnZone
---@see GetColumnZone
---@param pcard Card
---@param loc number
---@param left number
---@param right number
---@return any
function Card.GetColumnZone(pcard,loc,left,right) end

---@name IsAllColumn
---@description IsAllColumn
---@see IsAllColumn
---@param pcard Card
---@return any
function Card.IsAllColumn(pcard) end

---@name GetAttribute
---@description GetAttribute
---@see GetAttribute
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.GetAttribute(pcard,scard,sumtype,playerid) end

---@name GetOriginalAttribute
---@description GetOriginalAttribute
---@see GetOriginalAttribute
---@param pcard Card
---@return any
function Card.GetOriginalAttribute(pcard) end

---@name GetRace
---@description GetRace
---@see GetRace
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.GetRace(pcard,scard,sumtype,playerid) end

---@name GetOriginalRace
---@description GetOriginalRace
---@see GetOriginalRace
---@param pcard Card
---@return any
function Card.GetOriginalRace(pcard) end

---@name GetAttack
---@description GetAttack
---@see GetAttack
---@param pcard Card
---@return any
function Card.GetAttack(pcard) end

---@name GetBaseAttack
---@description GetBaseAttack
---@see GetBaseAttack
---@param pcard Card
---@return any
function Card.GetBaseAttack(pcard) end

---@name GetTextAttack
---@description GetTextAttack
---@see GetTextAttack
---@param pcard Card
---@return any
function Card.GetTextAttack(pcard) end

---@name GetDefense
---@description GetDefense
---@see GetDefense
---@param pcard Card
---@return any
function Card.GetDefense(pcard) end

---@name GetBaseDefense
---@description GetBaseDefense
---@see GetBaseDefense
---@param pcard Card
---@return any
function Card.GetBaseDefense(pcard) end

---@name GetTextDefense
---@description GetTextDefense
---@see GetTextDefense
---@param pcard Card
---@return any
function Card.GetTextDefense(pcard) end

---@name GetPreviousCodeOnField
---@description GetPreviousCodeOnField
---@see GetPreviousCodeOnField
---@param pcard Card
---@return any
function Card.GetPreviousCodeOnField(pcard) end

---@name GetPreviousTypeOnField
---@description GetPreviousTypeOnField
---@see GetPreviousTypeOnField
---@param pcard Card
---@return any
function Card.GetPreviousTypeOnField(pcard) end

---@name GetPreviousLevelOnField
---@description GetPreviousLevelOnField
---@see GetPreviousLevelOnField
---@param pcard Card
---@return any
function Card.GetPreviousLevelOnField(pcard) end

---@name GetPreviousRankOnField
---@description GetPreviousRankOnField
---@see GetPreviousRankOnField
---@param pcard Card
---@return any
function Card.GetPreviousRankOnField(pcard) end

---@name GetPreviousAttributeOnField
---@description GetPreviousAttributeOnField
---@see GetPreviousAttributeOnField
---@param pcard Card
---@return any
function Card.GetPreviousAttributeOnField(pcard) end

---@name GetPreviousRaceOnField
---@description GetPreviousRaceOnField
---@see GetPreviousRaceOnField
---@param pcard Card
---@return any
function Card.GetPreviousRaceOnField(pcard) end

---@name GetPreviousAttackOnField
---@description GetPreviousAttackOnField
---@see GetPreviousAttackOnField
---@param pcard Card
---@return any
function Card.GetPreviousAttackOnField(pcard) end

---@name GetPreviousDefenseOnField
---@description GetPreviousDefenseOnField
---@see GetPreviousDefenseOnField
---@param pcard Card
---@return any
function Card.GetPreviousDefenseOnField(pcard) end

---@name GetOwner
---@description GetOwner
---@see GetOwner
---@param pcard Card
---@return any
function Card.GetOwner(pcard) end

---@name GetControler
---@description GetControler
---@see GetControler
---@param pcard Card
---@return any
function Card.GetControler(pcard) end

---@name GetPreviousControler
---@description GetPreviousControler
---@see GetPreviousControler
---@param pcard Card
---@return any
function Card.GetPreviousControler(pcard) end

---@name GetReason
---@description GetReason
---@see GetReason
---@param pcard Card
---@return any
function Card.GetReason(pcard) end

---@name GetReasonCard
---@description GetReasonCard
---@see GetReasonCard
---@param pcard Card
---@return any
function Card.GetReasonCard(pcard) end

---@name GetReasonPlayer
---@description GetReasonPlayer
---@see GetReasonPlayer
---@param pcard Card
---@return any
function Card.GetReasonPlayer(pcard) end

---@name GetReasonEffect
---@description GetReasonEffect
---@see GetReasonEffect
---@param pcard Card
---@return any
function Card.GetReasonEffect(pcard) end

---@name SetReason
---@description SetReason
---@see SetReason
---@param pcard Card
---@param reason number
---@param _3 boolean
---@return any
function Card.SetReason(pcard,reason,_3) end

---@name SetReasonCard
---@description SetReasonCard
---@see SetReasonCard
---@param pcard Card
---@param rcard Card
---@return any
function Card.SetReasonCard(pcard,rcard) end

---@name SetReasonPlayer
---@description SetReasonPlayer
---@see SetReasonPlayer
---@param pcard Card
---@param rp number
---@return any
function Card.SetReasonPlayer(pcard,rp) end

---@name SetReasonEffect
---@description SetReasonEffect
---@see SetReasonEffect
---@param pcard Card
---@param re Effect
---@return any
function Card.SetReasonEffect(pcard,re) end

---@name GetPosition
---@description GetPosition
---@see GetPosition
---@param pcard Card
---@return any
function Card.GetPosition(pcard) end

---@name GetPreviousPosition
---@description GetPreviousPosition
---@see GetPreviousPosition
---@param pcard Card
---@return any
function Card.GetPreviousPosition(pcard) end

---@name GetBattlePosition
---@description GetBattlePosition
---@see GetBattlePosition
---@param pcard Card
---@return any
function Card.GetBattlePosition(pcard) end

---@name GetLocation
---@description GetLocation
---@see GetLocation
---@param pcard Card
---@return any
function Card.GetLocation(pcard) end

---@name GetPreviousLocation
---@description GetPreviousLocation
---@see GetPreviousLocation
---@param pcard Card
---@return any
function Card.GetPreviousLocation(pcard) end

---@name GetSequence
---@description GetSequence
---@see GetSequence
---@param pcard Card
---@return any
function Card.GetSequence(pcard) end

---@name GetPreviousSequence
---@description GetPreviousSequence
---@see GetPreviousSequence
---@param pcard Card
---@return any
function Card.GetPreviousSequence(pcard) end

---@name GetSummonType
---@description GetSummonType
---@see GetSummonType
---@param pcard Card
---@return any
function Card.GetSummonType(pcard) end

---@name GetSummonLocation
---@description GetSummonLocation
---@see GetSummonLocation
---@param pcard Card
---@return any
function Card.GetSummonLocation(pcard) end

---@name GetSummonPlayer
---@description GetSummonPlayer
---@see GetSummonPlayer
---@param pcard Card
---@return any
function Card.GetSummonPlayer(pcard) end

---@name GetDestination
---@description GetDestination
---@see GetDestination
---@param pcard Card
---@return any
function Card.GetDestination(pcard) end

---@name GetLeaveFieldDest
---@description GetLeaveFieldDest
---@see GetLeaveFieldDest
---@param pcard Card
---@return any
function Card.GetLeaveFieldDest(pcard) end

---@name GetTurnID
---@description GetTurnID
---@see GetTurnID
---@param pcard Card
---@return any
function Card.GetTurnID(pcard) end

---@name GetFieldID
---@description GetFieldID
---@see GetFieldID
---@param pcard Card
---@return any
function Card.GetFieldID(pcard) end

---@name GetRealFieldID
---@description GetRealFieldID
---@see GetRealFieldID
---@param pcard Card
---@return any
function Card.GetRealFieldID(pcard) end

---@name GetCardID
---@description GetCardID
---@see GetCardID
---@param pcard Card
---@return any
function Card.GetCardID(pcard) end

---@name IsOriginalCodeRule
---@description IsOriginalCodeRule
---@see IsOriginalCodeRule
---@param pcard Card
---@return any
function Card.IsOriginalCodeRule(pcard) end

---@name IsOriginalCode
---@description IsOriginalCode
---@see IsOriginalCode
---@param pcard Card
---@return any
function Card.IsOriginalCode(pcard) end

---@name IsCode
---@description IsCode
---@see IsCode
---@param pcard Card
---@return any
function Card.IsCode(pcard) end

---@name IsSummonCode
---@description IsSummonCode
---@see IsSummonCode
---@param pcard Card
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsSummonCode(pcard,scard,sumtype,playerid) end

---@name IsSetCard
---@description IsSetCard
---@see IsSetCard
---@param pcard Card
---@param _1 any
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsSetCard(pcard,_1,scard,sumtype,playerid) end

---@name IsOriginalSetCard
---@description IsOriginalSetCard
---@see IsOriginalSetCard
---@param pcard Card
---@return any
function Card.IsOriginalSetCard(pcard) end

---@name IsPreviousSetCard
---@description IsPreviousSetCard
---@see IsPreviousSetCard
---@param pcard Card
---@return any
function Card.IsPreviousSetCard(pcard) end

---@name IsType
---@description IsType
---@see IsType
---@param pcard Card
---@param ttype number
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsType(pcard,ttype,scard,sumtype,playerid) end

---@name IsExactType
---@description IsExactType
---@see IsExactType
---@param pcard Card
---@param ttype number
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsExactType(pcard,ttype,scard,sumtype,playerid) end

---@name IsOriginalType
---@description IsOriginalType
---@see IsOriginalType
---@param pcard Card
---@param ttype number
---@return any
function Card.IsOriginalType(pcard,ttype) end

---@name IsLevel
---@description IsLevel
---@see IsLevel
---@param _1 Card
---@return any
function Card.IsLevel(_1) end

---@name IsRank
---@description IsRank
---@see IsRank
---@param _1 Card
---@return any
function Card.IsRank(_1) end

---@name IsLink
---@description IsLink
---@see IsLink
---@param _1 Card
---@return any
function Card.IsLink(_1) end

---@name IsAttack
---@description IsAttack
---@see IsAttack
---@param pcard Card
---@return any
function Card.IsAttack(pcard) end

---@name IsDefense
---@description IsDefense
---@see IsDefense
---@param pcard Card
---@return any
function Card.IsDefense(pcard) end

---@name IsRace
---@description IsRace
---@see IsRace
---@param pcard Card
---@param trace number
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsRace(pcard,trace,scard,sumtype,playerid) end

---@name IsOriginalRace
---@description IsOriginalRace
---@see IsOriginalRace
---@param pcard Card
---@param trace number
---@return any
function Card.IsOriginalRace(pcard,trace) end

---@name IsAttribute
---@description IsAttribute
---@see IsAttribute
---@param pcard Card
---@param tattrib number
---@param scard Card
---@param sumtype number
---@param playerid number
---@return any
function Card.IsAttribute(pcard,tattrib,scard,sumtype,playerid) end

---@name IsOriginalAttribute
---@description IsOriginalAttribute
---@see IsOriginalAttribute
---@param pcard Card
---@param tattrib number
---@return any
function Card.IsOriginalAttribute(pcard,tattrib) end

---@name IsReason
---@description IsReason
---@see IsReason
---@param pcard Card
---@param treason number
---@return any
function Card.IsReason(pcard,treason) end

---@name IsSummonType
---@description IsSummonType
---@see IsSummonType
---@param pcard Card
---@return any
function Card.IsSummonType(pcard) end

---@name IsSummonLocation
---@description IsSummonLocation
---@see IsSummonLocation
---@param pcard Card
---@param loc number
---@return any
function Card.IsSummonLocation(pcard,loc) end

---@name IsSummonPlayer
---@description IsSummonPlayer
---@see IsSummonPlayer
---@param pcard Card
---@param player number
---@return any
function Card.IsSummonPlayer(pcard,player) end

---@name IsStatus
---@description IsStatus
---@see IsStatus
---@param pcard Card
---@param tstatus number
---@return any
function Card.IsStatus(pcard,tstatus) end

---@name IsNotTuner
---@description IsNotTuner
---@see IsNotTuner
---@param pcard Card
---@param scard Card
---@param playerid number
---@return any
function Card.IsNotTuner(pcard,scard,playerid) end

---@name SetStatus
---@description SetStatus
---@see SetStatus
---@param pcard Card
---@param tstatus number
---@param enable boolean
---@return any
function Card.SetStatus(pcard,tstatus,enable) end

---@name IsGeminiState
---@description IsGeminiState
---@see IsGeminiState
---@param pcard Card
---@return any
function Card.IsGeminiState(pcard) end

---@name EnableGeminiState
---@description EnableGeminiState
---@see EnableGeminiState
---@param pcard Card
---@return any
function Card.EnableGeminiState(pcard) end

---@name SetTurnCounter
---@description SetTurnCounter
---@see SetTurnCounter
---@param pcard Card
---@param ct number
---@return any
function Card.SetTurnCounter(pcard,ct) end

---@name GetTurnCounter
---@description GetTurnCounter
---@see GetTurnCounter
---@param pcard Card
---@return any
function Card.GetTurnCounter(pcard) end

---@name SetMaterial
---@description SetMaterial
---@see SetMaterial
---@param pcard Card
---@return any
function Card.SetMaterial(pcard) end

---@name GetMaterial
---@description GetMaterial
---@see GetMaterial
---@param pcard Card
---@return any
function Card.GetMaterial(pcard) end

---@name GetMaterialCount
---@description GetMaterialCount
---@see GetMaterialCount
---@param pcard Card
---@return any
function Card.GetMaterialCount(pcard) end

---@name GetEquipGroup
---@description GetEquipGroup
---@see GetEquipGroup
---@param pcard Card
---@return any
function Card.GetEquipGroup(pcard) end

---@name GetEquipCount
---@description GetEquipCount
---@see GetEquipCount
---@param pcard Card
---@return any
function Card.GetEquipCount(pcard) end

---@name GetEquipTarget
---@description GetEquipTarget
---@see GetEquipTarget
---@param pcard Card
---@return any
function Card.GetEquipTarget(pcard) end

---@name GetPreviousEquipTarget
---@description GetPreviousEquipTarget
---@see GetPreviousEquipTarget
---@param pcard Card
---@return any
function Card.GetPreviousEquipTarget(pcard) end

---@name CheckEquipTarget
---@description CheckEquipTarget
---@see CheckEquipTarget
---@param pcard Card
---@param target Card
---@return any
function Card.CheckEquipTarget(pcard,target) end

---@name CheckUnionTarget
---@description CheckUnionTarget
---@see CheckUnionTarget
---@param pcard Card
---@param target Card
---@return any
function Card.CheckUnionTarget(pcard,target) end

---@name GetUnionCount
---@description GetUnionCount
---@see GetUnionCount
---@param pcard Card
---@return any
function Card.GetUnionCount(pcard) end

---@name GetOverlayGroup
---@description GetOverlayGroup
---@see GetOverlayGroup
---@param pcard Card
---@return any
function Card.GetOverlayGroup(pcard) end

---@name GetOverlayCount
---@description GetOverlayCount
---@see GetOverlayCount
---@param pcard Card
---@return any
function Card.GetOverlayCount(pcard) end

---@name GetOverlayTarget
---@description GetOverlayTarget
---@see GetOverlayTarget
---@param pcard Card
---@return any
function Card.GetOverlayTarget(pcard) end

---@name CheckRemoveOverlayCard
---@description CheckRemoveOverlayCard
---@see CheckRemoveOverlayCard
---@param pcard Card
---@param playerid number
---@param count number
---@param reason number
---@return any
function Card.CheckRemoveOverlayCard(pcard,playerid,count,reason) end

---@name RemoveOverlayCard
---@description RemoveOverlayCard
---@see RemoveOverlayCard
---@param pcard Card
---@param playerid number
---@param min number
---@param max number
---@param reason number
---@return any
function Card.RemoveOverlayCard(pcard,playerid,min,max,reason) end

---@name GetAttackedGroup
---@description GetAttackedGroup
---@see GetAttackedGroup
---@param pcard Card
---@return any
function Card.GetAttackedGroup(pcard) end

---@name GetAttackedGroupCount
---@description GetAttackedGroupCount
---@see GetAttackedGroupCount
---@param pcard Card
---@return any
function Card.GetAttackedGroupCount(pcard) end

---@name GetAttackedCount
---@description GetAttackedCount
---@see GetAttackedCount
---@param pcard Card
---@return any
function Card.GetAttackedCount(pcard) end

---@name GetBattledGroup
---@description GetBattledGroup
---@see GetBattledGroup
---@param pcard Card
---@return any
function Card.GetBattledGroup(pcard) end

---@name GetBattledGroupCount
---@description GetBattledGroupCount
---@see GetBattledGroupCount
---@param pcard Card
---@return any
function Card.GetBattledGroupCount(pcard) end

---@name GetAttackAnnouncedCount
---@description GetAttackAnnouncedCount
---@see GetAttackAnnouncedCount
---@param pcard Card
---@return any
function Card.GetAttackAnnouncedCount(pcard) end

---@name IsDirectAttacked
---@description IsDirectAttacked
---@see IsDirectAttacked
---@param pcard Card
---@return any
function Card.IsDirectAttacked(pcard) end

---@name SetCardTarget
---@description SetCardTarget
---@see SetCardTarget
---@param pcard Card
---@param ocard Card
---@return any
function Card.SetCardTarget(pcard,ocard) end

---@name GetCardTarget
---@description GetCardTarget
---@see GetCardTarget
---@param pcard Card
---@return any
function Card.GetCardTarget(pcard) end

---@name GetFirstCardTarget
---@description GetFirstCardTarget
---@see GetFirstCardTarget
---@param pcard Card
---@return any
function Card.GetFirstCardTarget(pcard) end

---@name GetCardTargetCount
---@description GetCardTargetCount
---@see GetCardTargetCount
---@param pcard Card
---@return any
function Card.GetCardTargetCount(pcard) end

---@name IsHasCardTarget
---@description IsHasCardTarget
---@see IsHasCardTarget
---@param pcard Card
---@param rcard Card
---@return any
function Card.IsHasCardTarget(pcard,rcard) end

---@name CancelCardTarget
---@description CancelCardTarget
---@see CancelCardTarget
---@param pcard Card
---@param rcard Card
---@return any
function Card.CancelCardTarget(pcard,rcard) end

---@name GetOwnerTarget
---@description GetOwnerTarget
---@see GetOwnerTarget
---@param pcard Card
---@return any
function Card.GetOwnerTarget(pcard) end

---@name GetOwnerTargetCount
---@description GetOwnerTargetCount
---@see GetOwnerTargetCount
---@param pcard Card
---@return any
function Card.GetOwnerTargetCount(pcard) end

---@name GetActivateEffect
---@description GetActivateEffect
---@see GetActivateEffect
---@param pcard Card
---@return any
function Card.GetActivateEffect(pcard) end

---@name CheckActivateEffect
---@description CheckActivateEffect
---@see CheckActivateEffect
---@param pcard Card
---@param neglect_con boolean
---@param neglect_cost boolean
---@param copy_info boolean
---@return any
function Card.CheckActivateEffect(pcard,neglect_con,neglect_cost,copy_info) end

---@name RegisterEffect
---@description RegisterEffect
---@see RegisterEffect
---@param pcard Card
---@param peffect Effect
---@param forced boolean
---@return any
function Card.RegisterEffect(pcard,peffect,forced) end

---@name IsHasEffect
---@description IsHasEffect
---@see IsHasEffect
---@param pcard Card
---@param code number
---@param check_player number
---@return any
function Card.IsHasEffect(pcard,code,check_player) end

---@name GetCardEffect
---@description GetCardEffect
---@see GetCardEffect
---@param pcard Card
---@param code number
---@return any
function Card.GetCardEffect(pcard,code) end

---@name ResetEffect
---@description ResetEffect
---@see ResetEffect
---@param pcard Card
---@param code number
---@param type number
---@return any
function Card.ResetEffect(pcard,code,type) end

---@name GetEffectCount
---@description GetEffectCount
---@see GetEffectCount
---@param pcard Card
---@param code number
---@return any
function Card.GetEffectCount(pcard,code) end

---@name RegisterFlagEffect
---@description RegisterFlagEffect
---@see RegisterFlagEffect
---@param pcard Card
---@param code number
---@param reset number
---@param flag number
---@param count number
---@param lab lua_Integer
---@param desc number
---@return any
function Card.RegisterFlagEffect(pcard,code,reset,flag,count,lab,desc) end

---@name GetFlagEffect
---@description GetFlagEffect
---@see GetFlagEffect
---@param pcard Card
---@param code number
---@return any
function Card.GetFlagEffect(pcard,code) end

---@name ResetFlagEffect
---@description ResetFlagEffect
---@see ResetFlagEffect
---@param pcard Card
---@param code number
---@return any
function Card.ResetFlagEffect(pcard,code) end

---@name SetFlagEffectLabel
---@description SetFlagEffectLabel
---@see SetFlagEffectLabel
---@param pcard Card
---@param code number
---@param lab number
---@return any
function Card.SetFlagEffectLabel(pcard,code,lab) end

---@name GetFlagEffectLabel
---@description GetFlagEffectLabel
---@see GetFlagEffectLabel
---@param pcard Card
---@param code number
---@return any
function Card.GetFlagEffectLabel(pcard,code) end

---@name CreateRelation
---@description CreateRelation
---@see CreateRelation
---@param pcard Card
---@param rcard Card
---@param reset number
---@return any
function Card.CreateRelation(pcard,rcard,reset) end

---@name ReleaseRelation
---@description ReleaseRelation
---@see ReleaseRelation
---@param pcard Card
---@param rcard Card
---@return any
function Card.ReleaseRelation(pcard,rcard) end

---@name CreateEffectRelation
---@description CreateEffectRelation
---@see CreateEffectRelation
---@param pcard Card
---@param peffect Effect
---@return any
function Card.CreateEffectRelation(pcard,peffect) end

---@name ReleaseEffectRelation
---@description ReleaseEffectRelation
---@see ReleaseEffectRelation
---@param pcard Card
---@param peffect Effect
---@return any
function Card.ReleaseEffectRelation(pcard,peffect) end

---@name ClearEffectRelation
---@description ClearEffectRelation
---@see ClearEffectRelation
---@param pcard Card
---@return any
function Card.ClearEffectRelation(pcard) end

---@name IsRelateToEffect
---@description IsRelateToEffect
---@see IsRelateToEffect
---@param pcard Card
---@param peffect Effect
---@return any
function Card.IsRelateToEffect(pcard,peffect) end

---@name IsRelateToChain
---@description IsRelateToChain
---@see IsRelateToChain
---@param pcard Card
---@param chain_count number
---@return any
function Card.IsRelateToChain(pcard,chain_count) end

---@name IsRelateToCard
---@description IsRelateToCard
---@see IsRelateToCard
---@param pcard Card
---@param rcard Card
---@return any
function Card.IsRelateToCard(pcard,rcard) end

---@name IsRelateToBattle
---@description IsRelateToBattle
---@see IsRelateToBattle
---@param pcard Card
---@return any
function Card.IsRelateToBattle(pcard) end

---@name CopyEffect
---@description CopyEffect
---@see CopyEffect
---@param pcard Card
---@param code number
---@param reset number
---@param count number
---@return any
function Card.CopyEffect(pcard,code,reset,count) end

---@name ReplaceEffect
---@description ReplaceEffect
---@see ReplaceEffect
---@param pcard Card
---@param code number
---@param reset number
---@param count number
---@return any
function Card.ReplaceEffect(pcard,code,reset,count) end

---@name EnableUnsummonable
---@description EnableUnsummonable
---@see EnableUnsummonable
---@param pcard Card
---@return any
function Card.EnableUnsummonable(pcard) end

---@name EnableReviveLimit
---@description EnableReviveLimit
---@see EnableReviveLimit
---@param pcard Card
---@return any
function Card.EnableReviveLimit(pcard) end

---@name CompleteProcedure
---@description CompleteProcedure
---@see CompleteProcedure
---@param pcard Card
---@return any
function Card.CompleteProcedure(pcard) end

---@name IsDisabled
---@description IsDisabled
---@see IsDisabled
---@param pcard Card
---@return any
function Card.IsDisabled(pcard) end

---@name IsDestructable
---@description IsDestructable
---@see IsDestructable
---@param pcard Card
---@param peffect Effect
---@return any
function Card.IsDestructable(pcard,peffect) end

---@name IsSummonableCard
---@description IsSummonableCard
---@see IsSummonableCard
---@param pcard Card
---@return any
function Card.IsSummonableCard(pcard) end

---@name IsSpecialSummonable
---@description IsSpecialSummonable
---@see IsSpecialSummonable
---@param pcard Card
---@param sumtype number
---@return any
function Card.IsSpecialSummonable(pcard,sumtype) end

---@name IsFusionSummonableCard
---@description IsFusionSummonableCard
---@see IsFusionSummonableCard
---@param pcard Card
---@param summon_type number
---@return any
function Card.IsFusionSummonableCard(pcard,summon_type) end

---@name IsSynchroSummonable
---@description IsSynchroSummonable
---@see IsSynchroSummonable
---@return any
function Card.IsSynchroSummonable() end

---@name IsXyzSummonable
---@description IsXyzSummonable
---@see IsXyzSummonable
---@return any
function Card.IsXyzSummonable() end

---@name IsLinkSummonable
---@description IsLinkSummonable
---@see IsLinkSummonable
---@return any
function Card.IsLinkSummonable() end

---@name IsProcedureSummonable
---@description IsProcedureSummonable
---@see IsProcedureSummonable
---@param _0 any
---@param cardtype number
---@param sumtype number
---@return any
function Card.IsProcedureSummonable(_0,cardtype,sumtype) end

---@name IsSummonable
---@description IsSummonable
---@see IsSummonable
---@param pcard Card
---@param ign boolean
---@param peffect Effect
---@param minc number
---@param zone number
---@return any
function Card.IsSummonable(pcard,ign,peffect,minc,zone) end

---@name IsMSetable
---@description IsMSetable
---@see IsMSetable
---@param pcard Card
---@param ign boolean
---@param peffect Effect
---@param minc number
---@param zone number
---@return any
function Card.IsMSetable(pcard,ign,peffect,minc,zone) end

---@name IsSSetable
---@description IsSSetable
---@see IsSSetable
---@param pcard Card
---@param ign boolean
---@return any
function Card.IsSSetable(pcard,ign) end

---@name IsCanBeSpecialSummoned
---@description IsCanBeSpecialSummoned
---@see IsCanBeSpecialSummoned
---@param pcard Card
---@param peffect Effect
---@param sumtype number
---@param sumplayer number
---@param nocheck boolean
---@param nolimit boolean
---@param sumpos number
---@param _7 any
---@param zone number
---@return any
function Card.IsCanBeSpecialSummoned(pcard,peffect,sumtype,sumplayer,nocheck,nolimit,sumpos,_7,zone) end

---@name IsAbleToHand
---@description IsAbleToHand
---@see IsAbleToHand
---@param pcard Card
---@return any
function Card.IsAbleToHand(pcard) end

---@name IsAbleToDeck
---@description IsAbleToDeck
---@see IsAbleToDeck
---@param pcard Card
---@return any
function Card.IsAbleToDeck(pcard) end

---@name IsAbleToExtra
---@description IsAbleToExtra
---@see IsAbleToExtra
---@param pcard Card
---@return any
function Card.IsAbleToExtra(pcard) end

---@name IsAbleToGrave
---@description IsAbleToGrave
---@see IsAbleToGrave
---@param pcard Card
---@return any
function Card.IsAbleToGrave(pcard) end

---@name IsAbleToRemove
---@description IsAbleToRemove
---@see IsAbleToRemove
---@param pcard Card
---@param _1 any
---@param pos number
---@param reason number
---@return any
function Card.IsAbleToRemove(pcard,_1,pos,reason) end

---@name IsAbleToHandAsCost
---@description IsAbleToHandAsCost
---@see IsAbleToHandAsCost
---@param pcard Card
---@return any
function Card.IsAbleToHandAsCost(pcard) end

---@name IsAbleToDeckAsCost
---@description IsAbleToDeckAsCost
---@see IsAbleToDeckAsCost
---@param pcard Card
---@return any
function Card.IsAbleToDeckAsCost(pcard) end

---@name IsAbleToExtraAsCost
---@description IsAbleToExtraAsCost
---@see IsAbleToExtraAsCost
---@param pcard Card
---@return any
function Card.IsAbleToExtraAsCost(pcard) end

---@name IsAbleToDeckOrExtraAsCost
---@description IsAbleToDeckOrExtraAsCost
---@see IsAbleToDeckOrExtraAsCost
---@param pcard Card
---@return any
function Card.IsAbleToDeckOrExtraAsCost(pcard) end

---@name IsAbleToGraveAsCost
---@description IsAbleToGraveAsCost
---@see IsAbleToGraveAsCost
---@param pcard Card
---@return any
function Card.IsAbleToGraveAsCost(pcard) end

---@name IsAbleToRemoveAsCost
---@description IsAbleToRemoveAsCost
---@see IsAbleToRemoveAsCost
---@param pcard Card
---@param pos number
---@return any
function Card.IsAbleToRemoveAsCost(pcard,pos) end

---@name IsReleasable
---@description IsReleasable
---@see IsReleasable
---@param pcard Card
---@return any
function Card.IsReleasable(pcard) end

---@name IsReleasableByEffect
---@description IsReleasableByEffect
---@see IsReleasableByEffect
---@param pcard Card
---@return any
function Card.IsReleasableByEffect(pcard) end

---@name IsDiscardable
---@description IsDiscardable
---@see IsDiscardable
---@param pcard Card
---@param reason number
---@return any
function Card.IsDiscardable(pcard,reason) end

---@name CanAttack
---@description CanAttack
---@see CanAttack
---@param pcard Card
---@return any
function Card.CanAttack(pcard) end

---@name CanChainAttack
---@description CanChainAttack
---@see CanChainAttack
---@param pcard Card
---@param ac number
---@param monsteronly boolean
---@return any
function Card.CanChainAttack(pcard,ac,monsteronly) end

---@name IsFaceup
---@description IsFaceup
---@see IsFaceup
---@param pcard Card
---@return any
function Card.IsFaceup(pcard) end

---@name IsAttackPos
---@description IsAttackPos
---@see IsAttackPos
---@param pcard Card
---@return any
function Card.IsAttackPos(pcard) end

---@name IsFacedown
---@description IsFacedown
---@see IsFacedown
---@param pcard Card
---@return any
function Card.IsFacedown(pcard) end

---@name IsDefensePos
---@description IsDefensePos
---@see IsDefensePos
---@param pcard Card
---@return any
function Card.IsDefensePos(pcard) end

---@name IsPosition
---@description IsPosition
---@see IsPosition
---@param pcard Card
---@param pos number
---@return any
function Card.IsPosition(pcard,pos) end

---@name IsPreviousPosition
---@description IsPreviousPosition
---@see IsPreviousPosition
---@param pcard Card
---@param pos number
---@return any
function Card.IsPreviousPosition(pcard,pos) end

---@name IsControler
---@description IsControler
---@see IsControler
---@param pcard Card
---@param con number
---@return any
function Card.IsControler(pcard,con) end

---@name IsPreviousControler
---@description IsPreviousControler
---@see IsPreviousControler
---@param pcard Card
---@param con number
---@return any
function Card.IsPreviousControler(pcard,con) end

---@name IsOnField
---@description IsOnField
---@see IsOnField
---@param pcard Card
---@return any
function Card.IsOnField(pcard) end

---@name IsLocation
---@description IsLocation
---@see IsLocation
---@param pcard Card
---@param loc number
---@return any
function Card.IsLocation(pcard,loc) end

---@name IsPreviousLocation
---@description IsPreviousLocation
---@see IsPreviousLocation
---@param pcard Card
---@param loc number
---@return any
function Card.IsPreviousLocation(pcard,loc) end

---@name IsLevelBelow
---@description IsLevelBelow
---@see IsLevelBelow
---@param pcard Card
---@param lvl number
---@return any
function Card.IsLevelBelow(pcard,lvl) end

---@name IsLevelAbove
---@description IsLevelAbove
---@see IsLevelAbove
---@param pcard Card
---@param lvl number
---@return any
function Card.IsLevelAbove(pcard,lvl) end

---@name IsRankBelow
---@description IsRankBelow
---@see IsRankBelow
---@param pcard Card
---@param rnk number
---@return any
function Card.IsRankBelow(pcard,rnk) end

---@name IsRankAbove
---@description IsRankAbove
---@see IsRankAbove
---@param pcard Card
---@param rnk number
---@return any
function Card.IsRankAbove(pcard,rnk) end

---@name IsLinkBelow
---@description IsLinkBelow
---@see IsLinkBelow
---@param pcard Card
---@param lnk number
---@return any
function Card.IsLinkBelow(pcard,lnk) end

---@name IsLinkAbove
---@description IsLinkAbove
---@see IsLinkAbove
---@param pcard Card
---@param lnk number
---@return any
function Card.IsLinkAbove(pcard,lnk) end

---@name IsAttackBelow
---@description IsAttackBelow
---@see IsAttackBelow
---@param pcard Card
---@param atk number
---@return any
function Card.IsAttackBelow(pcard,atk) end

---@name IsAttackAbove
---@description IsAttackAbove
---@see IsAttackAbove
---@param pcard Card
---@param atk number
---@return any
function Card.IsAttackAbove(pcard,atk) end

---@name IsDefenseBelow
---@description IsDefenseBelow
---@see IsDefenseBelow
---@param pcard Card
---@param def number
---@return any
function Card.IsDefenseBelow(pcard,def) end

---@name IsDefenseAbove
---@description IsDefenseAbove
---@see IsDefenseAbove
---@param pcard Card
---@param def number
---@return any
function Card.IsDefenseAbove(pcard,def) end

---@name IsPublic
---@description IsPublic
---@see IsPublic
---@param pcard Card
---@return any
function Card.IsPublic(pcard) end

---@name IsForbidden
---@description IsForbidden
---@see IsForbidden
---@param pcard Card
---@return any
function Card.IsForbidden(pcard) end

---@name IsAbleToChangeControler
---@description IsAbleToChangeControler
---@see IsAbleToChangeControler
---@param pcard Card
---@return any
function Card.IsAbleToChangeControler(pcard) end

---@name IsControlerCanBeChanged
---@description IsControlerCanBeChanged
---@see IsControlerCanBeChanged
---@param pcard Card
---@param ign boolean
---@param zone number
---@return any
function Card.IsControlerCanBeChanged(pcard,ign,zone) end

---@name AddCounter
---@description AddCounter
---@see AddCounter
---@param pcard Card
---@param countertype number
---@param count number
---@param singly boolean
---@return any
function Card.AddCounter(pcard,countertype,count,singly) end

---@name RemoveCounter
---@description RemoveCounter
---@see RemoveCounter
---@param pcard Card
---@param rplayer number
---@param countertype number
---@param count number
---@param reason number
---@return any
function Card.RemoveCounter(pcard,rplayer,countertype,count,reason) end

---@name RemoveAllCounters
---@description RemoveAllCounters
---@see RemoveAllCounters
---@param pcard Card
---@return any
function Card.RemoveAllCounters(pcard) end

---@name GetCounter
---@description GetCounter
---@see GetCounter
---@param pcard Card
---@param countertype number
---@return any
function Card.GetCounter(pcard,countertype) end

---@name GetAllCounters
---@description GetAllCounters
---@see GetAllCounters
---@param pcard Card
---@return any
function Card.GetAllCounters(pcard) end

---@name HasCounters
---@description HasCounters
---@see HasCounters
---@param pcard Card
---@return any
function Card.HasCounters(pcard) end

---@name EnableCounterPermit
---@description EnableCounterPermit
---@see EnableCounterPermit
---@param pcard Card
---@param countertype number
---@param prange number
---@return any
function Card.EnableCounterPermit(pcard,countertype,prange) end

---@name SetCounterLimit
---@description SetCounterLimit
---@see SetCounterLimit
---@param pcard Card
---@param countertype number
---@param limit number
---@return any
function Card.SetCounterLimit(pcard,countertype,limit) end

---@name IsCanChangePosition
---@description IsCanChangePosition
---@see IsCanChangePosition
---@param pcard Card
---@return any
function Card.IsCanChangePosition(pcard) end

---@name IsCanTurnSet
---@description IsCanTurnSet
---@see IsCanTurnSet
---@param pcard Card
---@return any
function Card.IsCanTurnSet(pcard) end

---@name IsCanAddCounter
---@description IsCanAddCounter
---@see IsCanAddCounter
---@param pcard Card
---@param countertype number
---@param count number
---@param singly boolean
---@param loc number
---@return any
function Card.IsCanAddCounter(pcard,countertype,count,singly,loc) end

---@name IsCanRemoveCounter
---@description IsCanRemoveCounter
---@see IsCanRemoveCounter
---@param pcard Card
---@param playerid number
---@param countertype number
---@param count number
---@param reason number
---@return any
function Card.IsCanRemoveCounter(pcard,playerid,countertype,count,reason) end

---@name IsCanBeFusionMaterial
---@description IsCanBeFusionMaterial
---@see IsCanBeFusionMaterial
---@param pcard Card
---@param fcard Card
---@param summon_type number
---@return any
function Card.IsCanBeFusionMaterial(pcard,fcard,summon_type) end

---@name IsCanBeSynchroMaterial
---@description IsCanBeSynchroMaterial
---@see IsCanBeSynchroMaterial
---@param pcard Card
---@param scard Card
---@param tuner Card
---@param playerid number
---@return any
function Card.IsCanBeSynchroMaterial(pcard,scard,tuner,playerid) end

---@name IsCanBeRitualMaterial
---@description IsCanBeRitualMaterial
---@see IsCanBeRitualMaterial
---@param pcard Card
---@param scard Card
---@return any
function Card.IsCanBeRitualMaterial(pcard,scard) end

---@name IsCanBeXyzMaterial
---@description IsCanBeXyzMaterial
---@see IsCanBeXyzMaterial
---@param pcard Card
---@param scard Card
---@param _2 any
---@param reason number
---@return any
function Card.IsCanBeXyzMaterial(pcard,scard,_2,reason) end

---@name IsCanBeLinkMaterial
---@description IsCanBeLinkMaterial
---@see IsCanBeLinkMaterial
---@param pcard Card
---@param scard Card
---@param playerid number
---@return any
function Card.IsCanBeLinkMaterial(pcard,scard,playerid) end

---@name IsCanBeMaterial
---@description IsCanBeMaterial
---@see IsCanBeMaterial
---@param pcard Card
---@param sumtype number
---@param scard Card
---@param playerid number
---@return any
function Card.IsCanBeMaterial(pcard,sumtype,scard,playerid) end

---@name CheckFusionMaterial
---@description CheckFusionMaterial
---@see CheckFusionMaterial
---@param pcard Card
---@param pgroup Group
---@param cg Group
---@param chkf number
---@return any
function Card.CheckFusionMaterial(pcard,pgroup,cg,chkf) end

---@name CheckFusionSubstitute
---@description CheckFusionSubstitute
---@see CheckFusionSubstitute
---@param pcard Card
---@param fcard Card
---@return any
function Card.CheckFusionSubstitute(pcard,fcard) end

---@name IsImmuneToEffect
---@description IsImmuneToEffect
---@see IsImmuneToEffect
---@param pcard Card
---@param peffect Effect
---@return any
function Card.IsImmuneToEffect(pcard,peffect) end

---@name IsCanBeDisabledByEffect
---@description IsCanBeDisabledByEffect
---@see IsCanBeDisabledByEffect
---@param pcard Card
---@param peffect Effect
---@param is_monster_effect boolean
---@return any
function Card.IsCanBeDisabledByEffect(pcard,peffect,is_monster_effect) end

---@name IsCanBeEffectTarget
---@description IsCanBeEffectTarget
---@see IsCanBeEffectTarget
---@param pcard Card
---@param peffect Effect
---@return any
function Card.IsCanBeEffectTarget(pcard,peffect) end

---@name IsCanBeBattleTarget
---@description IsCanBeBattleTarget
---@see IsCanBeBattleTarget
---@param pcard Card
---@param bcard Card
---@return any
function Card.IsCanBeBattleTarget(pcard,bcard) end

---@name AddMonsterAttribute
---@description AddMonsterAttribute
---@see AddMonsterAttribute
---@param pcard Card
---@param type number
---@param attribute number
---@param race number
---@param level number
---@param atk number
---@param def number
---@return any
function Card.AddMonsterAttribute(pcard,type,attribute,race,level,atk,def) end

---@name AddMonsterAttributeComplete
---@description AddMonsterAttributeComplete
---@see AddMonsterAttributeComplete
---@return any
function Card.AddMonsterAttributeComplete() end

---@name CancelToGrave
---@description CancelToGrave
---@see CancelToGrave
---@param pcard Card
---@param cancel boolean
---@return any
function Card.CancelToGrave(pcard,cancel) end

---@name GetTributeRequirement
---@description GetTributeRequirement
---@see GetTributeRequirement
---@param pcard Card
---@return any
function Card.GetTributeRequirement(pcard) end

---@name GetBattleTarget
---@description GetBattleTarget
---@see GetBattleTarget
---@param pcard Card
---@return any
function Card.GetBattleTarget(pcard) end

---@name GetAttackableTarget
---@description GetAttackableTarget
---@see GetAttackableTarget
---@param pcard Card
---@return any
function Card.GetAttackableTarget(pcard) end

---@name SetHint
---@description SetHint
---@see SetHint
---@param pcard Card
---@param type number
---@param value number
---@return any
function Card.SetHint(pcard,type,value) end

---@name ReverseInDeck
---@description ReverseInDeck
---@see ReverseInDeck
---@param pcard Card
---@return any
function Card.ReverseInDeck(pcard) end

---@name SetUniqueOnField
---@description SetUniqueOnField
---@see SetUniqueOnField
---@param pcard Card
---@param _2 number
---@param _3 number
---@param unique_code number
---@param location number
---@return any
function Card.SetUniqueOnField(pcard,_2,_3,unique_code,location) end

---@name CheckUniqueOnField
---@description CheckUniqueOnField
---@see CheckUniqueOnField
---@param pcard Card
---@param check_player number
---@param check_location number
---@param icard Card
---@return any
function Card.CheckUniqueOnField(pcard,check_player,check_location,icard) end

---@name ResetNegateEffect
---@description ResetNegateEffect
---@see ResetNegateEffect
---@param pcard Card
---@return any
function Card.ResetNegateEffect(pcard) end

---@name AssumeProperty
---@description AssumeProperty
---@see AssumeProperty
---@param pcard Card
---@param assume number
---@param _3 number
---@return any
function Card.AssumeProperty(pcard,assume,_3) end

---@name SetSPSummonOnce
---@description SetSPSummonOnce
---@see SetSPSummonOnce
---@param pcard Card
---@param spsummon_code number
---@return any
function Card.SetSPSummonOnce(pcard,spsummon_code) end

---@name lua_name
---@description lua_name
---@see lua_name
---@param pcard Card
---@return any
function Card.lua_name(pcard) end

---@name Setcode
---@description Setcode
---@see Setcode
---@param pcard Card
---@param _2 number
---@return any
function Card.Setcode(pcard,_2) end

---@name Recreate
---@description Recreate
---@see Recreate
---@param pcard Card
---@param code number
---@param _2 any
---@param _3 number
---@param _4 any
---@param _5 any
---@param _6 any
---@param _7 any
---@param _8 any
---@param _9 any
---@param _10 any
---@param _11 any
---@param _12 any
---@param _14 boolean
---@return any
function Card.Recreate(pcard,code,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_14) end

---@name Cover
---@description Cover
---@see Cover
---@param pcard Card 
---@param cover number 
---@return any
function Card.Cover(pcard,cover) end