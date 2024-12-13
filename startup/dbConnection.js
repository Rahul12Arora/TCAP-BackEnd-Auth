const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rahul012arora:tAL43E364xYa9Wbw@tcap.cgyuo.mongodb.net/?retryWrites=true&w=majority&appName=TCAP";
const client = new MongoClient(uri);
let isConnected = false;

async function getDb() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("Database connected");
  }
  return client.db('sample_mflix');
}

module.exports = getDb;