/*
* SPDX-License-Identifier: Apache-2.0
*/

import tou8 = require('buffer-to-uint8array');
import * as streamToPromise from 'stream-to-promise';
import { CodeGeneratorRequest, CodeGeneratorResponse } from './google/protobuf/compiler/plugin_pb';
// extensions must be required before parsing
require('./google/api/annotations_pb');
require('./fabric/contract_pb');
require('./fabric/metadata_pb');

export default class Plugin {

  /**
   * Promise for incoming request, as CodeGeneratorRequest from google-protobuf
   * @param  {stream} stdin Incoming stream, default: process.stdin
   * @return {Promise}      Resolves to CodeGeneratorRequest from google-protobuf
   */
  public async CodeGeneratorRequest(stdin = process.stdin) {
    const buffer = await streamToPromise(stdin);
    return CodeGeneratorRequest.deserializeBinary(tou8(buffer));
  }

  /**
   * Promise for outgoing response, as CodeGeneratorResponse from google-protobuf
   * @param  {stream} stdout Outgoing stream, default: process.stdout
   */
  public CodeGeneratorResponse(files, stdout = process.stdout) {

    let out: CodeGeneratorResponse = new CodeGeneratorResponse();

    files.forEach((f, i) => {
      const file = new CodeGeneratorResponse.File();
      if (f.name) {
        file.setName(f.name);
      }
      if (f.content) {
        file.setContent(f.content);
      }
      if (f.insertion_point) {
        file.setInsertionPoint(f.insertion_point);
      }
      
      out.addFile(file);

    });
    stdout.write(Buffer.from(out.serializeBinary()));
  }

  /**
   * Convenience function for error-handlers
   * @param  {stream} stdout Outgoing stream, default: process.stdout
   * @return {function}     Error-handler that puts error into error-field of CodeGeneratorResponse and sends to stdout
   */
  public CodeGeneratorResponseError(err, stdout = process.stdout) {
    const out = new CodeGeneratorResponse()
    out.setError(err.toString());
    stdout.write(Buffer.from(out.serializeBinary()))
  }

  public async run(cb) {

    try {
      let req = (await this.CodeGeneratorRequest()).toObject();
  
      console.error(`${JSON.stringify(req.parameter)}`);
      let protos = req.protoFileList.filter(p => req.fileToGenerateList.indexOf(p.name) !== -1);

      let files = protos.map(cb);
      console.error(`Going to create the response`);
      this.CodeGeneratorResponse(files);
    } catch (err) {
      this.CodeGeneratorResponseError(err);
    }
  }

}


