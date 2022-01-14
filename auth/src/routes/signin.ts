import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/User";
import { Password } from "../utils/password";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid user credentials");
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid user credentials");
    }

    // Generate JWT which is a base64 string
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).json(existingUser);
  }
);

export { router as signinRouter };
