'use strict';
/*
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
import Factory from './factory';

const LOG = debug('resourcefactory:factory');

/**
 * Resource Factory
 *
 * Create an instance with an IConfig object
 * Then call start() to produce the documentation
 */
export default class ResourceFactory implements Factory {

    private resolvedFilename: string;
    private jsonData: string;
    private templateRoot: string;
    private templateCfg: object;
    private output: string;
    private env: nunjucks;

    public constructor(config: Config) {

        this.resolvedFilename = path.resolve(config.input);
        LOG(`Using metadata file ${this.resolvedFilename}`);

        this.jsonData = JSON.parse(fs.readFileSync(this.resolvedFilename, 'utf8') as string);
        this.templateRoot = path.join(__dirname, 'templates', config.task);
        LOG(`Using the template root at ${this.templateRoot}`);
        if (!fs.existsSync(this.templateRoot)){
            throw new Error(`Unknown template::${this.templateRoot}`);
        }

        this.output = path.resolve(config.output,config.task);
        LOG(`Using the output directory of ${this.output}`);
        mkdirp.sync(this.output);

        this.templateCfg = yaml.safeLoad(
            fs.readFileSync(path.join(this.templateRoot, 'cfg.yaml'), 'utf8'));

        // make the output directory
        this.env = nunjucks.configure(this.templateRoot);

        // trim out typenames and replace with void if needed
        this.env.addFilter('typename', (str = '') => {
            const typename = str.trim();
            if (typename === '') {
                return 'void';
            } else {
                return typename;
            }
        });

        // trim out typenames and replace with void if needed
        this.env.addFilter('objectname', (str = '') => {
            const typename = str.trim();
            // console.log(`=${typename.trim()}=`);
            if (typename.startsWith('#')) {

                return typename.substring(typename.lastIndexOf('/') + 1);
            } else {
                return typename;
            }
        });
    }

    /** Starts the factory generating output based on the template configuration
     *
     */
    public async start(): Promise<void> {
        const filter = 'filter';
        const expression = jsonata(this.templateCfg[filter]);
        const result = expression.evaluate(this.jsonData);
        LOG(this.jsonData);
        // iterate over the results
        result.forEach((action) => {
            const outputFilename = path.join(this.output, action._filename);
            const templateFile = action._template;

            // writeout the data as well for debug purposes
            fs.writeFileSync(path.join(this.output, `data-${action._filename}.json`), JSON.stringify(action._data));

            // render the output, and format is needed
            let output = nunjucks.render(templateFile, action._data);

            if (action._prettier && action._prettier !== 'none') {
                LOG(action._prettier);
                output = prettier.format(output, action._prettier);
            }
            LOG(`Writing output file ${outputFilename}`);
            fs.writeFileSync(`${outputFilename}${action._extension}`, output);
        });

    }
}
