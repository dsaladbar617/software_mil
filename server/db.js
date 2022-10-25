import mongoose from "mongoose";

// Create the connection string for the mongodb database.
let uri = "mongodb://localhost:27017/Thoth";
// Connect to the database using the connection string above.
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
// Export the connection
const connection = mongoose.connection;
export default connection;
