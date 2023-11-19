---@alias Filter () => void
---@alias Function () => void
---@alias Lua_obj table
---@alias lua_Integer number


---@class Script
---@field __index Card
---@field __tostring any
---@field initial_effect (card:Card) => void
---@field listed_names? number[]
---@field listed_series? number[]
---@field xyz_number? number
---@field pendulum_level? number
---@field toss_coin? boolean
Script = {}

---@name GetID
---@return Script, number
function GetID()
end

aux = {}
Auxiliary = {}

---@name Stringid
---@param code number
---@param id number
---@return number
function Auxiliary.Stringid(code, id)
    return (id & 0xfffff) | code << 20
end

Synchro={}
math={}