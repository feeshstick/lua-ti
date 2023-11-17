import {Scope} from "./scope.js";
import {Container, createContainer, ExtendedNode, NodeKind, NodeRef} from "./container-types.js";

import {BlockContainer} from "./nodes/meta/block-container.js";
import {SourceFileContainer} from "./nodes/meta/source-file-container.js";
import {ChunkContainer} from "./nodes/meta/chunk-container.js";
import {SymbolTable} from "../table/symbol-table.js";
import {CompilerOptions} from "../compiler-options/compiler-options.js";
import {LuaTiErrorHelper} from "../error/lua-ti-error.js";
import {CommentContainer} from "./nodes/trivia/comment-trivia-container.js";
import {Comment} from "luaparse/lib/ast.js";

export abstract class AbstractContainer<T> {
    private static idCounter = 0
    public readonly id: number
    
    protected constructor(
        public readonly scope: Scope
    ) {
        this.id = BaseContainer.idCounter++
    }
}

export enum ContainerFlag {
    None = 0,
    Declaration = 1,
    Global = 1 << 1,
    Local = 1 << 2,
    Member = 1 << 3,
    Function = 1 << 4,
    Parameter = (1 << 5) | Local,
    Call = 1 << 6,
    Argument = 1 << 7,
    Semi = 1 << 8,
    Indexed = 1 << 9,
    AssignNewValue = 1 << 10,
    DeclareGlobal = Global | Declaration,
    DeclareLocal = Local | Declaration,
    DeclareOrResolveGlobal = Global | Declaration | Member,
    DeclareOrResolveLocal = Local | Declaration | Member,
}

/**
 * 0000 0000 0000 0000
 *            CPF RLGD
 * D allow Declaration
 * G Global Scope Flag
 * L Local Scope Flag
 * R allow Resolve
 * F Function Flag
 * P Parameter Flag
 * C Call Flag
 * A Argument Flag
 */

export function isDeclarationFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Declaration) === ContainerFlag.Declaration
}

export function isAssignNewValue(flag: ContainerFlag) {
    return (flag & ContainerFlag.AssignNewValue) === ContainerFlag.AssignNewValue
}

export function isLocalFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Local) === ContainerFlag.Local
}

export function isParameterFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Parameter) === ContainerFlag.Parameter
}

export function isSemiFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Semi) === ContainerFlag.Semi
}

export function isMemberFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Member) === ContainerFlag.Member
}

export function isCallFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Call) === ContainerFlag.Call
}

export abstract class BaseContainer<NKind extends NodeKind> extends AbstractContainer<NKind> {
    public abstract readonly kind: NKind
    public abstract readonly node: NodeRef<NKind extends ExtendedNode['type'] ? ExtendedNode['type'] : never>
    public abstract parent: Container | undefined
    public block?: BlockContainer
    public flag: ContainerFlag = ContainerFlag.None
    private __tableOverwrite: SymbolTable | undefined;
    public readonly comments: CommentContainer[] = []
    
    protected constructor(
        scope: Scope
    ) {
        super(scope)
    }
    
    onInit() {
        if (this.node['comments']) {
            for (let comment of (this.node['comments'] as Comment[])) {
                const commentContainer = createContainer(comment, this as Container, this.scope) as CommentContainer
                this.comments.push(commentContainer)
                commentContainer.onInit()
            }
        }
    }
    
    abstract forEachChild(node: (node: Container) => void)
    
    get compilerOptions(): CompilerOptions {
        if (this.kind === NodeKind.Chunk) {
            return (this as unknown as ChunkContainer).sourceFile.compilerOptions
        } else if (this.kind === NodeKind.SourceFile || !this.parent) {
            throw LuaTiErrorHelper.CannotAccessCompilerOptionsOfRootFile()
        } else {
            return this.parent.compilerOptions
        }
    }
    
    get errLoc() {
        return `${this.node.loc!.start.line}:${this.node.loc!.start.column + 1}`
    }
    
    get range(): [number, number] {
        // @ts-ignore range is defined in luaparse.Node during Runtime
        return this.node.range
    }
    
    get text(): string {
        return this.getTextFromRange(this.range)
    }
    
    getTextFromRange(range: [number, number]) {
        return this.parent!.getTextFromRange(range)
    }
    
    find<E extends Container>(kind: E['kind']): E | undefined {
        if (this.kind === kind) {
            return this as unknown as E
        } else {
            return this.parent?.find(kind)
        }
    }
    
