import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  const options = {};

  if (!MONGODB_URL) {
    throw new Error('Invalid/Missing Envirement Variable: "MongoDB_URL"');
  }

  const client = new MongoClient(MONGODB_URL, options);
  return client.connect();
};

export default clientPromise;
