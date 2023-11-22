import {Program} from "../../components/nodes/meta/program.js";
import {SymbolTable, Token} from "../symbol-table.js";
import {createStringBuilder} from "../../utility/string-builder.js";
import {createGlobalEnvironment} from "./global-environment.js";
import {NodeKind} from "../../components/container-types.js";

export function globalInitializer(program: Program) {
    
    const global = program.symbols.global
    setEntries(global, createGlobalEnvironment(program))
    const out = createStringBuilder()
    global.getText(out)
    
    function setEntries(table: SymbolTable | Token, obj: any) {
        for (let key of Object.keys(obj)) {
            setEntry(key, obj[key])
        }
        
        function setEntry(key: string, objElement: any) {
            const token = new Token()
            table.enter(key, token)
            if (typeof objElement === 'object' && objElement) {
                setEntries(token, objElement)
                token.properties.immutable = true
            } else {
                token.properties.immutable = true
                token.properties.instance = objElement
            }
        }
    }
}

export function visitDependencies(token: Token) {
    // TODO
    // 4 ways to handle this:
    // 1) visitDependencies called on RegisterEffect:
    //        if function-expression-container visited then compare type-guide
    //        else visit function-expression-container
    // 2) visitDependencies called after completion of initial_effect
    //        deep copy declaration for each call
    //        then compare symbol table for conflicts
    // 3) handle duplicate usage in the AST (don't like this one)
    // 4) allow visit multiple times, but create a signature mask.
    //        based on that mask e.g.:
    //            1st visit (arg0: Card, arg1: number)
    //            2nd visit (arg0: number, arg1: number)
    //        symbol tabled passed as argument in 'table-builder', assign different token
    //        alternatively: use different symbol tables based on that mask,
    //                       declared in function-expression-container
    //                       symbolic description: component.visitLater(new SymbolTable())
    for (let component of token.declarations) {
        if (component.kind === NodeKind.FunctionDeclaration && component.visitLater) {
            component.visitLater()
        }
    }
}