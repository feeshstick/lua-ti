import {CompilerOptions} from "./compiler/compiler-options/compiler-options.js";

export interface ProgramDeclarationFile extends ProgramFile {
}

export interface ProgramFile {
    file: string
    compilerOptions?: CompilerOptions
}

export interface ProgramConfiguration {
    program: {
        path: string
        file: string
        cardID: number
    }
    compilerOptions: CompilerOptions
}