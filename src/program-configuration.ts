import {CompilerOptions} from "./compiler/compiler-options/compiler-options.js";

export interface ProgramDeclarationFile extends ProgramFile {
}

export interface ProgramFile {
    file: string
    compilerOptions?: CompilerOptions
}

export type ProgramConfiguration = {
    program: {
        type: 'file'
        path: string
        file: string
        cardID: number
    } | {
        type: 'source'
        source: string
        cardID: number
    }
    compilerOptions: CompilerOptions
}