export const luaSourceMapTest = {
    //language=lua
    'locals':`
        local a = 5
        do
            local a = "1"
        end
        local b = function () end
    `,
    //language=lua
    'functions':`
        Duel = {}
        function Duel.Print(text)
            print(text)
        end
        function Duel.Hint()
            Duel.Print("Hint")
        end
        Duel.Hint()
    `,
    //language=lua
    'misc': `
        A = {}
        A.i = 0
        function A.run (limit)
            local i = A.i
            while(i < limit) do
                i = i + 1
            end
            return i
        end
        A.run(10)
    `,
    'call': {
        //language=lua
        'effect': `
        EVENT_TYPE_DRAW = 0x1
        Effect = {}
        function Effect.CreateEffect(c)
            local _data = {
                set_code = 0
            }
            return {
                _data = _data,
                SetCode = function (__self, code)
                    _data.set_code = code
                end
            }
        end
        s = {}
        function s.initial_effect(c)
            local e1 = Effect.CreateEffect(c)
            e1:SetCode(EVENT_TYPE_DRAW)
            c.RegisterEffect(e1)
        end
        Card={}
        function Card.CreateCard()
            return {
                RegisterEffect = function (e)
                    print(dump(e._data))
                end
            }
        end
        s.initial_effect(Card.CreateCard())
        `,
        //language=lua
        'table_call_expression': `
            function no_pairs(argument)
                return argument,argument,argument
            end
            ;ipairs{...}
            ;(ipairs or no_pairs{...}){...}
        `,
        //language=lua
        'string_call_expression': `
            function no_print(argument)
                return print
            end
            print"Hello"
            ;(print or no_print"test")"Hello"
        `
    },
    'table': {
        //language=lua
        'nested_table': `
            CardType = {
                Monster = {
                }
            }
            local Spell = 'Spell'
            CardType[Spell] = {}
            CardType.Trap = {}
        `,
        //language=lua
        'table_as_function': `
            A={}
            A.test=function ()
            end
            local a = 0
        `,
        //language=lua
        'table_constructor': `
            CONSTANT_A = 0x1
            CONSTANT_B = 0x2
            function f()
                return 420
            end
            TAB = {
                [f()] = CONSTANT_A,
                ['test'] = CONSTANT_B,
                5 + 5,
                f(),
                [5] = 1,
                a = 4,
                b = function ()
                end,
                c = (function()
                    return "hello"
                end)()
            }
        `
    },
    'function': {
        'parameter':
        //language=lua
            `
            function _no_arg()
            end
            
            function _one_arg(a)
            end
            
            function _two_arg(a,b)
            end
            
            function _vararg(...)
            end
            
            function A._no_arg()
            end
            
            function A._one_arg(a)
            end
            
            function A._two_arg(a,b)
            end
            
            function A._vararg(...)
            end
            
            
        `,
        'return':
        //language=lua
            `
                function getNumber()
                    return 0
                end
                
                function getString()
                    return "test"
                end
                
                function getNil()
                    return nil
                end
                
                function getNumber()
                    return 0
                end
                
                function getTable()
                    return {
                        test = "yeet"
                    }
                end
                
                function getTable2()
                    return {
                        TableEntry = function ()
                            return "result"
                        end
                    }
                end
                
                function Member.getInside()
                    return nil
                end
            `
    }
}