import {CompilerOptions} from "./compiler/compiler-options/compiler-options.js";
import {Injectable, Injector} from "./compiler/table/injector/Injector.js";

export interface InjectionContext {
}

export interface ProgramDeclarationFile extends ProgramFile {
}

export interface ProgramConstantFile extends ProgramFile {
}

export interface ProgramFile {
    file: string
    compilerOptions?: CompilerOptions
    inject?: Injectable
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