import fs from "fs";
import sqlite3 from "sqlite3";
import {WebSocketServer} from "ws";
import {AssetMap, CardDirectory, CardID, Declaration, FunctionDeclaration, Range,} from "./build-assets.js";
import {SectionEntry} from "./build-documentation-assets.js";

export type CompilationPhase = 'parse' | 'global-initializer' | 'collect-assign-statements' | 'bind'

function checkAssets() {
    crawl('assets/CardScripts', (path, file) => {
        if (file.endsWith('.lua')) {
            console.log(path + '/' + file)
        }
    })
}

function crawl(dir: string, consumer: (path: string, file: string) => void) {
    for (let string of fs.readdirSync(dir)) {
        const path = dir + '/' + string
        if (fs.lstatSync(path).isFile()) {
            consumer(path, string)
        } else {
            crawl(dir + '/' + string, consumer)
        }
    }
}

export interface Request {
    path: string
    id: string
    args: any[]
}

export interface Response<E> {
    request: Request
    data: E
}

type RequestProcessor<E> = (...args: any) => Promise<Response<E>['data']>

type RequestProcessorEntry = {
    [key: string]: RequestProcessorEntry | RequestProcessor<any>
}

export interface CardInfo {
    id: number
    name: string
    desc: string
    str: string[]
    flag?: 'Pre-Errata' | 'Anime' | 'VG' | 'TFG' | 'Manga'
    alias: number
    setcode: number
    type: number
    atk: number
    def: number
    level: number
    attribute: number
    category: number
    declarations?: {
        declaration: Declaration
        ranges: Range[]
    }[]
    source?: string
}

export interface GetCardConfig {
    getSourceCode?: boolean
    getDeclarations?: boolean
}

export interface GetAllCardsConfig {
    pageIndex: number
    pageSize: number
}

export namespace WServer {
    
