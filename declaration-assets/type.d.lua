---@alias Filter fun(args:any):any
---@alias Function fun(args:any):any
---@alias Lua_obj table
---@alias lua_Integer number

---@alias EFFECT_TYPE_KIND EFFECT_TYPE_SINGLE | EFFECT_TYPE_FIELD | EFFECT_TYPE_EQUIP | EFFECT_TYPE_ACTIONS | EFFECT_TYPE_ACTIVATE | EFFECT_TYPE_FLIP | EFFECT_TYPE_IGNITION | EFFECT_TYPE_TRIGGER_O | EFFECT_TYPE_QUICK_O | EFFECT_TYPE_TRIGGER_F | EFFECT_TYPE_QUICK_F | EFFECT_TYPE_CONTINUOUS | EFFECT_TYPE_XMATERIAL | EFFECT_TYPE_GRANT | EFFECT_TYPE_TARGET

---@class Script
---@field __index Card
---@field __tostring any
---@field listed_names? number[]
---@field listed_series? number[]
---@field xyz_number? number
---@field pendulum_level? number
---@field toss_coin? boolean
Script = {}

---@name initial_effect
---@param c Card
function Script.initial_effect(c)
end

---@name __SCRIPT_CONSTRUCTOR
---@constructor Script
---@return Script
function __SCRIPT_CONSTRUCTOR()
end

---@name GetID
---@return Script, number
function GetID()
    return __SCRIPT_CONSTRUCTOR(), 123
end

---@class Auxiliary
Auxiliary = {}

---@name Stringid
---@param code number
---@param id number
---@return number
function Auxiliary.Stringid(code, id)
    return (id & 0xfffff) | code << 20
end

---@class aux
aux = {}

---@name Stringid
---@param code number
---@param id number
---@return number
function aux.Stringid(code, id)
    return (id & 0xfffff) | code << 20
end
