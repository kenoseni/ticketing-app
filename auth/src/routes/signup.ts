import express from "express";

const router = express.Router();

router.post("/api/users/signup", (req, res) => {
  res.json("Hi there");
});

export { router as signupRouter };
