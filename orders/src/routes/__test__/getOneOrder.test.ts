import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";

it("fetches the ticket", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "title",
    price: 90,
  });
  await ticket.save();

  const cookie = await global.signup();

  // make request to build orger with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // make a request to fetch the order
  const response = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", cookie);
  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another's order", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "title",
    price: 90,
  });
  await ticket.save();

  const cookie = await global.signup();
  const cookie2 = await global.signup();

  // make request to build orger with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // make a request to fetch the order
  const response = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", cookie2);
  expect(response.status).toEqual(401);
});
