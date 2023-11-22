export function hasOwnProperty<E>(element: E, key: keyof E | string): key is keyof E {
    // @ts-ignore
    return typeof element[key] !== 'undefined'
}