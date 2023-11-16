---@class Effect
Effect = {}

---@name CreateEffect
---@description CreateEffect
---@see CreateEffect
---@param pcard Card 
---@return any
function Effect.CreateEffect(pcard) end

---@name GlobalEffect
---@description GlobalEffect
---@see GlobalEffect
---@return any
function Effect.GlobalEffect() end

---@name Clone
---@description Clone
---@see Clone
---@param peffect Effect 
---@return any
function Effect.Clone(peffect) end

---@name Reset
---@description Reset
---@see Reset
---@param peffect Effect 
---@return any
function Effect.Reset(peffect) end

---@name GetFieldID
---@description GetFieldID
---@see GetFieldID
---@param peffect Effect 
---@return any
function Effect.GetFieldID(peffect) end

---@name SetDescription
---@description SetDescription
---@see SetDescription
---@param peffect Effect 
---@param description number 
---@return any
function Effect.SetDescription(peffect,description) end

---@name SetCode
---@description SetCode
---@see SetCode
---@param peffect Effect 
---@param code number 
---@return any
function Effect.SetCode(peffect,code) end

---@name SetRange
---@description SetRange
---@see SetRange
---@param peffect Effect 
---@param range number 
---@return any
function Effect.SetRange(peffect,range) end

---@name SetTargetRange
---@description SetTargetRange
---@see SetTargetRange
---@param peffect Effect 
---@param s_range number 
---@param o_range number 
---@return any
function Effect.SetTargetRange(peffect,s_range,o_range) end

---@name SetAbsoluteRange
---@description SetAbsoluteRange
---@see SetAbsoluteRange
---@param peffect Effect 
---@param playerid number 
---@param s number 
---@param o number 
---@return any
function Effect.SetAbsoluteRange(peffect,playerid,s,o) end

---@name SetCountLimit
---@description SetCountLimit
---@see SetCountLimit
---@param peffect Effect 
---@param count number 
---@param code number 
---@param flag number 
---@return any
function Effect.SetCountLimit(peffect,count,code,flag) end

---@name SetReset
---@description SetReset
---@see SetReset
---@param peffect Effect 
---@param v number 
---@param c number 
---@return any
function Effect.SetReset(peffect,v,c) end

---@name SetType
---@description SetType
---@see SetType
---@param peffect Effect 
---@param v number 
---@return any
function Effect.SetType(peffect,v) end

---@name SetProperty
---@description SetProperty
---@see SetProperty
---@param peffect Effect 
---@param v1 number 
---@param v2 number 
---@return any
function Effect.SetProperty(peffect,v1,v2) end

---@name SetLabel
---@description SetLabel
---@see SetLabel
---@param peffect Effect 
---@return any
function Effect.SetLabel(peffect) end

---@name SetLabelObject
---@description SetLabelObject
---@see SetLabelObject
---@param peffect Effect 
---@param _2 Lua_obj 
---@return any
function Effect.SetLabelObject(peffect,_2) end

---@name SetCategory
---@description SetCategory
---@see SetCategory
---@param peffect Effect 
---@param v number 
---@return any
function Effect.SetCategory(peffect,v) end

---@name SetHintTiming
---@description SetHintTiming
---@see SetHintTiming
---@param peffect Effect 
---@param vs number 
---@return any
function Effect.SetHintTiming(peffect,vs) end

---@name SetCondition
---@description SetCondition
---@see SetCondition
---@param peffect Effect 
---@param findex Function 
---@return any
function Effect.SetCondition(peffect,findex) end

---@name SetTarget
---@description SetTarget
---@see SetTarget
---@param peffect Effect 
---@param findex Function 
---@return any
function Effect.SetTarget(peffect,findex) end

---@name SetCost
---@description SetCost
---@see SetCost
---@param peffect Effect 
---@param findex Function 
---@return any
function Effect.SetCost(peffect,findex) end

---@name SetValue
---@description SetValue
---@see SetValue
---@param peffect Effect 
---@param value number 
---@return any
function Effect.SetValue(peffect,value) end

---@name SetOperation
---@description SetOperation
---@see SetOperation
---@param peffect Effect 
---@param findex Function 
---@return any
function Effect.SetOperation(peffect,findex) end

---@name SetOwnerPlayer
---@description SetOwnerPlayer
---@see SetOwnerPlayer
---@param peffect Effect 
---@param p number 
---@return any
function Effect.SetOwnerPlayer(peffect,p) end

---@name GetDescription
---@description GetDescription
---@see GetDescription
---@param peffect Effect 
---@return any
function Effect.GetDescription(peffect) end

---@name GetCode
---@description GetCode
---@see GetCode
---@param peffect Effect 
---@return any
function Effect.GetCode(peffect) end

---@name GetRange
---@description GetRange
---@see GetRange
---@param peffect Effect 
---@return any
function Effect.GetRange(peffect) end

---@name GetTargetRange
---@description GetTargetRange
---@see GetTargetRange
---@param peffect Effect 
---@return any
function Effect.GetTargetRange(peffect) end

