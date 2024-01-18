const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';
const MONGO_DB = 'angular_proejct';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run  = async () => {
    try {
      // Connect the client to the server
      const conn = await client.connect();
      // Establish and verify connection
     const db =  await client.db(MONGO_DB);
      console.log("Connected successfully to mongo DB "+MONGO_DB);
      const result = await db.createCollection("homes");;
      if(result) {
        console.log("Collection is created!");
        // close the connection to db when you are done with it
      }

    } catch(err){
        throw new Error(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);