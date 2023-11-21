local s,id=GetID()
function s.initial_effect(c)
	local e1=Effect.CreateEffect(c)
	e1:SetDescription(aux.Stringid(id,0))
	e1:SetType(EFFECT_TYPE_FIELD)
	e1:SetCondition(s.condition_1)
	c:RegisterEffect(e1)
	local e2=Effect.CreateEffect(c)
	e2:SetDescription(aux.Stringid(id,1))
	e2:SetType(EFFECT_TYPE_SINGLE)
	e2:SetCondition(s.condition_2)
	c:RegisterEffect(e2)
end

function s.condition_1(e,tp)
	return Duel.GetFieldGroupCount(tp,LOCATION_MZONE,0)==0
end

function s.condition_2(e,tp)
	return Duel.GetFieldGroupCount(tp,LOCATION_MZONE,0)~=0
			or Duel.GetFieldGroupCount(tp,0,LOCATION_HAND)>=5
end
