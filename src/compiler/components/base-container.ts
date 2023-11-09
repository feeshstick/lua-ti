import {Scope} from "../scope/scope.js";
import {Container, ExtendedNode, FileReference, NodeKind, NodeRef} from "./types.js";

import {BlockContainer} from "./nodes/meta/block-container.js";
import {SourceFileContainer} from "./nodes/meta/source-file-container.js";
import {ChunkContainer} from "./nodes/meta/chunk-container.js";
import {SymbolTable} from "../table/symbol-table.js";

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
    Resolve = 1 << 3,
    Function = 1 << 4,
    Parameter = (1 << 5) | Local,
    Call = 1 << 6,
    Argument = 1 << 7,
    
    DeclareGlobal = Global | Declaration,
    DeclareLocal = Local | Declaration,
    DeclareOrResolveGlobal = Global | Declaration | Resolve,
    DeclareOrResolveLocal = Local | Declaration | Resolve,
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

export function isFunctionDeclaration(flag: ContainerFlag) {
    return isDeclarationFlag(flag) && (flag & ContainerFlag.Function) === ContainerFlag.Function
}

export function isLocalFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Local) === ContainerFlag.Local
}

export function isParameterDeclarationFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Parameter) === ContainerFlag.Parameter
}

export function isResolveFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Resolve) === ContainerFlag.Resolve
}

export function isCallFlag(flag: ContainerFlag) {
    return (flag & ContainerFlag.Call) === ContainerFlag.Call
}

export abstract class BaseContainer<NKind extends NodeKind> extends AbstractContainer<NKind> {
    public _stopPropagation: boolean = false
    public abstract readonly kind: NKind
    public abstract readonly node: NodeRef<NKind extends ExtendedNode['type'] ? ExtendedNode['type'] : never>
    public abstract parent: Container | undefined
    public block?: BlockContainer
    public readonly _flags: string[] = []
    public flag: ContainerFlag = ContainerFlag.None
    
    protected constructor(
        scope: Scope
    ) {
        super(scope)
    }
    
    /**
     * @deprecated
     * @param flag
     */
    deprSetFlag(flag: string) {
        this._flags.push(flag)
    }
    
    get errLoc() {
        return `${this.node.loc!.start.line}:${this.node.loc!.start.column}`
    }
    
    get fileReference(): FileReference {
        if (this.kind === NodeKind.Chunk) {
            return (this as unknown as ChunkContainer).sourceFile
        } else if (this.parent) {
            return this.parent.fileReference
        } else {
            throw new Error()
        }
    }
    
    get depth() {
        return this.parent ? this.parent.depth + 1 : 1
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
    
    getText(source: string) {
        return source.slice(this.range[0], this.range[1])
    }
    
    createScope(): Scope {
        return this.scope.createScope(this as Container)
    }
    
    find<E extends Container>(kind: E['kind']): E | undefined {
        if (this.kind === kind) {
            return this as unknown as E
        } else {
            return this.parent?.find(kind)
        }
    }
    
    get __table(): SymbolTable {
        if (this.kind === NodeKind.SourceFile) {
            return (this as unknown as SourceFileContainer).getGlobalTable()
        } else if (this.block) {
            return this.block.getLocalTable()
        } else {
            if (this.parent) {
                return this.parent.__table
            } else {
                throw new Error()
            }
        }
    }
    
    abstract forEachChild(node: (node: Container) => void)
    
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