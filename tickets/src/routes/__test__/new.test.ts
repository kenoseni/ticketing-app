import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    });
  expect(response.status).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      price: 10,
    });
  expect(response2.status).toEqual(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "A title",
      price: -10,
    });
  expect(response.status).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "A title",
    });
  expect(response2.status).toEqual(400);
});

it("it creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  const title = "A test title";
  expect(tickets.length).toEqual(0);
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price: 20,
    });
  expect(response.status).toEqual(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual(title);
});
