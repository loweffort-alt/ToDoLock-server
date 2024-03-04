//import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config.js";
import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//const client = new MongoClient(uri, {
//serverApi: {
//version: ServerApiVersion.v1,
//strict: true,
//deprecationErrors: true,
//},
//});

export const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    console.log(">>> DB is connected");
    //await client.db("admin").command({ ping: 1 });
    //console.log(
    //"Pinged your deployment. You successfully connected to MongoDB!",
    //);
    //} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  } catch (error) {
    console.log(error);
  }
};
