import {SourceFileContainer} from "../components/nodes/meta/source-file-container.js";
import {
    binaryOperatorInferTypesToExpressions,
    Container,
    ExpressionContainer,
    NodeKind,
    unaryOperatorToTypeMap
} from "../components/types.js";
import {EntryKind, EntryLike, FunctionEntry, ParameterEntry, ReturnEntry, VariableEntry} from "./symbol-table.js";
import {MemberExpressionContainer} from "../components/nodes/expression/member-expression-container.js";
import {IdentifierContainer} from "../components/nodes/expression/literal/identifier-container.js";
import {IndexExpressionContainer} from "../components/nodes/expression/index-expression-container.js";
import chalk from "chalk";
import {BlockContainer} from "../components/nodes/meta/block-container.js";
import {FunctionExpressionContainer} from "../components/nodes/expression/function-expression-container.js";
import {NamedType, Primitive, TypeKind} from "../type/type-system.js";

function inferFunctionSignatures(sourceFile: SourceFileContainer) {
    sourceFile.forEachDeepChildFirst(node => {
        if (node.kind === NodeKind.FunctionDeclaration) {
            inferFunctionSignature(node)
        }
    })
    
    function inferFunctionSignature(fun: FunctionExpressionContainer) {
        fun.block.forEachDeep(node => {
            if (node.kind !== NodeKind.FunctionDeclaration) {
                if (node.kind === NodeKind.Identifier) {
                    if (!node._entry) {
                        console.log(node.name)
                    }
                }
                return true
            } else {
                return false
            }
        })
    }
}

