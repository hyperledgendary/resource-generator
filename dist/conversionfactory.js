'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/*
*
* SPDX-License-Identifier: Apache-2.0
*/
const debug_1 = require("debug");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const prettier = require("prettier");
const composer_concerto_1 = require("composer-concerto");
const visitor_1 = require("./visitor");
const LOG = debug_1.default('resourcefactory:factory');
/**
 * Resource Factory
 *
 * Create an instance with an IConfig object
 * Then call start() to produce the documentation
 */
class ConversionFactory {
    constructor(config) {
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
    async start() {
        const modelManager = new composer_concerto_1.ModelManager();
        const ctoFiles = [this.resolvedFilename];
        const modelFiles = ctoFiles.map((ctoFile) => {
            return fs.readFileSync(ctoFile, 'utf8');
        });
        modelManager.addModelFiles(modelFiles, ctoFiles, true);
        await modelManager.updateExternalModels();
        const visitor = new visitor_1.default();
        const parameters = {};
        // parameters.fileWriter = new FileWriter(outputDirectory);
        const data = modelManager.accept(visitor, parameters);
        const jsonOutput = prettier.format(JSON.stringify(data), { parser: 'json' });
        fs.writeFileSync(path.join(this.output, 'metadata.json'), jsonOutput);
    }
}
exports.default = ConversionFactory;
//# sourceMappingURL=conversionfactory.js.map