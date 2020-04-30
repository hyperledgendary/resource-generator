import Config from './config';
import Factory from './factory';
/**
 * Resource Factory
 *
 * Create an instance with an IConfig object
 * Then call start() to produce the documentation
 */
export default class ResourceFactory implements Factory {
    private resolvedFilename;
    private jsonData;
    private templateRoot;
    private templateCfg;
    private output;
    private env;
    constructor(config: Config);
    /** Starts the factory generating output based on the template configuration
     *
     */
    start(): Promise<void>;
}
