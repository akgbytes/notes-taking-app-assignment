import { ApiError } from "@/utils/ApiError";
import { Request, Response, NextFunction } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from "@prisma/client/runtime/library";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Error from middleware: ", error.message ? error.message : error);

  let apiError: ApiError;

  if (error instanceof PrismaClientKnownRequestError) {
    let message = "Database error";

    if (error.code === "P2002") {
      message = `Unique constraint failed on field(s): ${error.meta?.target}`;
    } else if (error.code === "P2025") {
      message = "Record not found";
    }

    apiError = new ApiError(400, message);
  } else if (error instanceof PrismaClientValidationError) {
    apiError = new ApiError(400, "Invalid database query");
  } else if (error instanceof PrismaClientInitializationError) {
    apiError = new ApiError(500, "Database connection failed");
  } else if (error instanceof ApiError) {
    apiError = error;
  } else {
    apiError = new ApiError(500, error.message || "Internal Server Error");
  }

  res.status(apiError.code).json({
    code: apiError.code,
    message: apiError.message,
    data: apiError.data,
    success: apiError.success,
  });
};
