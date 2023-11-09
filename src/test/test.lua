Duel={}
function maplevel(lvl)
end
function Auxiliary.NormalSummonCondition1(min,max,f,opt)
	return function (e,c,minc,zone,relzone,exeff)
		if c==nil then return true end
		local tp=c:GetControler()
		local mg=Duel.GetTributeGroup(c):Match(Auxiliary.IsZone,nil,relzone,tp)
		if f then
			mg:Match(f,nil,tp)
		end
		local tributes=maplevel(c:GetLevel())
		return (not opt or (tributes>0 and tributes~=max)) and minc<=min and Duel.CheckTribute(c,min,max,mg,tp,zone)
	end
end
Auxiliary.NormalSummonCondition1(1,2,function () return true end,nil)
Auxiliary.NormalSummonCondition1(1,4,function (test) return false end,"hello")

local function cost_replace_getvalideffs(replacecode,extracon,e,tp,eg,ep,ev,re,r,rp,chk)
	local t={}
	for _,eff in ipairs({Duel.GetPlayerEffect(tp,replacecode)}) do
		if eff:CheckCountLimit(tp) then
		local val=eff:GetValue()
			if type(val)=="number" then
				if val==1 then
					table.insert(t,eff)
				end
			elseif type(val)=="function" then
				if val(eff,e,tp,eg,ep,ev,re,r,rp,chk,extracon) then
					table.insert(t,eff)
				end
			end
		end
	end
	return t
end
