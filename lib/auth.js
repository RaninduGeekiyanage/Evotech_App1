import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { client } from "@/db"; // your mongodb client
import { MongoClient } from "mongodb";

//add  mongodb client
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("sample_mflix");

export const auth = betterAuth({
  //flug the database instance
  database: mongodbAdapter(db), // (this is like link the database true auth. means database can handle by AUTH)
  emailAndPassword: {
    enabled: true,
  },
});
