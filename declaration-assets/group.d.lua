---@class Group
Group = {}

---@name CreateGroup
---@description CreateGroup
---@see CreateGroup
---@return any
function Group.CreateGroup() end

---@name Clone
---@description Clone
---@see Clone
---@param pgroup Group
---@return any
function Group.Clone(pgroup) end

---@name DeleteGroup
---@description DeleteGroup
---@see DeleteGroup
---@param pgroup Group
---@return any
function Group.DeleteGroup(pgroup) end

---@name KeepAlive
---@description KeepAlive
---@see KeepAlive
---@param pgroup Group
---@return any
function Group.KeepAlive(pgroup) end

---@name Clear
---@description Clear
---@see Clear
---@param pgroup Group
---@return any
function Group.Clear(pgroup) end

---@name AddCard
---@description AddCard
---@see AddCard
---@param pgroup Group
---@return any
function Group.AddCard(pgroup) end

---@name RemoveCard
---@description RemoveCard
---@see RemoveCard
---@param pgroup Group
---@return any
function Group.RemoveCard(pgroup) end

---@name GetNext
---@description GetNext
---@see GetNext
---@param pgroup Group
---@return any
function Group.GetNext(pgroup) end

---@name GetFirst
---@description GetFirst
---@see GetFirst
---@param pgroup Group
---@return any
function Group.GetFirst(pgroup) end

---@name TakeatPos
---@description TakeatPos
---@see TakeatPos
---@param pgroup Group
---@param pos number
---@return any
function Group.TakeatPos(pgroup,pos) end

---@name GetCount
---@description GetCount
---@see GetCount
---@param pgroup Group 
---@return any
function Group.GetCount(pgroup) end

---@name Filter
---@description Filter
---@see Filter
---@param pgroup Group 
---@param findex Function 
---@param pexgroup Group 
---@return any
function Group.Filter(pgroup,findex,pexgroup) end

---@name Match
---@description Match
---@see Match
---@param pgroup Group 
---@param findex Function 
---@param pexgroup Group 
---@return any
function Group.Match(pgroup,findex,pexgroup) end

---@name FilterCount
---@description FilterCount
---@see FilterCount
---@param pgroup Group 
---@param findex Function 
---@param pexgroup Group 
---@return any
function Group.FilterCount(pgroup,findex,pexgroup) end

---@name FilterSelect
---@description FilterSelect
---@see FilterSelect
---@param pgroup Group 
---@param playerid number 
---@param findex Function 
---@param min number 
---@param max number 
---@return any
function Group.FilterSelect(pgroup,playerid,findex,min,max) end

---@name Select
---@description Select
---@see Select
---@param pgroup Group 
---@param playerid number 
---@param min number 
---@param max number 
---@return any
function Group.Select(pgroup,playerid,min,max) end

---@name SelectUnselect
---@description SelectUnselect
---@see SelectUnselect
---@param pgroup1 Group 
---@param pgroup2 Group 
---@param playerid number 
---@param finishable boolean 
---@param cancelable boolean 
---@param min number 
---@param max number 
---@return any
function Group.SelectUnselect(pgroup1,pgroup2,playerid,finishable,cancelable,min,max) end

---@name RandomSelect
---@description RandomSelect
---@see RandomSelect
---@param pgroup Group 
---@param playerid number 
---@param count number 
---@return any
function Group.RandomSelect(pgroup,playerid,count) end

---@name IsExists
---@description IsExists
---@see IsExists
---@param pgroup Group 
---@param findex Function 
---@param count number 
---@param pexgroup Group 
---@return any
function Group.IsExists(pgroup,findex,count,pexgroup) end

---@name CheckWithSumEqual
---@description CheckWithSumEqual
---@see CheckWithSumEqual
---@param pgroup Group 
---@param findex Function 
---@param acc number 
---@param min number 
---@param max number 
---@return any
function Group.CheckWithSumEqual(pgroup,findex,acc,min,max) end

