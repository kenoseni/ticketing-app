import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app).get("/api/tickets/tetetevgeteg").send();
  expect(response.status).toEqual(404);
});

it("returns the ticket if found", async () => {
  const title = "A new title";
  const cookie = await global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price: 30,
    });
  expect(response.status).toEqual(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(30);
});
