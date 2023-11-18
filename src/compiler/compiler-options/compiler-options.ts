import {NodeKind} from "../components/container-types.js";

export interface CompilerOptions {
    noStringCall?: boolean;
    noLabel?: boolean
    noTableCall?: boolean
    parserOptions?: {
        ignore: NodeKind[]
    }
}