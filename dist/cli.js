#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/*
* SPDX-License-Identifier: Apache-2.0
*/
const debug_1 = require("debug");
const yargs = require("yargs");
const resourcefactory_1 = require("./resourcefactory");
const LOG = debug_1.default('resourcefactory:cli');
const results = yargs
    .command(['create', '$0'], 'Create resources', {
    localfile: {
        alias: 'f',
        default: 'metadata.json',
        demandOption: true,
        describe: 'Name of the metadata file to load',
        requiresArg: true,
    },
    outputdir: {
        alias: 'o',
        default: 'out',
        demandOption: true,
        describe: 'Directory files to be written to (will be created if does not exist)',
        requiresArg: true,
    },
    template: {
        alias: 'n',
        default: 'singlepagesummary',
        demandOption: true,
        describe: 'The name of the template(s) to process. Space separated list',
        array: true
    },
})
    .help()
    .wrap(null)
    .alias('v', 'version')
    .version('0.0.1')
    .describe('v', 'show version information')
    .strict()
    .argv;
// setup the config here..
let config;
let factory = [];
results.template.forEach((templateName) => {
    config = {
        input: results.localfile,
        output: results.outputdir,
        task: templateName,
    };
    factory.push(new resourcefactory_1.default(config).start());
});
LOG(`Using configuration ${JSON.stringify(config)}`);
Promise.all(factory).then(() => {
    console.log('Done');
}).catch((err) => {
    LOG(err);
    process.exit(-1);
});
//# sourceMappingURL=cli.js.map