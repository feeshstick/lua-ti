
SUMMON_TYPE_LINK = 0x4c000000
MATERIAL_LINK = 0x8<<32
CATEGORY_DAMAGE = 0x80000
EFFECT_FLAG_PLAYER_TARGET = 0x800
EFFECT_TYPE_TRIGGER_F = 0x200
EFFECT_TYPE_SINGLE = 0x200
EVENT_DESTROYED = 1029

function Link.ConditionFilter(c,f,lc,tp)
	return c:IsCanBeLinkMaterial(lc,tp) and (not f or f(c,lc,SUMMON_TYPE_LINK|MATERIAL_LINK,tp))
end

function apply()
    local s,id=GetID()
    function s.initial_effect(c)
        --Damage
        local e1=Effect.CreateEffect(c)
        e1:SetCategory(CATEGORY_DAMAGE)
        e1:SetProperty(EFFECT_FLAG_PLAYER_TARGET)
        e1:SetType(EFFECT_TYPE_SINGLE+EFFECT_TYPE_TRIGGER_F)
        e1:SetCode(EVENT_DESTROYED)
        -- e1:SetCondition(s.drcon)
        -- e1:SetTarget(s.damtg)
        -- e1:SetOperation(s.damop)
        c:RegisterEffect(e1)
    end
    s.listed_series={0x12c}
end