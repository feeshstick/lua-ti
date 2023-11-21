import {CompilerOptions} from "./compiler/compiler-options/compiler-options.js";

export interface InjectionContext {
}

export interface ProgramDeclarationFile extends ProgramFile {
}

export interface ProgramConstantFile extends ProgramFile {
}

export interface ProgramFile {
    file: string
    compilerOptions?: CompilerOptions
}

export interface ProgramSourceFile extends ProgramFile {
}

export interface ProgramConfiguration {
    program: {
        path: string
        file: string
        cardID: number
    }
    compilerOptions: CompilerOptions
}