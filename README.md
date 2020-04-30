# Fabric Resource Generator


1) Write your definition of the object model and the services that are required from the Smart Contract. This is using the protobuf syntax, using the additional options/attributes that provide fine grained control
2) Decide on what language you want to use for the contract implementation. Choices are  Java, Go, JavaScript, TypeScript, Rust
3) Decide on what langauges you want to use for the client implementations
4) Generate the resources for the contract and client implementations. Starting point is the proto definitions (a)
5) Fill out the code, and deploy
6) .... repeat

(a) You can also start with the Contract Metadata JSON description. This is harder to read, but is more easily parsed and modified by tooling and the implementation libraries. It is akin to the 'intermediate representation' in a standard development tool chain. 

## Resource generator

The resource generator is a CLI that can be run either standalone or as a protoc plugin. 

0) Ensure that you have protoc installed
1) `npm install -g fabric-resource-generator` (if you've clone this repo instead use `npm run build && npm link`)
2) Create a new directory to hold the protobufs. You need to have some of the google protobuf files to hand, and also the Fabric contract extensions.
As an example copy the `examples` directory in this repo (TODO script this....)
3) Let's work with the `my-contract.proto`

```
protoc \
  --plugin=protoc-fabric-gen \
  -I ./proto \
  ./proto/my-contract.proto  \
  --metadata_out=json=y,js=y,ts=y:./generated 
```
This will generate the json metadata, js resources, and ts resources