import fs from "fs";

export interface ErrorContext {
    source: string,
    file: string,
    location: {
        start: {
            line: number,
            column: number,
        },
        end: {
            line: number,
            column: number
        }
    }
}

export function errorPrettyPrint(data: ErrorContext, message?: string): string {
    let lineStart = data.location.start.line - 1
    let lineEnd = data.location.end.line
    const lines = data.source.split(/\n/gm)
    const text: [string, string][] = []
    let leftWidth: number = 0
    for (let i = lineStart; i < lineEnd; i++) {
        const left = i.toString()
        text.push([left, lines[i]])
        leftWidth = Math.max(leftWidth, i.toString().length)
    }
    const leftDelimiter = '| '
    const codeText = text.reduce<string[]>((p, c) => [...p, c[0].padStart(leftWidth + 1, ' ') + leftDelimiter + c[1]], [])
    let columnStart = data.location.start.column
    let columnEnd = data.location.end.column
    const errWidth = columnEnd - columnStart - 1
    const errOffsetLeft = columnStart + leftWidth + leftDelimiter.length
    codeText.push(''.padStart(errOffsetLeft + 1, ' ') + '^'.padEnd(errWidth, '^'))
    return [
        fs.realpathSync(data.file) + ':' + (lineStart + 1) + ':' + (columnStart + 1),
        message,
        ...codeText
    ].filter(x => !!x).join('\n')
}