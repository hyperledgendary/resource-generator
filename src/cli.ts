#!/usr/bin/env node
'use strict';

/*
* SPDX-License-Identifier: Apache-2.0
*/
import debug from 'debug';
import * as yargs from 'yargs';
import Config from './config';
import ConversionFactory from './conversionfactory';
import Factory from './factory';
import ResourceFactory from './resourcefactory';

const LOG = debug('resourcefactory:cli');

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
let config: Config;
let factory: Promise<void>[] = [];

results.template.forEach((templateName) => {
    config = {
        input: results.localfile,
        output: results.outputdir,
        task: templateName,
    };
    factory.push(new ResourceFactory(config).start());
})



LOG(`Using configuration ${JSON.stringify(config)}`);

Promise.all(factory).then(() => {
    console.log('Done');
}).catch((err) => {
    LOG(err);
    process.exit(-1);
});
