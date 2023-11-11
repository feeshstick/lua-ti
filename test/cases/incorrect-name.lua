local s,id=GetID()
function s.initial_effect(c)
    local e1=Effect.CreateEffect(c)
    e1:SetType(EFFECT_TYPE_ACTIVATE)
    e1:SetCode(EVENT_FREE_CHAIN)
    e1:SetOperation(s.activate)
    c:RegisterEffect(e1)
end
function s.tgfilter(c)
    return c:IsMonster() and c:IsAbleToGrave()
end
function s.activate(e,tp,eg,ep,ev,re,r,rp)
    Duel.Hint(HINT_SELECTMSG,tp,HINTMSG_TOGRAVE)
    local g=Duel.SelectMatchingCard(0,s.tgfilter,tp,LOCATION_DECK,0,1,1,nil)
    if #g>0 then
        --error here, SendToGrave should be SendtoGrave
        Duel.SendToGrave(g,REASON_EFFECT)
    end
end