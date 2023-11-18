import {Argument, Command} from "commander"
import {WebSocketServer} from "ws";
import {runTest} from "./test-runner.js";

export function cli() {
    const program = new Command()
    program
        .name('lua-ti')
        .description('')
        .version('0.0.1');
    program.command('test')
        .action(() => {
            runTest()
        })
    program.command('serve')
        .addArgument(new Argument('port', 'port'))
        .action(port => {
            const server: WebSocketServer = new WebSocketServer({
                port: port
            })
            server.on('connection', socket => {
                socket.on('message', data => {
                    try {
                        const text = data.toString('utf-8')
                        const message = JSON.parse(text)
                        console.log(message)
                    } catch (e) {
                        socket.send(JSON.stringify({
                            kind: 0
                        }))
                    }
                })
            })
        })
    program.parse()
}

cli()
