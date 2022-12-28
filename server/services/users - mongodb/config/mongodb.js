
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.mongoDB_URI
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverApi: ServerApiVersion.v1 
});


let db

async function mongoConnect() {
  try {
    const database = client.db('P3C2');
    db = database
    return database
  } catch(err) {
    console.log(err)
  }
}

function getDB() {
  return db
}



module.exports = { mongoConnect, getDB }