---@name GetCountLimit
---@description GetCountLimit
---@see GetCountLimit
---@param peffect Effect 
---@return any
function Effect.GetCountLimit(peffect) end

---@name GetReset
---@description GetReset
---@see GetReset
---@param peffect Effect 
---@return any
function Effect.GetReset(peffect) end

---@name GetType
---@description GetType
---@see GetType
---@param peffect Effect 
---@return any
function Effect.GetType(peffect) end

---@name GetProperty
---@description GetProperty
---@see GetProperty
---@param peffect Effect 
---@return any
function Effect.GetProperty(peffect) end

---@name GetLabel
---@description GetLabel
---@see GetLabel
---@param peffect Effect 
---@return any
function Effect.GetLabel(peffect) end

---@name GetLabelObject
---@description GetLabelObject
---@see GetLabelObject
---@param peffect Effect 
---@return any
function Effect.GetLabelObject(peffect) end

---@name GetCategory
---@description GetCategory
---@see GetCategory
---@param peffect Effect 
---@return any
function Effect.GetCategory(peffect) end

---@name GetOwner
---@description GetOwner
---@see GetOwner
---@param peffect Effect 
---@return any
function Effect.GetOwner(peffect) end

---@name GetHandler
---@description GetHandler
---@see GetHandler
---@param peffect Effect 
---@return any
function Effect.GetHandler(peffect) end

---@name GetOwnerPlayer
---@description GetOwnerPlayer
---@see GetOwnerPlayer
---@param peffect Effect 
---@return any
function Effect.GetOwnerPlayer(peffect) end

---@name GetHandlerPlayer
---@description GetHandlerPlayer
---@see GetHandlerPlayer
---@param peffect Effect 
---@return any
function Effect.GetHandlerPlayer(peffect) end

---@name GetHintTiming
---@description GetHintTiming
---@see GetHintTiming
---@param peffect Effect 
---@return any
function Effect.GetHintTiming(peffect) end

---@name GetCondition
---@description GetCondition
---@see GetCondition
---@param peffect Effect 
---@return any
function Effect.GetCondition(peffect) end

---@name GetTarget
---@description GetTarget
---@see GetTarget
---@param peffect Effect 
---@return any
function Effect.GetTarget(peffect) end

---@name GetCost
---@description GetCost
---@see GetCost
---@param peffect Effect 
---@return any
function Effect.GetCost(peffect) end

---@name GetValue
---@description GetValue
---@see GetValue
---@param peffect Effect 
---@return any
function Effect.GetValue(peffect) end

---@name GetOperation
---@description GetOperation
---@see GetOperation
---@param peffect Effect 
---@return any
function Effect.GetOperation(peffect) end

---@name GetActiveType
---@description GetActiveType
---@see GetActiveType
---@param peffect Effect 
---@return any
function Effect.GetActiveType(peffect) end

---@name IsActiveType
---@description IsActiveType
---@see IsActiveType
---@param peffect Effect 
---@param _2 number 
---@return any
function Effect.IsActiveType(peffect,_2) end

---@name IsHasProperty
---@description IsHasProperty
---@see IsHasProperty
---@param peffect Effect 
---@param tflag1 number 
---@param tflag2 number 
---@return any
function Effect.IsHasProperty(peffect,tflag1,tflag2) end

---@name IsHasCategory
---@description IsHasCategory
---@see IsHasCategory
---@param peffect Effect 
---@param _2 number 
---@return any
function Effect.IsHasCategory(peffect,_2) end

---@name IsHasType
---@description IsHasType
---@see IsHasType
---@param peffect Effect 
---@param _2 number 
---@return any
function Effect.IsHasType(peffect,_2) end

---@name IsActivatable
---@description IsActivatable
---@see IsActivatable
---@param peffect Effect 
---@param playerid number 
---@param neglect_loc boolean 
---@param neglect_target boolean 
---@return any
function Effect.IsActivatable(peffect,playerid,neglect_loc,neglect_target) end

---@name IsActivated
---@description IsActivated
---@see IsActivated
---@param peffect Effect 
---@return any
function Effect.IsActivated(peffect) end

---@name GetActivateLocation
---@description GetActivateLocation
---@see GetActivateLocation
---@param peffect Effect 
---@return any
function Effect.GetActivateLocation(peffect) end

---@name GetActivateSequence
---@description GetActivateSequence
---@see GetActivateSequence
---@param peffect Effect 
---@return any
function Effect.GetActivateSequence(peffect) end

---@name CheckCountLimit
---@description CheckCountLimit
---@see CheckCountLimit
---@param peffect Effect 
---@param p number 
---@return any
function Effect.CheckCountLimit(peffect,p) end

---@name UseCountLimit
---@description UseCountLimit
---@see UseCountLimit
---@param peffect Effect 
---@param p number 
---@param count number 
---@param oath_only boolean 
---@return any
function Effect.UseCountLimit(peffect,p,count,oath_only) end