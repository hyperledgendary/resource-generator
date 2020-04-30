/// <reference types="node" />
import { CodeGeneratorRequest } from './google/protobuf/compiler/plugin_pb';
export default class Plugin {
    /**
     * Promise for incoming request, as CodeGeneratorRequest from google-protobuf
     * @param  {stream} stdin Incoming stream, default: process.stdin
     * @return {Promise}      Resolves to CodeGeneratorRequest from google-protobuf
     */
    CodeGeneratorRequest(stdin?: NodeJS.ReadStream): Promise<CodeGeneratorRequest>;
    /**
     * Promise for outgoing response, as CodeGeneratorResponse from google-protobuf
     * @param  {stream} stdout Outgoing stream, default: process.stdout
     */
    CodeGeneratorResponse(files: any, stdout?: NodeJS.WriteStream): void;
    /**
     * Convenience function for error-handlers
     * @param  {stream} stdout Outgoing stream, default: process.stdout
     * @return {function}     Error-handler that puts error into error-field of CodeGeneratorResponse and sends to stdout
     */
    CodeGeneratorResponseError(err: any, stdout?: NodeJS.WriteStream): void;
    run(cb: any): Promise<void>;
}
