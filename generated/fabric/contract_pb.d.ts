// package: fabric
// file: fabric/contract.proto

import * as jspb from "google-protobuf";

export class ContractResult extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractResult.AsObject;
  static toObject(includeInstance: boolean, msg: ContractResult): ContractResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractResult;
  static deserializeBinaryFromReader(message: ContractResult, reader: jspb.BinaryReader): ContractResult;
}

export namespace ContractResult {
  export type AsObject = {
    code: number,
    msg: string,
  }
}