    export function serve(port) {
        const onInit: VoidFunction[] = []
        const assets: AssetMap = JSON.parse(fs.readFileSync('out/asset-map.json').toString('utf-8'), reviver)
        const declarations: Declaration[] = JSON.parse(fs.readFileSync('out/declaration-list.json').toString('utf-8'), reviver)
        const effectDeclarations: FunctionDeclaration[] = declarations.filter(x => x.name.startsWith('Effect.')) as never
        console.log(assets)
        let initCount = 0
        const database = {
            official: new sqlite3.Database('assets/BabelCDB/cards.cdb', updateInit),
            unofficial: new sqlite3.Database('assets/BabelCDB/cards-unofficial.cdb', updateInit)
        }
        
        function updateInit() {
            initCount++
            if (initCount === Object.keys(database).length) {
                for (let voidFunction of onInit) {
                    voidFunction()
                }
            }
        }
        
        function reduceCard(result) {
            return Object.entries(result).reduce((p, [key, val]) => {
                if (key.startsWith('str')) {
                    if ((val as string).length > 0) {
                        p['str'].push(val)
                    }
                } else {
                    p[key] = val
                }
                return p
            }, {str: []} as any)
        }
        
        const requestProcessor: RequestProcessorEntry = {
            usage: (entry: SectionEntry) => {
                return new Promise(resolve => {
                })
            },
            assets: () => {
                return new Promise(resolve => {
                    fs.readFile('out/asset-map.json', (err, data) => {
                        if (err) {
                            throw err
                        } else {
                            resolve(data.toString('utf-8'))
                        }
                    })
                })
            },
            documentation: () => {
                return new Promise(resolve => {
                    fs.readFile('out/parsed-documentation.json', (err, data) => {
                        if (err) {
                            throw err
                        } else {
                            resolve(data.toString('utf-8'))
                        }
                    })
                })
            },
            all: {
                cards: (directory: CardDirectory, config: GetAllCardsConfig) => {
                    const query = 'SELECT datas.id, datas.ot, datas.alias, datas.setcode, datas.type, datas.atk, datas.def, datas.level, datas.race, datas.attribute, datas.category,\n' +
                        '       texts.name, texts.desc, texts.str1, texts.str2, texts.str3, texts.str4, texts.str5, texts.str6, texts.str7, texts.str8, texts.str9, texts.str10, texts.str11, texts.str12, texts.str13, texts.str14, texts.str15, texts.str16\n' +
                        'FROM main.datas AS datas\n' +
                        'JOIN main.texts AS texts\n' +
                        'ON datas.id = texts.id\n' +
                        'ORDER BY datas.id\n' +
                        'LIMIT ' + config.pageSize + ' OFFSET ' + (config.pageIndex * config.pageSize) + ';'
                    return new Promise(resolve => {
                        if (database[directory]) {
                            database[directory].all(query, (err, result) => {
                                resolve(result.map(entry => reduceCard(entry)))
                            })
                        }
                    })
                }
            },
            get: {
                card: (cardID: CardID, directory: CardDirectory, config: GetCardConfig) => {
                    const query = 'SELECT datas.id, datas.ot, datas.alias, datas.setcode, datas.type, datas.atk, datas.def, datas.level, datas.race, datas.attribute, datas.category,\n' +
                        '       texts.name, texts.desc, texts.str1, texts.str2, texts.str3, texts.str4, texts.str5, texts.str6, texts.str7, texts.str8, texts.str9, texts.str10, texts.str11, texts.str12, texts.str13, texts.str14, texts.str15, texts.str16\n' +
                        'FROM main.datas AS datas\n' +
                        '         JOIN main.texts AS texts\n' +
                        '              ON datas.id = texts.id\n' +
                        'WHERE datas.id = ' + cardID + ';'
                    return new Promise(resolve => {
                        if (database[directory]) {
                            database[directory].get<any>(query, (err, result) => {
                                if (err) {
                                    throw err
                                } else {
                                    try {
                                        const obj = reduceCard(result)
                                        if (config.getSourceCode || config.getDeclarations) {
                                            const source = fs.readFileSync(`assets/CardScripts/${directory}/c${cardID}.lua`).toString('utf-8')
                                            if (config.getDeclarations) {
                                                const result: {
                                                    declaration: Declaration
                                                    ranges: Range[]
                                                }[] = []
                                                for (let declaration of declarations) {
                                                    let index = -1
                                                    const ranges: Range[] = []
                                                    while ((index = source.indexOf(declaration.name, index + 1)) !== -1) {
                                                        ranges.push([index, index + declaration.name.length])
                                                    }
                                                    if (ranges.length > 0) {
                                                        console.log(declaration.name)
                                                        result.push({
                                                            declaration: declaration,
                                                            ranges: ranges
                                                        })
                                                    }
                                                }
                                                obj['declarations'] = result
                                            }
                                            if (config.getSourceCode) {
                                                obj['source'] = source
                                            }
                                        }
                                        resolve(obj)
                                    } catch (e) {
                                        console.error(e)
                                        resolve(e)
                                    }
                                }
                            })
                        }
                    })
                }
            }
        }
        
        function escapeRegExp(string: string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        }
        
        onInit.push(() => {
            runServer(port)
            requestProcessor['get']!['card']!(10000, 'official', {
                getSourceCode: true,
                getDeclarations: true
            } as GetCardConfig).then(result => {
                console.log(result)
            })
            requestProcessor['all']!['cards']!('official', {
                pageSize: 10,
                pageIndex: 0
            } as GetAllCardsConfig).then(result => {
                console.log(result)
            })
        })
        
        function resolveRequest<E>(request: Request): Promise<RequestProcessor<E>> {
            return new Promise(resolve => {
                const processor = request.path.split('/').reduce((p, c) => {
                    if (typeof p !== 'function') {
                        return p[c]
                    } else {
                        throw new Error('not a path')
                    }
                }, requestProcessor as RequestProcessorEntry | RequestProcessor<E>)
                if (typeof processor === 'function') {
                    resolve(processor)
                } else {
                    throw new Error('not a path')
                }
            })
        }
        
        function runServer(port: number) {
            const server = new WebSocketServer({
                port: port
            })
            
            server.on('connection', client => {
                client.on('message', data => {
                    try {
                        const request: Request = JSON.parse(data.toString('utf-8'))
                        resolveRequest(request).then(processor => {
                            processor(...request.args).then(result => {
                                client.send(JSON.stringify({
                                    request: request,
                                    data: result
                                } as Response<any>))
                            }).catch(err => {
                                throw err
                            })
                        }).catch(err => {
                            client.send(JSON.stringify({
                                request: request,
                                err: err
                            }))
                        })
                    } catch (e) {
                        console.error(e)
                    }
                })
                client.on('close', () => {
                    console.log('close')
                })
                client.on('error', () => {
                    console.log('error')
                })
            })
        }
    }
    
    function reviver(key: any, value: any) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
    
    // function runCompilation(message: CompileRequest): CompileResponse {
    //     let program: Program
    //     let phase: CompilationPhase = 'parse'
    //     let err = false
    //     const errors: Error[] = []
    //     try {
    //         phase = 'parse'
    //         program = new Program({
    //             program: {
    //                 type: 'source',
    //                 source: message.source,
    //                 cardID: message.cardID
    //             },
    //             compilerOptions: {}
    //         })
    //     } catch (e) {
    //         err = true
    //         errors.push(e as Error)
    //     }
    //     if (program!) {
    //         try {
    //             phase = 'global-initializer'
    //             globalInitializer(program)
    //         } catch (e) {
    //             err = true
    //             errors.push(e as Error)
    //         }
    //         if (!err) {
    //             try {
    //                 phase = 'collect-assign-statements'
    //                 collectAssignStatements(program)
    //             } catch (e) {
    //                 err = true
    //                 errors.push(e as Error)
    //             }
    //         }
    //         if (!err) {
    //             try {
    //                 phase = 'bind'
    //                 visitTableBuilder2(program)
    //             } catch (e) {
    //                 err = true
    //                 errors.push(e as Error)
    //             }
    //         }
    //     }
    //     return {
    //         request: message,
    //         errors: errors.map(x => x.message),
    //         phase: phase
    //     }
    // }
}