    setTableOverwrite(table: SymbolTable) {
        this.__tableOverwrite = table
    }
    
    clearTableOverwrite() {
        this.__tableOverwrite = undefined
    }
    
    get table(): SymbolTable {
        if (this.__tableOverwrite) {
            return this.__tableOverwrite
        } else {
            if (this.kind === NodeKind.SourceFile) {
                return (this as unknown as SourceFileContainer).getGlobalTable()
            } else if (this.kind === NodeKind.Block) {
                return (this as unknown as BlockContainer).getLocalTable()
            } else {
                if (this.parent) {
                    return this.parent.table
                } else {
                    throw new Error()
                }
            }
        }
    }
    
    forEachDeep(node: (node: Container) => boolean) {
        this.forEachChild(child => {
            if (node(child)) {
                child.forEachDeep(node)
            }
        })
    }
    
    forEachDeepChildFirst(node: (node: Container) => void) {
        this.forEachChild(child => {
            child.forEachDeepChildFirst(node)
            node(child)
        })
    }
    
}

export function forEachChildArray<E>(container: Container[], consumer: (node: Container) => E, doVisit: boolean): E {
    let result: E | undefined = undefined
    if (doVisit) {
        for (let containerElement of container) {
            result ||= consumer(containerElement)
            result ||= forEachChild(containerElement, e => consumer(e))
        }
    } else {
        for (let containerElement of container) {
            result ||= forEachChild(containerElement, e => consumer(e))
        }
    }
    return result as E
}

export function forEachChild<E>(container: Container, consumer: (node: Container) => E): E | undefined {
    function visit<A extends E>(node: Container | Container[] | undefined | null): E {
        if (node) {
            if (node instanceof Array) {
                return forEachChildArray<E>(node, e => consumer(e), true) as E
            } else {
                return (forEachChild<E>(node, e => consumer(e)) || consumer(node)) as E
            }
        } else {
            return undefined as E
        }
    }
    
    switch (container.kind) {
        case NodeKind.Block:
            return visit(container.statements)
        case NodeKind.BreakStatement:
            break;
        case NodeKind.LabelStatement:
            return visit(container.label)
        case NodeKind.GotoStatement:
            return visit(container.label)
        case NodeKind.ReturnStatement:
            return visit(container.arguments)
        case NodeKind.IfStatement:
            return visit(container.clauses)
        case NodeKind.WhileStatement:
            return visit(container.condition)
                || visit(container.block)
        case NodeKind.DoStatement:
            return visit(container.block)
        case NodeKind.RepeatStatement:
            return visit(container.condition)
                || visit(container.block)
        case NodeKind.LocalStatement:
            return visit(container.init)
                || visit(container.variables)
        case NodeKind.AssignmentStatement:
            return visit(container.init)
                || visit(container.variables)
        case NodeKind.CallStatement:
            return visit(container.expression)
        case NodeKind.ForNumericStatement:
            return visit(container.start)
                || visit(container.end)
                || visit(container.step)
                || visit(container.block)
        case NodeKind.ForGenericStatement:
            return visit(container.variables)
                || visit(container.iterators)
                || visit(container.block)
        case NodeKind.FunctionDeclaration:
            return visit(container.identifier)
                || visit(container.parameter)
                || visit(container.block)
        case NodeKind.Identifier:
            break;
        case NodeKind.StringLiteral:
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
            return visit(container.fields)
        case NodeKind.BinaryExpression:
            return visit(container.left)
                || visit(container.right)
        case NodeKind.LogicalExpression:
            return visit(container.left)
                || visit(container.right)
        case NodeKind.UnaryExpression:
            return visit(container.argument)
        case NodeKind.MemberExpression:
            return visit(container.base)
                || visit(container.identifier)
        case NodeKind.IndexExpression:
            return visit(container.base)
                || visit(container.index)
        case NodeKind.CallExpression:
            return visit(container.arguments)
                || visit(container.base)
        case NodeKind.TableCallExpression:
            return visit(container.arguments)
                || visit(container.base)
        case NodeKind.StringCallExpression:
            return visit(container.argument)
                || visit(container.base)
        case NodeKind.IfClause:
            return visit(container.condition)
                || visit(container.block)
        case NodeKind.ElseifClause:
            return visit(container.condition)
                || visit(container.block)
        case NodeKind.ElseClause:
            return visit(container.block)
        case NodeKind.Chunk:
            return visit(container.block)
        case NodeKind.TableKey:
            return visit(container.key)
                || visit(container.value)
        case NodeKind.TableKeyString:
            return visit(container.key)
                || visit(container.value)
        case NodeKind.TableValue:
            return visit(container.value)
        case NodeKind.Comment:
            break;
        case NodeKind.SourceFile:
            return visit(container.chunks)
    }
    return undefined
}

