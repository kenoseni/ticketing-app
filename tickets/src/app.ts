import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@sage-mode/common";

const app = express();
app.set("trust-proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
