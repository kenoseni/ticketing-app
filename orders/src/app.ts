import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sage-mode/common";
import { createOrderRouter } from "./routes/new";
import { getOneOrderRouter } from "./routes/getOneOrder";
import { getAllOrdersRouter } from "./routes/getAllOrders";
import { deleteOrderRouter } from "./routes/deleteOrder";

const app = express();
app.set("trust-proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(createOrderRouter);
app.use(getOneOrderRouter);
app.use(getAllOrdersRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
