import {Statement} from "luaparse";

import {BlockContainer} from "./nodes/meta/block-container.js";

import {Container} from "./container-types.js";

export class Scope {
    readonly childScopes: [string | undefined, Container, Scope][] = []
    
    constructor(
        public readonly location?: Container,
        public readonly parent?: Scope,
        public readonly block?: BlockContainer,
    ) {
    }
    
    static createBody(container: Container, statements: Statement[], name?: string) {
        const scope = container.scope.createScope(container, name)
        return new BlockContainer({
            type: 'Block',
            statements: statements,
            loc: container.node.loc,
            range: container.range
        }, container, scope)
    }
    
    createScope(container: Container, name?: string): Scope {
        const scope = new Scope(container, this)
        this.childScopes.push([name, container, scope])
        return scope
    }
}