'use strict';
/*
*
* SPDX-License-Identifier: Apache-2.0
*/
import debug from 'debug';
import fs = require('fs');
import yaml = require('js-yaml');
import jsonata = require('jsonata');
import * as mkdirp from 'mkdirp';
import nunjucks = require('nunjucks');
import path = require('path');
import prettier = require('prettier');
import Config from './config';

import { FileWriter, ModelManager } from 'composer-concerto';
import MetadataVisitor from './visitor';

const LOG = debug('resourcefactory:factory');

/**
 * Resource Factory
 *
 * Create an instance with an IConfig object
 * Then call start() to produce the documentation
 */
export default class ConversionFactory {

    private resolvedFilename: string;
    private data: string;
    private output: string;

    public constructor(config: Config) {

        this.resolvedFilename = path.resolve(config.input);
        LOG(`Using input file ${this.resolvedFilename}`);

        this.data = fs.readFileSync(this.resolvedFilename, 'utf8');
        this.output = path.resolve(config.output);
        LOG(`Using the output directory of ${this.output}`);
        mkdirp.sync(this.output);

    }

    /** Starts the factory generating output based on the template configuration
     *
     */
    public async start(): Promise<void> {
        const modelManager = new ModelManager();
        const ctoFiles = [this.resolvedFilename];
        const modelFiles = ctoFiles.map((ctoFile) => {
            return fs.readFileSync(ctoFile, 'utf8');
        });
        modelManager.addModelFiles(modelFiles, ctoFiles, true);
        await modelManager.updateExternalModels();

        const visitor = new MetadataVisitor();

        const parameters = {};
        // parameters.fileWriter = new FileWriter(outputDirectory);
        const data = modelManager.accept(visitor, parameters);
        const jsonOutput = prettier.format(JSON.stringify(data), { parser: 'json' });
        fs.writeFileSync(path.join(this.output, 'metadata.json'), jsonOutput);
    }
}
