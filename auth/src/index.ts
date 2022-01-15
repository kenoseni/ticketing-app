import mongoose from "mongoose";
import { app } from "./app";

const connectAndStart = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-cluster-ip-srv:27017/auth");
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

connectAndStart();