export function forEachChildExtended<E>(container: Container, consumer: (node: Container, key: string, index: number, depth: number) => E, depth: number = 0): E | undefined {
    function visit<A extends E>(node: Container | Container[] | undefined | null, key: string): E {
        if (node) {
            if (node instanceof Array) {
                let result: E | undefined = undefined
                for (let i = 0; i < node.length; i++) {
                    let nodeElement = node[i];
                    result ||= consumer(nodeElement, key, i, depth) || forEachChildExtended(nodeElement, consumer, depth + 1) as E
                }
                return result! as E
            } else {
                return consumer(node, key, 0, depth) || forEachChildExtended(node, consumer, depth + 1) as E
            }
        } else {
            return undefined as E
        }
    }
    
    switch (container.kind) {
        case NodeKind.Block:
            return visit(container.statements, 'statements')
        case NodeKind.BreakStatement:
            break;
        case NodeKind.LabelStatement:
            return visit(container.label, 'label')
        case NodeKind.GotoStatement:
            return visit(container.label, 'label')
        case NodeKind.ReturnStatement:
            return visit(container.arguments, 'arguments')
        case NodeKind.IfStatement:
            return visit(container.clauses, 'clauses')
        case NodeKind.WhileStatement:
            return visit(container.condition, 'condition')
                || visit(container.block, 'block')
        case NodeKind.DoStatement:
            return visit(container.block, 'block')
        case NodeKind.RepeatStatement:
            return visit(container.condition, 'condition')
                || visit(container.block, 'block')
        case NodeKind.LocalStatement:
            return visit(container.init, 'init')
                || visit(container.variables, 'variables')
        case NodeKind.AssignmentStatement:
            return visit(container.init, 'init')
                || visit(container.variables, 'variables')
        case NodeKind.CallStatement:
            return visit(container.expression, 'expression')
        case NodeKind.ForNumericStatement:
            return visit(container.start, 'start')
                || visit(container.end, 'end')
                || visit(container.step, 'step')
                || visit(container.block, 'block')
        case NodeKind.ForGenericStatement:
            return visit(container.variables, 'variables')
                || visit(container.iterators, 'iterators')
                || visit(container.block, 'block')
        case NodeKind.FunctionDeclaration:
            return visit(container.identifier, 'identifier')
                || visit(container.parameter, 'parameter')
                || visit(container.block, 'block')
        case NodeKind.Identifier:
            break;
        case NodeKind.StringLiteral:
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
            return visit(container.fields, 'fields')
        case NodeKind.BinaryExpression:
            return visit(container.left, 'left')
                || visit(container.right, 'right')
        case NodeKind.LogicalExpression:
            return visit(container.left, 'left')
                || visit(container.right, 'right')
        case NodeKind.UnaryExpression:
            return visit(container.argument, 'argument')
        case NodeKind.MemberExpression:
            return visit(container.base, 'base')
                || visit(container.identifier, 'identifier')
        case NodeKind.IndexExpression:
            return visit(container.base, 'base')
                || visit(container.index, 'index')
        case NodeKind.CallExpression:
            return visit(container.arguments, 'arguments')
                || visit(container.base, 'base')
        case NodeKind.TableCallExpression:
            return visit(container.arguments, 'arguments')
                || visit(container.base, 'base')
        case NodeKind.StringCallExpression:
            return visit(container.argument, 'argument')
                || visit(container.base, 'base')
        case NodeKind.IfClause:
            return visit(container.condition, 'condition')
                || visit(container.block, 'block')
        case NodeKind.ElseifClause:
            return visit(container.condition, 'condition')
                || visit(container.block, 'block')
        case NodeKind.ElseClause:
            return visit(container.block, 'block')
        case NodeKind.Chunk:
            return visit(container.block, 'block')
        case NodeKind.TableKey:
            return visit(container.key, 'key')
                || visit(container.value, 'value')
        case NodeKind.TableKeyString:
            return visit(container.key, 'key')
                || visit(container.value, 'value')
        case NodeKind.TableValue:
            return visit(container.value, 'value')
        case NodeKind.Comment:
            break;
        case NodeKind.SourceFile:
            return visit(container.chunks, 'chunks')
    }
    return undefined
}