export function tableBuilder(sourceFile: SourceFileContainer) {
    emitDebug(tableBuilder.name)
    tableInitializer(sourceFile)
    buildTable(sourceFile)
    tableFinalizer(sourceFile)
    inferFunctionSignatures(sourceFile)
    
    // bind(sourceFile)
    
    function buildTable(sourceFile: SourceFileContainer) {
        declarations(sourceFile)
        sourceFile.forEachDeep(node => {
            if (node.kind === NodeKind.Block) {
                node.symbolTable._print(out => console.log(out))
            }
            return true
        })
        declarationAccess(sourceFile)
        // tableBuilderNarrowTypes(sourceFile)
    }
    
    /**
     * TODO
     * - load predefined lua functions
     * - load types environment from source-file here instead of inside the container constructor
     * @param sourceFile
     */
    function tableInitializer(sourceFile: SourceFileContainer) {
        emitDebug(tableInitializer.name)
        
        sourceFile.symbols.enter('Card', new VariableEntry(
            new Map([
                ['IsCanBeLinkMaterial', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Card')})],
                    ['linkCard', new ParameterEntry({offset: 1, optional: true, type: new NamedType('Card')})],
                    ['player', new ParameterEntry({offset: 2, optional: true, type: new NamedType('number')})],
                ]), [new ReturnEntry(new VariableEntry(undefined, new NamedType('Card')))]))],
                ['RegisterEffect', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Card')})],
                    ['effect', new ParameterEntry({offset: 0, type: new NamedType('Effect')})]
                ]), []))]
            ]), new NamedType('Card')), false)
        sourceFile.symbols.enter('Effect', new VariableEntry(
            new Map([
                ['SetCategory', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Effect')})],
                    ['category', new ParameterEntry({offset: 1, type: Primitive.Number})],
                ]), []))],
                ['SetProperty', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Effect')})],
                    ['category', new ParameterEntry({offset: 1, type: Primitive.Number})],
                ]), []))],
                ['SetType', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Effect')})],
                    ['category', new ParameterEntry({offset: 1, type: Primitive.Number})],
                ]), []))],
                ['SetCode', VariableEntry.from(new FunctionEntry(new Map([
                    ['__self', new ParameterEntry({offset: 0, type: new NamedType('Effect')})],
                    ['category', new ParameterEntry({offset: 1, type: Primitive.Number})],
                ]), []))],
                ['CreateEffect', VariableEntry.from(new FunctionEntry(new Map([
                    ['card', new ParameterEntry({offset: 0, type: new NamedType('Card')})]
                ]), [new ReturnEntry(new VariableEntry(undefined, new NamedType('Effect')))]))]
            ]), new NamedType('Effect')), false)
        sourceFile.symbols.enter('GetID', VariableEntry.from(new FunctionEntry(new Map(), [
            new ReturnEntry(),
            new ReturnEntry()
        ])), false)
        
    }
    
    function tableFinalizer(sourceFile: SourceFileContainer) {
        emitDebug(tableFinalizer.name)
        sourceFile.forEachDeepChildFirst(fun => {
            if (fun.kind === NodeKind.FunctionDeclaration) {
                fun.forEachDeep(ret => {
                    if (ret.kind === NodeKind.FunctionDeclaration) {
                        return false
                    } else if (ret.kind === NodeKind.ReturnStatement) {
                        ret._ofFunctionRef = fun.block.symbolTable.entry
                        fun._returns.push(ret)
                        return true
                    }
                    return true
                })
            }
        })
        /**
         * resolve type of e1 for e1:SetCategory
         * while this is trivial for local e1 = Effect.CreateEffect(c)
         * because it's known that Effect.CreateEffect returns Effect,
         * this is not the case for all code occurrences
         */
        sourceFile.forEachDeepChildFirst(fun => {
            if (fun.kind === NodeKind.FunctionDeclaration) {
                fun.forEachDeep(call => {
                    if (call.kind === NodeKind.FunctionDeclaration) {
                        return false
                    } else if (call.kind === NodeKind.CallStatement) {
                        call._callFromRef = fun
                        switch (call.expression.kind) {
                            case NodeKind.CallExpression:
                                if (call.expression.base.kind === NodeKind.MemberExpression) {
                                    const base = call.expression.base
                                    if (base.isSelfRef) {
                                        if (isResolvable(base)) {
                                            // e1:SetCategory or e1:SetType
                                            // approximate by lookup of identifier (SetCategory, SetType)
                                            const memberBase = base.base
                                            const memberIdentifier = base.identifier
                                            if (memberBase.kind === NodeKind.Identifier) {
                                                const matchingMembers = memberIdentifier.symbols.getGlobalSelfReferencingFunctions()
                                                    .filter(([_class, _functionName, entry]) => {
                                                        return _functionName === memberIdentifier.name;
                                                    })
                                                if (matchingMembers.length === 0) {
                                                    // todo: if named type cannot be resolved, add structure type to variable entry
                                                    console.error(memberIdentifier.name + '(__self,...) is not a member of ' + memberBase.name)
                                                    console.error('todo: if named type cannot be resolved, add structure type to variable entry')
                                                    throw new Error("Not implemented.")
                                                } else if (matchingMembers.length === 1) {
                                                    const variableEntry = base.symbols.lookup(memberBase.name)
                                                    if (variableEntry) {
                                                        variableEntry.type = new NamedType(matchingMembers[0][0])
                                                    }
                                                } else {
                                                    // todo: if multiple named types are found, add union type to variable entry, or compare other usages
                                                    console.error('todo: if multiple named types are found, add union type to variable entry, or compare other usages')
                                                    throw new Error("Not implemented.")
                                                }
                                            } else {
                                                throw new Error("Not implemented.")
                                            }
                                        } else {
                                            throw new Error("Not implemented.")
                                        }
                                    } else {
                                        throw new Error("Not implemented.")
                                    }
                                } else {
                                    throw new Error("Not implemented.")
                                }
                                break;
                            case NodeKind.StringCallExpression:
                                throw new Error("Not implemented.")
                            case NodeKind.TableCallExpression:
                                throw new Error("Not implemented.")
                        }
                        return true
                    } else {
                        return true
                    }
                })
            }
        })
        sourceFile.forEachDeepChildFirst(call => {
            if (call.kind === NodeKind.CallExpression) {
                if (call.text.includes(':')) {
                    const target = call.text.split(':')[0]
                    const entry = call.symbols.lookup(target)
                    if (entry) {
                        if (entry.type.kind === TypeKind.Name) {
                            const entryType = call.symbols.lookup(entry.type.name)
                            if (entryType) {
                                if (call.base.kind === NodeKind.MemberExpression) {
                                    call.base._entry = entryType.lookup(call.base.identifier.name)
                                }
                            }
                        }
                    }
                }
                console.log('____' + call.text)
            }
        })
        // sourceFile.forEachDeepChildFirst(fun => {
        //     if (fun.kind === NodeKind.FunctionDeclaration) {
        //         console.log('FUNCTION: ')
        //         for (let [key, value] of fun.block.symbolTable.entry.parameter) {
        //             console.log('   PARAM: ' + key)
        //             value.print(text => console.log('    ' + text))
        //             console.log('      type: ' + value.type.asString)
        //         }
        //         console.log('END')
        //         fun.block.forEachDeep(node => {
        //             if (node.kind !== NodeKind.FunctionDeclaration) {
        //                 return true
        //             } else {
        //                 return false
        //             }
        //         })
        //     }
        // })
    }
}

