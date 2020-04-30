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
        templateName: {
            alias: 'n',
            default: 'singlepagesummary',
            demandOption: true,
            describe: 'The name of the template to process, [singlepagesummary, client_ts]',
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
let factory: Factory;

if (results._.includes('convert')) {
    config = {
        input: results.input,
        output: results.outputdir,
        task: results.conversion,
    };
    factory = new ConversionFactory(config);
} else {
    config = {
        input: results.localfile,
        output: results.outputdir,
        task: results.templateName,
    };
    factory = new ResourceFactory(config);
}

LOG(`Using configuration ${JSON.stringify(config)}`);

factory.start().then(() => {
    console.log('Done');
}).catch((err) => {
    LOG(err);
    process.exit(-1);
});
