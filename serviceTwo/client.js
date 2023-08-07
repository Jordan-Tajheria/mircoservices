// Dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Path to our proto file
const PROTO_FILE = "./service_def.proto";

// Options needed for loading Proto file
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
 const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

 // Load Definiton into gRPC
 const UserService = grpc.loadPackageDefinition(pkgDefs).UserService;

 // Create the client
 const client = new UserService(
    "localhost:5000",
    grpc.credentials.createInsecure()
 );

 // Make a call to GetUser
 client.GetUser({}, (error, user) => {
    if (error) {
        console.log(error);
    } else {
        console.log(user);
    }
 });