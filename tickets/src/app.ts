import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sage-mode/common";
import { createTicketRouter } from "./routes/new";
import { getOneTicketRouter } from "./routes/getOneTicket";
import { getAllTicketsRouter } from "./routes/getAllTickets";
import { updateTicketRouter } from "./routes/updateTicket";

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

app.use(createTicketRouter);
app.use(getOneTicketRouter);
app.use(getAllTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
