import { Token } from "compiler/table/symbol-table.js"

export interface Context {
    emitError(message: string)
    
    emitWarning(message: string)
    lookup(name: string): Token
    
    createToken(properties: Partial<Token['properties']>):Token
    createDefault(properties: Partial<Token['properties']>):Token
    createVoid():Token
}
