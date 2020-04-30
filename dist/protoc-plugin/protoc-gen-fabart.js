#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.error(`==> Processing the protobug`);
const index_1 = require("./index");
const types = {};
const requests = {};
const responses = {};
function _lastElement(str) {
    if (str) {
        return str.substring(str.lastIndexOf('.') + 1);
    }
    else {
        return '';
    }
}
// map a field to the schema definition
// integers here are the protobuf typecodes liste at
//  https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/type.proto
function mapToSchema(field, fqn) {
    console.error(field);
    let typeinfo = field.options && field.options.typeinfo;
    const schema = {};
    const typename = field.name.substring(field.name.lastIndexOf('.') + 1);
    switch (field.type) {
        case 5:
            schema.type = 'integer';
            schema.format = 'int32';
            break;
        case 8:
            schema.type = 'boolean';
            break;
        case 9:
            schema.type = 'string';
            if (typeinfo) {
                if (field.options.typeinfo.format != 0) {
                    switch (field.options.typeinfo.format) {
                        case 1: schema.format = "data-time";
                        case 2: schema.format = "byte";
                    }
                }
                else if (field.options.typeinfo.pattern) {
                    schema.pattern = field.options.typeinfo.pattern;
                }
            }
            break;
        case 13:
            schema.type = 'integer';
            break;
        default:
            schema.$ref = `#/components/schemas/${fqn}`;
            break;
    }
    return { name: typename, schema };
}
// process the types
function processTypes(messageTypeList, prefix = '') {
    messageTypeList.forEach((messagetype) => {
        const typeName = messagetype.name;
        if (typeName.toLowerCase().includes('request')) {
            requests[`${prefix}${typeName}`] = messagetype;
        }
        else if (typeName.toLowerCase().includes('response')) {
            responses[`${prefix}${typeName}`] = messagetype;
        }
        else {
            types[`${prefix}${typeName}`] = messagetype;
        }
        // handle the nested types, typically the key
        if (messagetype.nestedTypeList) {
            processTypes(messagetype.nestedTypeList, `${typeName}.`);
        }
    });
}
function callback(proto) {
    try {
        const metadata = {
            $schema: 'https://hyperledger.github.io/fabric-chaincode-node/release-2.0/api/contract-schema.json',
            components: {},
            contracts: {},
            info: {
                title: proto.pb_package,
                version: '',
            },
        };
        // load the messageTypes
        processTypes(proto.messageTypeList);
        // main contracts
        proto.serviceList.forEach((service) => {
            metadata.contracts[service.name] = {
                name: service.name,
                transactions: [],
            };
            service.methodList.forEach((method) => {
                const txFn = {};
                txFn.name = method.name;
                txFn.tag = [];
                txFn.parameters = [];
                if (method.outputType) {
                    const returnType = (types[method.outputType.substring(method.outputType.lastIndexOf('.') + 1)].fieldList[0]);
                    txFn.returns = mapToSchema(returnType, method.outputType.substring(method.outputType.lastIndexOf('.') + 1));
                }
                const typeName = method.inputType.substring(method.inputType.lastIndexOf('.') + 1);
                txFn.parameters = requests[typeName].fieldList.map((f) => {
                    // console.error(f);
                    //  let p = { name: f.name, schema: mapToSchema(f) };
                    return mapToSchema(f, _lastElement(f.typeName));
                });
                metadata.contracts[service.name].transactions.push(txFn);
            });
        });
        // don't want to include the request
        Object.keys(types).filter((t) => !t.toLowerCase().includes('request')).forEach((t) => {
            const type = types[t];
            console.error(type);
            metadata.components[type.name] = {
                title: type.name,
                '$id': type.name,
                description: '',
                type: 'object',
                properties: {},
            };
            type.fieldList.forEach((f) => {
                const pgkName = _lastElement(f.typeName);
                metadata.components[type.name].properties[f.name] = mapToSchema(f, _lastElement(f.typeName));
            });
        });
        console.error(`Working on ${proto.pb_package}.`);
        let data = {
            name: `${proto.pb_package}-md.json`,
            content: JSON.stringify(metadata, null, 2),
        };
        console.error(`Finished working on  ${proto.pb_package}`);
        return data;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
new index_1.default().run(callback)
    .then(() => {
    // I use error, because stdout is used for plugin
    console.error('Complete.');
}).catch(e => console.error(e));
//# sourceMappingURL=protoc-gen-fabart.js.map