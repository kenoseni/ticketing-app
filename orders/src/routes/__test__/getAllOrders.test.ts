import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async (title: string, price: number) => {
  const ticket = Ticket.build({
    title: title,
    price: price,
  });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  // create 3 tickets
  const ticketOne = await buildTicket("opera", 90);
  const ticketTwo = await buildTicket("cycling", 300);
  const ticketThree = await buildTicket("swimming", 500);

  const userOneCookie = await global.signup();
  const userTwoCookie = await global.signup();
  // create one order as user #1
  const userOneResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", userOneCookie)
    .send({
      ticketId: ticketOne.id,
    });
  expect(userOneResponse.status).toEqual(201);

  // create two orders as user #2
  const userTwoResponseA = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookie)
    .send({
      ticketId: ticketTwo.id,
    });
  expect(userTwoResponseA.status).toEqual(201);

  const userTwoResponseB = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookie)
    .send({
      ticketId: ticketThree.id,
    });
  expect(userTwoResponseB.status).toEqual(201);
  // make request to get orders for user number 2
  const userTwoResponse = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwoCookie);
  expect(userTwoResponse.status).toEqual(200);
  // make sure we only get the orders for user #2
  expect(userTwoResponse.body.length).toEqual(2);
  expect(userTwoResponse.body[0].id).toEqual(userTwoResponseA.body.id);
  expect(userTwoResponse.body[1].id).toEqual(userTwoResponseB.body.id);
  expect(userTwoResponse.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(userTwoResponse.body[1].ticket.id).toEqual(ticketThree.id);
});
