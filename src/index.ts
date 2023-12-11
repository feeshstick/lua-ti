import {Argument, Command} from "commander"
import {runSimpleTest, runTest} from "./test-runner.js";
import {WServer} from "./server/serve.js";
import {buildAssets} from "./server/build-assets.js";
import {buildDocumentationFromWiki} from "./server/build-documentation-assets.js";
import {buildConstants} from "./server/build-constants.js";
import {buildFunctions} from "./server/build-functions.js";
// @ts-ignore
import {DEFAULT_OPTIONS} from "@that-hatter/scrapiyard";

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
    program.command('parser')
        .action(async () => {
            console.log(DEFAULT_OPTIONS)
            // build2()
        })
    program.command('build-constants')
        .action(() => {
            buildConstants()
        })
    program.command('build-functions')
        .action(() => {
            buildFunctions()
        })
    program.command('build-documentation')
        .action(() => {
            buildDocumentationFromWiki()
        })
    program.parse()
}

cli()