---@name SelectWithSumEqual
---@description SelectWithSumEqual
---@see SelectWithSumEqual
---@param pgroup Group 
---@param playerid number 
---@param findex Function 
---@param acc number 
---@param min number 
---@param max number 
---@return any
function Group.SelectWithSumEqual(pgroup,playerid,findex,acc,min,max) end

---@name CheckWithSumGreater
---@description CheckWithSumGreater
---@see CheckWithSumGreater
---@param pgroup Group 
---@param findex Function 
---@param acc number 
---@return any
function Group.CheckWithSumGreater(pgroup,findex,acc) end

---@name SelectWithSumGreater
---@description SelectWithSumGreater
---@see SelectWithSumGreater
---@param pgroup Group 
---@param playerid number 
---@param findex Function 
---@param acc number 
---@return any
function Group.SelectWithSumGreater(pgroup,playerid,findex,acc) end

---@name GetMinGroup
---@description GetMinGroup
---@see GetMinGroup
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetMinGroup(pgroup,findex) end

---@name GetMaxGroup
---@description GetMaxGroup
---@see GetMaxGroup
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetMaxGroup(pgroup,findex) end

---@name GetSum
---@description GetSum
---@see GetSum
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetSum(pgroup,findex) end

---@name GetBitwiseAnd
---@description GetBitwiseAnd
---@see GetBitwiseAnd
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetBitwiseAnd(pgroup,findex) end

---@name GetBitwiseOr
---@description GetBitwiseOr
---@see GetBitwiseOr
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetBitwiseOr(pgroup,findex) end

---@name GetClass
---@description GetClass
---@see GetClass
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetClass(pgroup,findex) end

---@name GetClassCount
---@description GetClassCount
---@see GetClassCount
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetClassCount(pgroup,findex) end

---@name Remove
---@description Remove
---@see Remove
---@param pgroup Group 
---@param findex Function 
---@param pexception Card 
---@return any
function Group.Remove(pgroup,findex,pexception) end

---@name __band
---@description __band
---@see __band
---@return any
function Group.__band() end

---@name __add
---@description __add
---@see __add
---@return any
function Group.__add() end

---@name __sub
---@description __sub
---@see __sub
---@param pgroup1 Group 
---@return any
function Group.__sub(pgroup1) end

---@name __len
---@description __len
---@see __len
---@param pgroup Group 
---@return any
function Group.__len(pgroup) end

---@name __eq
---@description __eq
---@see __eq
---@param pgroup Group 
---@param sgroup Group 
---@return any
function Group.__eq(pgroup,sgroup) end

---@name Equal
---@description Equal
---@see Equal
---@param pgroup Group 
---@param sgroup Group 
---@return any
function Group.Equal(pgroup,sgroup) end

---@name __lt
---@description __lt
---@see __lt
---@param pgroup Group 
---@param sgroup Group 
---@return any
function Group.__lt(pgroup,sgroup) end

---@name __le
---@description __le
---@see __le
---@param pgroup Group 
---@param sgroup Group 
---@return any
function Group.__le(pgroup,sgroup) end

---@name IsContains
---@description IsContains
---@see IsContains
---@param pgroup Group 
---@param pcard Card 
---@return any
function Group.IsContains(pgroup,pcard) end

---@name SearchCard
---@description SearchCard
---@see SearchCard
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.SearchCard(pgroup,findex) end

---@name Split
---@description Split
---@see Split
---@param pgroup Group 
---@param findex Function 
---@param pexgroup Group 
---@return any
function Group.Split(pgroup,findex,pexgroup) end

---@name Includes
---@description Includes
---@see Includes
---@param pgroup1 Group 
---@param pgroup2 Group 
---@return any
function Group.Includes(pgroup1,pgroup2) end

---@name GetBinClassCount
---@description GetBinClassCount
---@see GetBinClassCount
---@param pgroup Group 
---@param findex Function 
---@return any
function Group.GetBinClassCount(pgroup,findex) end