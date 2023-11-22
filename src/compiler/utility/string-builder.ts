import {ObjectMap} from "./object-map.js";
import {entries} from "./entries.js";

export interface StringBuilder {
    println(...text: any[])
    
    printlnPad(depth: number, ...text: any[])
    
    printBypassIndent(text: string)
    
    print(...text: any[])
    
    addIndent(style: string)
    
    popIndent()
    
    get text(): string
    
    block(run: VoidFunction, style?: string)
    
    namedBlock(text: string, run: VoidFunction, style?: string)
    
    list<E>(key: string, list: E[], element: (element: E, index: number) => void, style?: string)
    
    object<E>(key: string, list: ObjectMap<E>, element: (key: string, value: E, index: number) => void, style?: string)
    
    setColors(b: boolean): this;
    
    table(entries: string[][], options: {
        delimiter: string
    }): void
}

export function createStringBuilder(): StringBuilder {
    let indentStack: string[] = ['']
    let indent: number = 0
    let text: string = ''
    let isHasColors = true
    return {
        printBypassIndent(input: string) {
            text += input.split('\n').map(x => x.trim()).join('\n') + '\n'
        },
        table(entries: string[][], options) {
            let width = entries.reduce((p, c) => Math.max(p, c.length), 0)
            let columnWidths: number[] = new Array(width).fill(0)
            for (let i = 0; i < entries.length; i++) {
                let entry = entries[i];
                for (let j = 0; j < entry.length; j++) {
                    let string = entry[j];
                    columnWidths[j] = Math.max(string.length, columnWidths[j])
                }
            }
            for (let entry of entries) {
                const collect: string[] = []
                for (let i = 0; i < entry.length; i++) {
                    collect.push(entry[i].padEnd(columnWidths[i], ' '))
                }
                this.println(collect.join(options.delimiter))
            }
        },
        addIndent(style: string) {
            indentStack.push(style)
            indent += 1
        },
        popIndent() {
            indentStack.pop()
            indent -= 1
        },
        println(..._text: any[]) {
            if (_text.length > 1) {
                text += `${indentStack.join('') + _text[0]}: ${_text[1]}\n`
            } else {
                text += `${indentStack.join('') + _text[0]}\n`
            }
        },
        printlnPad(depth: number, ..._text: any[]) {
            if (_text.length > 1) {
                this.println(''.padEnd(depth * 4, ' ') + `${_text[0]}: [${_text.slice(1).join(', ')}]`)
            } else {
                this.println(''.padEnd(depth * 4, ' ') + `${_text[0]}`)
            }
        },
        list<E>(key: string, list: E[], element: (element: E, index: number) => void, style?: string) {
            if (list.length > 0) {
                this.println(key)
                this.addIndent('  ')
                for (let i = 0; i < list.length; i++) {
                    let e = list[i];
                    element(e, i)
                }
                this.popIndent()
            }
        },
        object<E>(key: string, list: ObjectMap<E>, element: (key: string, value: E, index: number) => void, style?: string) {
            const _entries = entries(list)
            if (_entries.length > 0) {
                this.println(key)
                this.addIndent('  ')
                for (let i = 0; i < _entries.length; i++) {
                    let e = _entries[i];
                    element(e[0] + '', e[1], i)
                }
                this.popIndent()
            }
        },
        print(..._text: any[]) {
            if (_text.length > 1) {
                text += `${indentStack.join('') + _text[0]}: ${_text[1]}`
            } else {
                text += `${indentStack.join('') + _text[0]}`
            }
        },
        get text(): string {
            return text
        },
        block(run: VoidFunction, style?: string) {
            this.addIndent('  ')
            run()
            this.popIndent()
        },
        namedBlock(key: string, run: VoidFunction, style?: string) {
            this.println(key)
            this.addIndent((style ? style : '') + '  ')
            run()
            this.popIndent()
        },
        setColors(_isHasColors: boolean): StringBuilder {
            isHasColors = _isHasColors
            return this
        }
    }
}