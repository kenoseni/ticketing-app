import mongoose from "mongoose";
import { randomBytes } from "crypto";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const connectAndStart = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_SERVER_URI) {
    throw new Error("NATS_SERVER_URI must be defined");
  }
  try {
    await natsWrapper.connect(
      "ticketing",
      randomBytes(4).toString("hex"),
      process.env.NATS_SERVER_URI
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to tickets Mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

connectAndStart();
