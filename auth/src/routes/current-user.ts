import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.json("Hi there");
});

export { router as currentUserRouter };
