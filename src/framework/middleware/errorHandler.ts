import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import { StatusCodes, ReasonPhrases } from "http-status-codes";


const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.error("Error:", err.message);
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

export default errorHandler;
