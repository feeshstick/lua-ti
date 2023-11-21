import {Container} from "../components/container-types.js";

export type Curse = () => Curse[]

export function breathFirstIterator(curse: Curse[]) {
    const curseLater: Curse[] = []
    for (let curseElement of curse) {
        curseLater.push(...curseElement())
    }
    if (curseLater.length > 0) {
        breathFirstIterator(curseLater)
    }
}

export function forEachNodeBreathFirst(node: Container, consumer: (container: Container) => Container) {
    node.forEachDeep(child=>{
        const result = consumer(child)
        
        return !result;
    })
}