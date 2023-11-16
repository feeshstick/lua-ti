import {NodeKind} from "../components/container-types.js";

export interface CompilerOptions {
    noStringCall?: boolean;
    noLabel?: boolean
    strict: boolean
    fileFlag: 'declarations' | 'constants' | 'none'
    parserOptions?: {
        ignore: NodeKind[]
    }
    noTableCall?: boolean
}

export interface Project {
    compilerOptions: CompilerOptions
}