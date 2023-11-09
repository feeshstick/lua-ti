import chalk from "chalk";

export interface StringBuilder {
    println(...text: any[])
    
    addIndent(style: string)
    
    popIndent()
    
    get text(): string
    
    block(run: VoidFunction, style?: string)
}

export function createStringBuilder(): StringBuilder {
    let indentStack: string[] = []
    let indent: number = 0
    let text: string = ''
    return {
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
        get text(): string {
            return text
        },
        block(run: VoidFunction, style?: string) {
            if (style) {
            }
            this.addIndent(chalk.grey((style || '').padEnd(4, ' ')))
            run()
            this.popIndent()
        }
    }
}