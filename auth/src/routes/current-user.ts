import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  // if (!req.session || !req.session.jwt) {
  //   return res.json({ currentUser: null });
  // }

  if (!req.session?.jwt) {
    return res.status(401).json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.status(200).json({ currentUser: payload });
  } catch (error) {
    return res.status(401).json({ currentUser: null });
  }
});

export { router as currentUserRouter };
