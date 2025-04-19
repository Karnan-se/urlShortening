import { NextFunction, Request, Response } from 'express';
import { registerUserSchema } from '../utils/sanitizer';
import { HttpStatus } from '../utils/statusCodes';

const validation = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next(); 
    } catch (error: any) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        error: error.inner.reduce((acc: Record<string, string>, curr: any) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {}),
      });
    }
  };
};

export const UserDataSanitzer = validation(registerUserSchema)
