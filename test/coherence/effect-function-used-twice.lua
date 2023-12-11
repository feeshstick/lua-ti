local s,id=GetID()                    -- ||
function s.initial_effect(c)          -- ||
    local e1=Effect.CreateEffect(c)   -- ||
    e1:SetType(EFFECT_TYPE_ACTIVATE)  -- ||
    e1:SetOperation(s.activate)       -- ||
    c:RegisterEffect(e1)              -- ||
    local e2=Effect.CreateEffect(c)   -- ||
    e2:SetType(EFFECT_TYPE_SINGLE)    -- ||
    e2:SetOperation(s.activate)       -- ||
    c:RegisterEffect(e2)              -- ||
end                                   -- ||
function s.activate(e,tp,eg,ep,ev,re,r,rp)
	local handler = e:GetHandler()
end
