// Dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Path to our file
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

// Load Definition into gRPC
const userProto = grpc.loadPackageDefinition(pkgDefs);

// Create gRPC server 
const server = new grpc.Server();

// Implement UserService
server.addService(userProto.UserService.service, {
    // Implement GetUser
    GetUser: (input, callback) => {
        try {
            callback(null, { name: "Jordan", age:23 });
        } catch (error) {
            callback(error, null);
        }
    },
});

// Start the server 
server.bindAsync(
    // Port to server on
    "127.0.0.1:5000",
    // Authentication settings
    grpc.ServerCredentials.createInsecure(),
    // Server start callback
    (error, port) => {
        console.log(`listening on port ${port}`);
        server.start();
    }
);