function emitDebug(message: string) {
    console.log(message)
}

/**
 *
 * @param container
 */
function declarationAccess(container: Container) {
    const idents: MemberExpressionContainer[] = []
    container.forEachDeep(node => {
        if (isExpressionContainer(node) && node.kind !== NodeKind.FunctionDeclaration) {
            switch (node.kind) {
                case NodeKind.Identifier:
                    if (isResolvable(node)) {
                        node._entry = resolveEntry(node)
                    }
                    break;
                case NodeKind.MemberExpression:
                    if (isResolvable(node)) {
                        if (node.isSelfRef) {
                            idents.push(node)
                        } else {
                            node._entry = resolveEntry(node)
                            if (!node._entry) {
                                console.log(chalk.red(node.text))
                            }
                            return false
                        }
                    }
                    break;
            }
            return true
        }
        return true
    })
    // just for e.g.: e1:SetCode, checker if e1 is resolved
    for (let ident of idents) {
        console.log(chalk.red(JSON.stringify(ident.base['_entry'] || {})))
    }
}

function isExpressionContainer(container: Container): container is ExpressionContainer {
    return container.kind === NodeKind.Identifier
        || container.kind === NodeKind.StringLiteral
        || container.kind === NodeKind.NumericLiteral
        || container.kind === NodeKind.BooleanLiteral
        || container.kind === NodeKind.NilLiteral
        || container.kind === NodeKind.VarargLiteral
        || container.kind === NodeKind.TableConstructorExpression
        || container.kind === NodeKind.BinaryExpression
        || container.kind === NodeKind.LogicalExpression
        || container.kind === NodeKind.UnaryExpression
        || container.kind === NodeKind.MemberExpression
        || container.kind === NodeKind.IndexExpression
        || container.kind === NodeKind.CallExpression
        || container.kind === NodeKind.TableCallExpression
        || container.kind === NodeKind.StringCallExpression
        || container.kind === NodeKind.FunctionDeclaration
}

/**
 * variable-entries for function-declaration, assign-statement and local-statement
 * @param container
 */
function declarations(container: Container) {
    emitDebug(declarations.name)
    container.forEachDeep(node => {
        if (node.kind === NodeKind.FunctionDeclaration) {
            if (node.identifier) {
                if (isResolvable(node.identifier)) {
                    const entry = declareVariable(node.identifier, node.isLocal)
                    entry.functionEntry = node.block.symbolTable.entry
                } else {
                    console.warn('not implemented ' + node.identifier.text)
                }
            }
        } else if (node.kind === NodeKind.LocalStatement) {
            for (let variable of node.variables) {
                let entry = node.symbols.lookup(variable.name)
                if (entry) {
                    emitDuplicateDeclaration(entry, variable)
                } else {
                    entry = node.symbols.enter<VariableEntry>(variable.name, new VariableEntry(), true)
                }
            }
        } else if (node.kind === NodeKind.AssignmentStatement) {
            for (let variable of node.variables) {
                if (isResolvable(variable)) {
                    if (variable.kind !== NodeKind.IndexExpression) {
                        declareVariable(variable, false)
                    } else {
                        console.warn('not implemented' + variable.text)
                    }
                } else {
                    console.warn('not implemented ' + variable.text)
                }
            }
        }
        return true
    })
}

