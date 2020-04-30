import Config from './config';
/**
 * Resource Factory
 *
 * Create an instance with an IConfig object
 * Then call start() to produce the documentation
 */
export default class ConversionFactory {
    private resolvedFilename;
    private data;
    private output;
    constructor(config: Config);
    /** Starts the factory generating output based on the template configuration
     *
     */
    start(): Promise<void>;
}
