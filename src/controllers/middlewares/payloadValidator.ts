import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi, { ValidationError } from 'joi';

export const validateParams = (paramSchema: Joi.ObjectSchema<any>, params: any = null) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = params ?? req.body;
    try {
      Joi.assert(requestPayload, paramSchema);
      next();
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const errorString = error.details.map(err => `${err.message}`).join(', ');
        throw new createHttpError.BadRequest(errorString);
      }
      throw new createHttpError.InternalServerError();
    }
  };
};

module.exports = {
  validateParams,
};
