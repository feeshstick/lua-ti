import {Statement} from "luaparse";

import {Block, ContainerFlag2} from "./nodes/meta/block.js";

import {Container} from "./container-types.js";

export class Scope {
    readonly childScopes: [string | undefined, Container, Scope][] = []
    public readonly idProvider: () => number;
    
    constructor(
        public readonly location?: Container,
        public readonly parent?: Scope,
        public readonly block?: Block,
    ) {
        if (!this.parent) {
            let number = 0
            this.idProvider = () => {
                return number++
            }
        } else {
            this.idProvider = this.parent.idProvider!
        }
    }
    
    static createBody(container: Container, statements: Statement[], flag: ContainerFlag2, name?: string) {
        const scope = container.scope.createScope(container, name)
        return new Block({
            type: 'Block',
            statements: statements,
            loc: container.node.loc,
            range: container.range
        }, container, flag, scope)
    }
    
    createScope(container: Container, name?: string): Scope {
        const scope = new Scope(container, this)
        this.childScopes.push([name, container, scope])
        return scope
    }
}