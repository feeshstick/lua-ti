import peg from 'pegjs'
import prettier from "prettier";
import fs from "fs";
import { VoidFunction } from 'utility/void-function.js';

const {generate} = peg

declare function location(): any;

function rule(name: string, rule: [...string[], (...args: any) => any]) {
    return [`${name}:(${rule.reduce((p, c) => {
        if (typeof c === 'string') {
            return p + ' _ ' + c
        } else {
            return p + ' ' + `{ (${c.toString()})() }`
        }
    })})`];
}

type Prefix = '!'
type Suffix = '?' | '*' | '+'

type Context = { prefix?: Prefix, suffix?: Suffix }

type RuleElement =
    | [string, string, Context]
    | [string, Context]
    | [string, Rule, Context]

type Reduction = (...data: any) => any

type Rule = [
    ...RuleElement[],
    Reduction
] | [
    ...RuleElement[]
]

type ProductionName = string

type Production = [
    ProductionName,
    Rule[]
]

export const NONE: Context = {}
export const REPEAT: Context = {suffix: '*'}
export const pegjs: Production[] = [
    ['FunctionDeclaration', [
        [
            ['function', NONE],
            ['name', 'NAME', NONE],
            ['(', NONE],
            ['parameterList', 'ParameterList', {suffix: '?'}],
            [')', NONE],
            (name, parameterList) => ({
                kind: 'function',
                name: name,
                parameter: parameterList
            })
        ]
    ]],
    ['ParameterList', [
        [
            ['left', 'NAME', NONE],
            ['right', [
                [',', NONE],
                ['l', 'NAME', NONE],
                (l) => l
            ], REPEAT],
            (left, right) => ({
                kind: 'parameter-list',
                list: [left, ...right]
            })
        ]
    ]]
]

export function parsePeg(productions: Production[]) {
    let text = ''
    let doLater: VoidFunction[] = []
    const nonTerminals: Set<string> = new Set()
    
    for (let [name, rules] of productions) {
        nonTerminals.add(name)
        doLater.push(() => {
            text += `${name} =\n${rules.map(rule => generateRule(rule)).join('\n/')}\n`
        })
    }
    
    runLater()
    
    const output = text + `\n_ = [ \\t\\n\\r]*`
    const generated = generate(output, {
        optimize: 'speed',
        output: 'parser',
        cache: true
    })
    fs.writeFileSync('out/pegjs',output)
    fs.writeFileSync('out/parser.js', prettier.format(generated.parse.toString(), {
        parser: 'babel'
    }))
    
    function runLater() {
        const current = doLater
        doLater = []
        for (let voidFunction of current) {
            voidFunction()
        }
    }
    
    function generateRuleElement(element: RuleElement) {
        const context = element[element.length - 1] as Context
        switch (element.length) {
            case 2:
                // | [string, Context]
                if (nonTerminals.has(element[0])) {
                    return process(`${element[0]}`)
                }
                return process(`"${element[0].replaceAll('"', '\\""')}"`)
            case 3:
                if (typeof element[1] === 'string') {
                    // | [string, string, Context]
                    if (nonTerminals.has(element[1])) {
                        return process(`${element[0]}:${element[1]}`)
                    } else {
                        return process(`${element[0]}:"${
                            element[1].replaceAll('"', '\\""')
                        }"`)
                    }
                }
                return process(`${element[0]}:(${generateRule(element[1])})`)
        }
        
        function process(text: string) {
            return `${context.prefix || ''}${text}${context.suffix || ''}`
        }
    }
    
    function generateRule(rule: Rule) {
        let reduction: {
            parameter: string,
            content: string
        } | undefined
        if (typeof rule[rule.length - 1] === 'function') {
            const red = (rule.pop()! as Reduction).toString()
            reduction = {
                content: red,
                parameter: red.slice(red.indexOf('(') + 1, red.indexOf(')'))
            }
        }
        return rule.map(element => generateRuleElement(element)).join(' _ ') +
            (reduction ? ` { return (${reduction.content})(${reduction.parameter}) }` : '')
    }
}