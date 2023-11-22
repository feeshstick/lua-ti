import {NodeKind} from "../components/container-types.js";

export interface CompilerOptions {
    noDuplicateLocalDeclaration?: boolean;
    noUndeclaredVariables?: boolean;
    noStringCall?: boolean;
    noLabel?: boolean
    noTableCall?: boolean
    parserOptions?: {
        ignore: NodeKind[]
    }
}