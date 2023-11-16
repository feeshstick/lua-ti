---@class Debug
Debug = {}

---@name Message
---@description Message
---@see Message
---@return any
function Debug.Message() end

---@name AddCard
---@description AddCard
---@see AddCard
---@param code number 
---@param owner number 
---@param playerid number 
---@param location number 
---@param sequence number 
---@param position number 
---@param proc boolean 
---@return any
function Debug.AddCard(code,owner,playerid,location,sequence,position,proc) end

---@name SetPlayerInfo
---@description SetPlayerInfo
---@see SetPlayerInfo
---@param playerid number 
---@param lp number 
---@param startcount number 
---@param drawcount number 
---@return any
function Debug.SetPlayerInfo(playerid,lp,startcount,drawcount) end

---@name PreSummon
---@description PreSummon
---@see PreSummon
---@param pcard Card 
---@param summon_type number 
---@param summon_location number 
---@param summon_sequence number 
---@param summon_pzone boolean 
---@return any
function Debug.PreSummon(pcard,summon_type,summon_location,summon_sequence,summon_pzone) end

---@name PreEquip
---@description PreEquip
---@see PreEquip
---@param equip_card Card 
---@param target Card 
---@return any
function Debug.PreEquip(equip_card,target) end

---@name PreSetTarget
---@description PreSetTarget
---@see PreSetTarget
---@param t_card Card 
---@param target Card 
---@return any
function Debug.PreSetTarget(t_card,target) end

---@name PreAddCounter
---@description PreAddCounter
---@see PreAddCounter
---@param pcard Card 
---@param countertype number 
---@param count number 
---@return any
function Debug.PreAddCounter(pcard,countertype,count) end

---@name ReloadFieldBegin
---@description ReloadFieldBegin
---@see ReloadFieldBegin
---@param flag number 
---@param rule number 
---@param build boolean 
---@return any
function Debug.ReloadFieldBegin(flag,rule,build) end

---@name ReloadFieldEnd
---@description ReloadFieldEnd
---@see ReloadFieldEnd
---@return any
function Debug.ReloadFieldEnd() end

---@name PrintStacktrace
---@description PrintStacktrace
---@see PrintStacktrace
---@return any
function Debug.PrintStacktrace() end

---@name CardToStringWrapper
---@description CardToStringWrapper
---@see CardToStringWrapper
---@param pcard Card 
---@return any
function Debug.CardToStringWrapper(pcard) end