import {Container} from "../components/container-types.js";
import {errorPrettyPrint} from "../../utility/error-pretty-print.js";
import {LuaTiErrorHelper} from "./lua-ti-error.js";

export interface ErrorMessage {
    code: number
    text: string
}

export class LuaTiDiagnostic {
    static message = {
        noDuplicateLocalDeclaration: {
            code: 1,
            text: 'duplicate local declaration {0}'
        },
        noUndeclaredVariables: {
            code: 2,
            text: `couldn't resolve declaration {0}`
        },
        noCustomMember: {
            code: 3,
            text: `member {1} not allowed in {0}`
        }
        
    };
    private readonly stack: [Container, string][] = []
    
    constructor() {
    }
    
    prettyPrint() {
        for (let [key, value] of this.stack) {
            console.log(errorPrettyPrint(LuaTiErrorHelper.createErrorContext(key), value))
        }
    }
    
    error(node: Container, message: ErrorMessage, ...args: string[]) {
        this.stack.push([node, `LuaTi ${message.code}: ${message.text.replaceAll(/\{\d+}/gm, f => {
            return args[parseInt(f.slice(1, -1))]
        })}`])
    }
}