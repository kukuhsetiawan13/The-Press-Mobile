if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { generatePasswordHash } = require('../helpers/bcryptjs')

const data = require('../data/db.json')
data.forEach(el => {
  el.password = generatePasswordHash(el.password)
  el.role = 'Admin'
})

const { MongoClient } = require("mongodb");

const uri = process.env.mongoDB_URI
const client = new MongoClient(uri);


async function run() {
  try {
    const database = client.db('P3C2');
    const users = database.collection('users');
    
    const result = await users.insertMany(data);
    console.log(result);
  } finally {

    await client.close();
  }
}
run().catch(console.dir);