function emitDuplicateDeclaration(before: EntryLike, after: IdentifierContainer) {
}

function isVariable(container: Container): container is IdentifierContainer | MemberExpressionContainer | IndexExpressionContainer {
    return container.kind === NodeKind.Identifier
        || container.kind === NodeKind.MemberExpression
        || container.kind === NodeKind.IndexExpression
}

function resolveEntry(node: Container) {
    let entry: EntryLike | undefined
    switch (node.kind) {
        case NodeKind.Identifier:
            entry = node.symbols.lookup(node.name)
            if (!entry) {
                console.error('Couldnt resolve ' + node.text)
            }
            break
        case NodeKind.MemberExpression:
            entry = resolveEntry(node.base)
            if (!entry) {
                console.error('Couldnt resolve ' + node.base.text)
            } else {
                switch (entry.kind) {
                    case EntryKind.ReturnEntry:
                        console.error('Return notimp')
                        break;
                    case EntryKind.FunctionEntry:
                        console.error('Function notimp')
                        break;
                    case EntryKind.VariableEntry:
                        entry = entry.lookup(node.identifier.name)
                        break;
                    case EntryKind.ParameterEntry:
                        entry = entry.lookup(node.identifier.name)
                        break;
                }
            }
            break
        default:
            throw new Error()
    }
    return entry
}

function declareVariable(node: Container, isLocal: boolean): VariableEntry {
    let variable = new VariableEntry()
    switch (node.kind) {
        case NodeKind.Identifier:
            variable = node.symbols.lookupExpectTypeOrUndefined(node.name, EntryKind.VariableEntry)
                || node.symbols.enter(node.name, variable, isLocal)
            break
        case NodeKind.MemberExpression:
            variable = variable.lookupExpectTypeOrUndefined(node.identifier.name, EntryKind.VariableEntry)
                || declareVariable(node.base, isLocal).enter(node.identifier.name, variable)
            break
        default:
            throw new Error()
    }
    return variable
}

function isResolvable(node: Container) {
    if (node.kind === NodeKind.MemberExpression) {
        return isResolvable(node.base)
    } else return node.kind === NodeKind.Identifier;
}


