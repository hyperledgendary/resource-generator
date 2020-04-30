/**
 * Then call start() to produce the documentation
 */
export default interface Factory {
    /** Starts the factory generating output based on the template configuration
     *
     */
    start(): Promise<void>;
}
