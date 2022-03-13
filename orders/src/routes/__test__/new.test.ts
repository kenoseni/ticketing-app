import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("returns an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      ticketId,
    });
  expect(response.status).toEqual(404);
});

it("returns an error if ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "opera",
    price: 40,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "678906543212",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      ticketId: ticket.id,
    });
  expect(response.status).toEqual(400);
});

it("returns reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "opera",
    price: 40,
  });
  await ticket.save();

  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      ticketId: ticket.id,
    });
  expect(response.status).toEqual(201);
});

it.todo("emits an order created events");
