import mongoose from "mongoose";
import "dotenv/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
