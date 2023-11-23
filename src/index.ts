import {Argument, Command} from "commander"
import {runSimpleTest, runTest} from "./test-runner.js";
import {WServer} from "./server/serve.js";

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
    program.command('basic')
        .action(() => {
            runSimpleTest()
        })
    program.command('serve')
        .addArgument(new Argument('port', 'port'))
        .action(port => {
            // Server.buildAssets()
            WServer.serve(port)
        })
    program.parse()
}

cli()
