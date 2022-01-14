// used to fake request to the express app
import request from "supertest";

import { app } from "../../app";

it("returns the details of the current user", async () => {
  const cookie = await global.signup();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with a null value if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
