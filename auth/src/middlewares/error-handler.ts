import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // const formattedErrors = err.errors.map((error) => {
    //   return { message: error.msg, field: error.param };
    // });
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  // if (err instanceof DatabaseConnectionError) {
  //   res.status(err.statusCode).json({ errors: err.serializeErrors() });
  // }

  res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
