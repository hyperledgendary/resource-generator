// package: hyperledger.fabric
// file: hyperledger/fabric/metadata.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_descriptor_pb from "google-protobuf/google/protobuf/descriptor_pb";

export class Typing extends jspb.Message {
  getFormat(): Typing.FormatsMap[keyof Typing.FormatsMap];
  setFormat(value: Typing.FormatsMap[keyof Typing.FormatsMap]): void;

  getPattern(): string;
  setPattern(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Typing.AsObject;
  static toObject(includeInstance: boolean, msg: Typing): Typing.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Typing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Typing;
  static deserializeBinaryFromReader(message: Typing, reader: jspb.BinaryReader): Typing;
}

export namespace Typing {
  export type AsObject = {
    format: Typing.FormatsMap[keyof Typing.FormatsMap],
    pattern: string,
  }

  export interface FormatsMap {
    DATE_TIME: 0;
    BYTE: 1;
  }

  export const Formats: FormatsMap;
}

  export const typeInfo: jspb.ExtensionFieldInfo<Typing>;

