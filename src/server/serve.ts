import fs from "fs";
import {Program} from "../compiler/components/nodes/meta/program.js";
import {globalInitializer} from "../compiler/table/global/global-initializer.js";
import {collectAssignStatements} from "../compiler/table/table-assign-initializer.js";
import {visitTableBuilder2} from "../compiler/table/table-builder.js";
import sqlite3, {Database} from "sqlite3";
import {WebSocketServer} from "ws";

interface Ident {
    uuid: string
}

export enum RequestKind {
    Error,
    Init,
    Compile,
    CardIdToNameEntries
}

export interface AbstractRequest<E extends RequestKind> extends Ident {
    kind: E
}

export type InitRequest = AbstractRequest<RequestKind.Init>
export type CardIdToNameEntries = AbstractRequest<RequestKind.CardIdToNameEntries>

export interface CompileRequest extends AbstractRequest<RequestKind.Compile> {
    source: string
    cardID: number
}

export type Request =
    | InitRequest
    | CompileRequest
    | CardIdToNameEntries

export interface Response {
    request: Request
    data: any
}

export type AssetMap = Map<string, AssetMap | string>

interface CompileResponse {
    request: CompileRequest
    errors: string[]
    phase: CompilationPhase
}

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

export namespace WServer {
    
    export function serve(port) {
        const onInit: VoidFunction[] = []
        const main = {
            texts: 'id,name,desc,str1,str2,str3,str4,str5,str6,str7,str8,str9,str10,str11,str12,str13,str14,str15,str6'
        }
        const db = new sqlite3.Database('assets/BabelCDB/cards-unofficial.cdb', () => {
            for (let voidFunction of onInit) {
                voidFunction()
            }
        })
        onInit.push(() => {
            runServer(port, db)
        })
        
        function runServer(port: number, db: Database) {
            const server = new WebSocketServer({
                port: port
            })
            
            server.on('connection', client => {
                console.log('open')
                client.on('message', data => {
                    try {
                        const request: Request = JSON.parse(data.toString('utf-8'))
                        switch (request.kind) {
                            case RequestKind.CardIdToNameEntries:
                                getCardIdToNameEntries().then(data => {
                                    client.send(JSON.stringify({
                                        request: request,
                                        data: data
                                    } as Response))
                                }).catch(reject => {
                                    console.error('reject ' + reject.toString())
                                })
                                break
                            case RequestKind.Init:
                                break
                            case RequestKind.Compile:
                                runCompilation(request)
                                break
                        }
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
        
        function getCardIdToNameEntries() {
            return new Promise(resolve => {
                db.all(`SELECT ${main.texts} FROM main.texts`, (err, data) => {
                    if (data) {
                        resolve(data.map(obj => {
                            return Object.entries(obj!).reduce((newObject, [key, val]) => {
                                if (key.startsWith('str')) {
                                    if (typeof val === 'string' && val.length > 0) {
                                        newObject.str.push(val as never)
                                    }
                                } else {
                                    newObject[key] = val
                                }
                                return newObject
                            }, {str: []})
                        }))
                    } else {
                        resolve(err)
                    }
                })
            })
        }
        
    }
    
    function runCompilation(message: CompileRequest): CompileResponse {
        let program: Program
        let phase: CompilationPhase = 'parse'
        let err = false
        const errors: Error[] = []
        try {
            phase = 'parse'
            program = new Program({
                program: {
                    type: 'source',
                    source: message.source,
                    cardID: message.cardID
                },
                compilerOptions: {}
            })
        } catch (e) {
            err = true
            errors.push(e as Error)
        }
        if (program!) {
            try {
                phase = 'global-initializer'
                globalInitializer(program)
            } catch (e) {
                err = true
                errors.push(e as Error)
            }
            if (!err) {
                try {
                    phase = 'collect-assign-statements'
                    collectAssignStatements(program)
                } catch (e) {
                    err = true
                    errors.push(e as Error)
                }
            }
            if (!err) {
                try {
                    phase = 'bind'
                    visitTableBuilder2(program)
                } catch (e) {
                    err = true
                    errors.push(e as Error)
                }
            }
        }
        return {
            request: message,
            errors: errors.map(x => x.message),
            phase: phase
        }
    }
}
