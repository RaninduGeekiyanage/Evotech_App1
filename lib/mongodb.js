import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const options = {};

  if (!MONGODB_URI) {
    throw new Error('Invalid/Missing Envirement Variable: "MongoDB_URL"');
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
};

export default clientPromise;
