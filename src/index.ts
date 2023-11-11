import * as process from "process";
import {createStringBuilder} from "./compiler/utility/string-builder.js";

export enum CommandLineOption {
    __default
}

interface OptionEntry {
}

type CommandLineOptionMap = {
    [A in CommandLineOption]: {
        options: OptionEntry[],
        exec: (...elements: string[]) => void
    }
}

function showHelp() {
    const out = createStringBuilder()
    out.namedBlock('Usage:', () => {
        out.println('luati')
        out.println('luati <action> [options...]')
        out.table([
            ['action', 'description', 'options', 'example'],
            ['', '', ''],
            ['help', '', '<action> [options...]', 'help help'],
            ['absyn', 'Abstract Syntax Tree', '', ''],
            ['version', 'Show Version', '', ''],
        ], {
            delimiter: '   '
        })
    })
    console.log(out.text)
    process.exit(1)
}

const CommandLineOptions: CommandLineOptionMap = {
    [CommandLineOption.__default]: {
        options: [],
        exec: function (): void {
            showHelp()
        }
    }
}

export function cli() {
    const argv = process.argv;
    const optionKey = CommandLineOption[argv[2]]
    const option = CommandLineOptions[optionKey]
    if (option) {
    
    } else {
        CommandLineOptions[0].exec(...argv)
    }
}

cli()