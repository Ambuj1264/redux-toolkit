// lib/mongodb.ts
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: Cached = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
     
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
