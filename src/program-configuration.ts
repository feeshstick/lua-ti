import {CompilerOptions} from "./compiler/compiler-options/compiler-options.js";

interface InjectionContext {
}

type Injection = {
    call: (context: InjectionContext) => (...args: any[]) => any
} | {
    [key: string]: Injection
}

export interface ProgramDeclarationFile extends ProgramFile {
    inject?: Injection
}

interface ProgramConstantFile extends ProgramFile {
}

interface ProgramFile {
    file: string
    compilerOptions?: CompilerOptions
}

export interface ProgramSourceFile extends ProgramFile {
}

export interface ProgramFileDescription<E> {
    path: string
    files: E[]
    compilerOptions?: CompilerOptions
}

export interface ProgramConfiguration {
    program: {
        constants: ProgramFileDescription<ProgramConstantFile>
        declarations: ProgramFileDescription<ProgramDeclarationFile>
        sources: ProgramFileDescription<ProgramSourceFile>
    }
    compilerOptions: CompilerOptions
}