export function bind(sourceFile: SourceFileContainer) {
    sourceFile.forEachDeep(node => {
        if (node.kind === NodeKind.Block) {
            bindBlock(node)
            return false
        }
        return true
    })
    sourceFile.forEachDeepChildFirst(node => {
        if (node.kind === NodeKind.FunctionDeclaration) {
            bindFunction(node)
        }
        return true
    })
    
    print(sourceFile, text => console.log(text))
    
    function print(container: Container, out: (text: string) => void) {
        out(container.kind)
        printTypeContext(container, text => out('> ' + text))
        container.forEachChild(node => print(node, text => out('    ' + text)))
    }
    
    function printTypeContext(container: Container, out: (text: string) => void) {
        if (isExpressionContainer(container)) {
            switch (container.kind) {
                case NodeKind.StringLiteral:
                    break;
                case NodeKind.FunctionDeclaration:
                    container.block.symbolTable.entry.print(out)
                    break;
                case NodeKind.Identifier:
                    break;
                case NodeKind.NumericLiteral:
                    break;
                case NodeKind.BooleanLiteral:
                    break;
                case NodeKind.NilLiteral:
                    break;
                case NodeKind.VarargLiteral:
                    break;
                case NodeKind.TableConstructorExpression:
                    break;
                case NodeKind.BinaryExpression:
                    break;
                case NodeKind.LogicalExpression:
                    break;
                case NodeKind.UnaryExpression:
                    break;
                case NodeKind.MemberExpression:
                    break;
                case NodeKind.IndexExpression:
                    break;
                case NodeKind.CallExpression:
                    break;
                case NodeKind.TableCallExpression:
                    break;
                case NodeKind.StringCallExpression:
                    break;
            }
            out('Node-Type: ' + (container._type?.asString || '?'))
        }
    }
    
    function bindFunction(container: FunctionExpressionContainer) {
        container.forEachDeep(node => {
            if (node.kind === NodeKind.FunctionDeclaration) {
                return false
            } else if (node.kind === NodeKind.ReturnStatement) {
                console.log(node)
            }
            return true
        })
    }
    
    function bindBlock(block: BlockContainer) {
        block.forEachDeepChildFirst(node => {
            switch (node.kind) {
                case NodeKind.BreakStatement:
                    break;
                case NodeKind.LabelStatement:
                    break;
                case NodeKind.GotoStatement:
                    break;
                case NodeKind.ReturnStatement:
                    break;
                case NodeKind.IfStatement:
                    break;
                case NodeKind.WhileStatement:
                    break;
                case NodeKind.DoStatement:
                    break;
                case NodeKind.RepeatStatement:
                    break;
                case NodeKind.LocalStatement:
                    for (let i = 0; i < node.variables.length; i++) {
                        if (i < node.init.length) {
                            const type = node.init[i]._type
                            if (type) {
                                // node.variables[i]._typeInfer.push([TypeInferFlag.Include, [type]])
                            }
                        } else {
                            console.warn('notimp')
                        }
                    }
                    break;
                case NodeKind.AssignmentStatement:
                    for (let i = 0; i < node.variables.length; i++) {
                        if (i < node.init.length) {
                            const type = node.init[i]._type
                            if (type) {
                                // node.variables[i]._typeInfer.push([TypeInferFlag.Include, [type]])
                            }
                        } else {
                            console.warn('notimp')
                        }
                    }
                    break;
                case NodeKind.CallStatement:
                    break;
                case NodeKind.ForNumericStatement:
                    break;
                case NodeKind.ForGenericStatement:
                    break;
                case NodeKind.FunctionDeclaration:
                    node._type = Primitive.Function
                    break;
                case NodeKind.Identifier:
                    if (node.parent.kind !== NodeKind.MemberExpression) {
                    }
                    break;
                case NodeKind.StringLiteral:
                    node._type = Primitive.String
                    break;
                case NodeKind.NumericLiteral:
                    node._type = Primitive.Number
                    break;
                case NodeKind.BooleanLiteral:
                    node._type = Primitive.Bool
                    break;
                case NodeKind.NilLiteral:
                    node._type = Primitive.Nil
                    break;
                case NodeKind.VarargLiteral:
                    console.warn('notimp')
                    break;
                case NodeKind.TableConstructorExpression:
                    break;
                case NodeKind.BinaryExpression:
                    binaryOperatorInferTypesToExpressions[node.operator](node, node.left, node.right)
                    break;
                case NodeKind.LogicalExpression:
                    console.log(node.text)
                    break;
                case NodeKind.UnaryExpression:
                    node._type = unaryOperatorToTypeMap[node.operator]
                    break;
                case NodeKind.MemberExpression:
                    break;
                case NodeKind.IndexExpression:
                    break;
                case NodeKind.CallExpression:
                    if (node.base.kind === NodeKind.MemberExpression || node.base.kind === NodeKind.Identifier) {
                        console.log(node.base._entry)
                    }
                    break;
                case NodeKind.TableCallExpression:
                    break;
                case NodeKind.StringCallExpression:
                    break;
                case NodeKind.IfClause:
                    break;
                case NodeKind.ElseifClause:
                    break;
                case NodeKind.ElseClause:
                    break;
                case NodeKind.Chunk:
                    break;
                case NodeKind.TableKey:
                    break;
                case NodeKind.TableKeyString:
                    break;
                case NodeKind.TableValue:
                    break;
                case NodeKind.Comment:
                    break;
                case NodeKind.SourceFile:
                    break;
                case NodeKind.Block:
                    break;
            }
            return true
        })
    }
    
}