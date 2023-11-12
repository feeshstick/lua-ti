--炎の護封剣
--Swords of Burning Light
local s,id=GetID()
function s.initial_effect(c)
	--Activate
	local e1=Effect.CreateEffect(c)
	e1:SetType(EFFECT_TYPE_ACTIVATE)
	e1:SetCode(EVENT_FREE_CHAIN)
	c:RegisterEffect(e1)
	--cannot attack
	local e2=Effect.CreateEffect(c)
	e2:SetType(EFFECT_TYPE_FIELD)
	e2:SetCode(EFFECT_CANNOT_ATTACK_ANNOUNCE)
	e2:SetRange(LOCATION_SZONE)
	e2:SetTargetRange(0,LOCATION_MZONE)
	e2:SetCondition(s.atcon) --should not error here, but will infer s.atcon's type
	c:RegisterEffect(e2)
	--
	local e3=Effect.CreateEffect(c)
	e3:SetType(EFFECT_TYPE_SINGLE)
	e3:SetCode(EFFECT_SELF_DESTROY)
	e3:SetProperty(EFFECT_FLAG_SINGLE_RANGE)
	e3:SetRange(LOCATION_SZONE)
	e3:SetCondition(s.descon) --should not error here, but will infer s.descon's type
	c:RegisterEffect(e3)
end
function s.atcon(e,tp,eg,ep,ev,re,r,rp)
	--error here, tp needs to be an int, but is actually a Card
	return Duel.GetFieldGroupCount(tp,LOCATION_MZONE,0)==0
end
function s.descon(e,tp,eg,ep,ev,re,r,rp)
	--error in the next two lines, tp needs to be an int, but is actually a Card
	return Duel.GetFieldGroupCount(tp,LOCATION_MZONE,0)~=0
		or Duel.GetFieldGroupCount(tp,0,LOCATION_HAND)>=5
end
