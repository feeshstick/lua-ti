import {Argument, Command} from "commander"
import {runSimpleTest, runTest} from "./test-runner.js";
import {WServer} from "./server/serve.js";
import {buildAssets} from "./server/build-assets.js";
import {buildDocumentationFromWiki} from "./server/build-documentation-assets.js";

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
            WServer.serve(port)
        })
    program.command('build-assets')
        .action(() => {
            buildAssets()
        })
    program.command('build-documentation')
        .action(() => {
            buildDocumentationFromWiki()
        })
    program.parse()
}

cli()
