import {_Symbol} from "../symbol-table.js";
import {Container, ExpressionContainer, NodeKind} from "../../components/container-types.js";
import {entries} from "../table-builder.js";

export enum InjectKind {
    Injector,
    Injection
}

export abstract class AbstractInject<E extends InjectKind> {
    public abstract readonly kind: InjectKind
    
    abstract isInjector(): this is Injector
    
    abstract isInjection(): this is Injection
}

export type InjectorInitializer = {
    [name: string]: InjectorInitializer | InjectionInitializer
}

export class Injector extends AbstractInject<InjectKind.Injector> {
    static create(init: InjectorInitializer): Injector {
        return new Injector(entries(init).reduce((map, [key, value]) => {
            if (typeof value === 'function') {
                map.set(key, Injection.create(value))
            } else {
                map.set(key, Injector.create(value))
            }
            return map
        }, new Map()))
        
    }
    
    public readonly kind = InjectKind.Injector
    
    constructor(
        public readonly entries: Map<string, Injectable>
    ) {
        super()
    }
    
    isInjector(): this is Injector {
        return true
    }
    
    isInjection(): this is Injection {
        return false
    }
    
}

interface InjectionReceiver {
    onInit(symbol: _Symbol)
}

interface SymbolInitializer {
    access<A>(kind: A, consumer: (node: A extends Container['kind'] ? Extract<Container, {
        kind: A
    }> : never) => (_Symbol | void)): void
    
    assign(consumer: (variables: ExpressionContainer[]) => void): void
}

export type InjectionInitializer = (symbol: _Symbol, _constructor: SymbolInitializer) => void

export class Injection extends AbstractInject<InjectKind.Injection> {
    static create(init: InjectionInitializer) {
        return new Injection({
            onInit(_symbol: _Symbol) {
                const accessListener: Map<NodeKind, (container: Container) => (void | _Symbol)> = new Map()
                _symbol.properties.onAccess = container => {
                    const listener = accessListener.get(container.kind)
                    if (listener) {
                        return listener(container)
                            || _symbol.properties.symbolConstructor(container)
                    } else {
                        return _symbol.properties.symbolConstructor(container)
                    }
                }
                init(_symbol, {
                    access<A>(kind, consumer) {
                        accessListener.set(kind, consumer)
                    },
                    assign(consumer: (variables: ExpressionContainer[]) => void) {
                        _symbol.properties.onAssign = consumer
                    }
                })
            }
        })
    }
    
    public readonly kind = InjectKind.Injection
    
    constructor(
        public readonly receiver: InjectionReceiver
    ) {
        super();
    }
    
    isInjector(): this is Injector {
        return false
    }
    
    isInjection(): this is Injection {
        return true
    }
    
    emitSetInjection(symbol: _Symbol) {
        this.receiver.onInit(symbol)
    }
    
}

export type Injectable = Injector | Injection