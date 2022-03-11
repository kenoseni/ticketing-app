import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const createTicket = async () => {
  const title = "A first title";
  const cookie = await global.signup();
  return request(app).post("/api/tickets").set("Cookie", cookie).send({
    title,
    price: 30,
  });
};

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = "A new title";
  const cookie = await global.signup();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price: 30,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = "A new title";
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title,
      price: 30,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await createTicket();

  const cookie = await global.signup();
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "hrrhhrrrggcgcc",
      price: 100,
    })
    .expect(401);
});

it("returns a 400 if the user provide an invalid title or price", async () => {
  const cookie = await global.signup();
  const title = "A first title";
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price: 30,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 40 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title, price: -40 })
    .expect(400);
});

it("updates the ticket provide inputs are valid", async () => {
  const cookie = await global.signup();
  const title = "A first title";
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price: 30,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title, price: 40 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(40);
});
