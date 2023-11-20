import {Program} from "../components/nodes/meta/program.js";
import {NodeKind} from "../components/container-types.js";
import {Block} from "../components/nodes/meta/block.js";
import {ChunkContainer} from "../components/nodes/meta/chunk-container.js";
import {LocalStatementContainer} from "../components/nodes/statement/assign/local-statement-container.js";
import {AssignmentStatementContainer} from "../components/nodes/statement/assign/assignment-statement-container.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {CallExpressionContainer} from "../components/nodes/expression/call-expression/call-expression-container.js";
import {Token} from "./symbol-table.js";
import {ChunkFlag} from "../components/nodes/meta/chunk-flag.js";
import {MemberExpressionContainer} from "../components/nodes/expression/member-expression-container.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";


export class Card {
}

export class Effect {
}

export const Env = {
    GetID: () => {
        return [new Script(), new Number(0)]
    },
    Effect: {
        CreateEffect(card: Card) {
            return new Effect()
        }
    }
}

export class Script {

}

function visitLocalStatement(node: LocalStatementContainer) {
    for (let variable of node.variables) {
        node.symbols.enter(variable.name, new Token(variable))
    }
}

function visitAssignStatement(node: AssignmentStatementContainer) {
    for (let variable of node.variables) {
        if (variable.kind === NodeKind.Identifier) {
            switch (node.chunk.context.flag) {
                case ChunkFlag.Declaration:
                case ChunkFlag.Constant:
                    node.symbols.global.enter(variable.name, new Token(variable))
                    node.symbols.global.lookup(variable.name)!.properties.immutable = true
                    break;
                case ChunkFlag.Source:
                    node.symbols.enter(variable.name, new Token(variable))
                    break;
            }
        } else {
            console.log(variable.text)
        }
    }
}

function declareVariable(identifier: IdentifierContainer | MemberExpressionContainer, context: 'local' | undefined) {
    switch (identifier.kind) {
        case NodeKind.Identifier:
            if (context) {
                identifier.symbol = identifier.symbols.enter(identifier.name, new Token(identifier))
            } else {
                identifier.symbol = identifier.symbols.lookup(identifier.name)
                    || identifier.symbols.global.enter(identifier.name, new Token(identifier))
            }
            break;
        case NodeKind.MemberExpression:
            if (identifier.indexer === ':') {
                throw new Error()
            }
            if (identifier.base.kind === NodeKind.Identifier
                || identifier.base.kind === NodeKind.MemberExpression) {
                declareVariable(identifier.base, context)
                identifier.symbol = identifier.base.symbol.enter(identifier.identifier.name, new Token(identifier.identifier))
            } else {
                throw new Error()
            }
            break;
    }
}

function visitFunctionDeclaration(node: FunctionExpressionContainer) {
    if (node.identifier) {
        if (node.isLocal) {
            declareVariable(node.identifier, 'local')
        } else {
            declareVariable(node.identifier, undefined)
        }
    }
}

export function visitTableInitializer(program: Program) {
    console.log(Env)
    type Curse = () => Curse[]
    const doLater: Curse[] = []
    for (let chunk of program.chunks) {
        doLater.push(...iterate(chunk))
    }
    
    curse(doLater)
    
    for (let chunk of program.chunks) {
        switch (chunk.context.flag) {
            case ChunkFlag.Declaration:
                chunk.block.symbols.clear()
                break;
            case ChunkFlag.Constant:
                chunk.block.symbols.clear()
                break;
            case ChunkFlag.Source:
                break;
        }
    }
    
    const globalTable = program.symbols.global
    globalTable.setInstances(Env)
    
    function curse(doNow: Curse[]) {
        const doLater: Curse[] = []
        for (let doNowElement of doNow) {
            doLater.push(...doNowElement())
        }
        if (doLater.length > 0) {
            curse(doLater)
        }
    }
    
    function iterate(block: Block | ChunkContainer) {
        const _doLater: Curse[] = []
        block.forEachDeep(node => {
            if (node.kind === NodeKind.Block) {
                _doLater.push(() => {
                    return iterate(node)
                })
                return false
            } else {
                if (node.kind === NodeKind.LocalStatement) {
                    visitLocalStatement(node)
                } else if (node.kind === NodeKind.AssignmentStatement) {
                    visitAssignStatement(node)
                } else if (node.kind === NodeKind.FunctionDeclaration) {
                    visitFunctionDeclaration(node)
                }
                return true
            }
        })
        return _doLater
    }


}
