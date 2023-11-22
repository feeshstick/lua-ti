import {ObjectMap} from "./object-map.js";

export function entries<E>(list: ObjectMap<E>):[string, E][] {
    return Object.keys(list).map(x => [x, list[x]] as [string, E])
}