// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'forge';//process.env.MONGODB_DB;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
//if (!dbName) {
//    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
//}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // console.log('Using cached database instance');
    return { client: cachedClient, db: cachedDb };
  }

  // If no connection is cached, create a new one
  const client = new MongoClient(uri, {
    // useNewUrlParser: true, // Deprecated, no longer needed in recent driver versions
    // useUnifiedTopology: true, // Deprecated, no longer needed in recent driver versions
  });

  try {
    // console.log('Connecting to MongoDB...');
    await client.connect();
    const db = client.db(dbName);
    // console.log('Successfully connected to MongoDB.');

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      // Gracefully shutdown the client if connection fails initially
      await client.close();
      throw error; // Re-throw the error to be handled by the caller
  }
}

// Optional: Helper to get just the DB object easily
export async function getDb() {
    const { db } = await connectToDatabase();
    return db;
}
