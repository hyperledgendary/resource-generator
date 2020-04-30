// package: fabric
// file: fabric/metadata.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_descriptor_pb from "google-protobuf/google/protobuf/descriptor_pb";

export class Serialization extends jspb.Message {
  hasDefaultstyle(): boolean;
  clearDefaultstyle(): void;
  getDefaultstyle(): Serialization.DefaultMethodsMap[keyof Serialization.DefaultMethodsMap];
  setDefaultstyle(value: Serialization.DefaultMethodsMap[keyof Serialization.DefaultMethodsMap]): void;

  hasCustomid(): boolean;
  clearCustomid(): void;
  getCustomid(): string;
  setCustomid(value: string): void;

  getMethodCase(): Serialization.MethodCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Serialization.AsObject;
  static toObject(includeInstance: boolean, msg: Serialization): Serialization.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Serialization, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Serialization;
  static deserializeBinaryFromReader(message: Serialization, reader: jspb.BinaryReader): Serialization;
}

export namespace Serialization {
  export type AsObject = {
    defaultstyle: Serialization.DefaultMethodsMap[keyof Serialization.DefaultMethodsMap],
    customid: string,
  }

  export interface DefaultMethodsMap {
    UNKNOWN: 0;
    JSON: 1;
    PROTOBUF: 2;
  }

  export const DefaultMethods: DefaultMethodsMap;

  export enum MethodCase {
    METHOD_NOT_SET = 0,
    DEFAULTSTYLE = 1,
    CUSTOMID = 2,
  }
}

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
    UNKNOWN: 0;
    DATE_TIME: 1;
    BYTE: 2;
  }

  export const Formats: FormatsMap;
}

  export const networkSerialization: jspb.ExtensionFieldInfo<Serialization>;

  export const ledgerSerialization: jspb.ExtensionFieldInfo<Serialization>;

  export const typeInfo: jspb.ExtensionFieldInfo<Typing>;

  export const transient: jspb.ExtensionFieldInfo<boolean>;

