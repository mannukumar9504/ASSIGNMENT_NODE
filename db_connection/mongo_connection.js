const { MongoClient } = require('mongodb');
const {MONGO_DB, MONGO_URI} = process.env;
const uri = MONGO_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run  = async () => {
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db(MONGO_DB).command({ ping: 1 });
      console.log("Connected successfully to mongo DB "+MONGO_DB);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
run().catch(console.dir);
module.exports = client;