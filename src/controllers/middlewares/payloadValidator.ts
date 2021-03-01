import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi, { ValidationError } from 'joi';

export const assertPayloadAgainstSchema = (payload: any, schema: Joi.ObjectSchema<any>): void => {
  try {
    Joi.assert(payload, schema);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      const errorString = error.details.map(err => `${err.message}`).join(', ');
      throw new createHttpError.BadRequest(errorString);
    }
    throw new createHttpError.InternalServerError();
  }
};

export const validateParams = (paramSchema: Joi.ObjectSchema<any>, payload: any = null) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = payload ? payload : req.body;
    assertPayloadAgainstSchema(requestPayload, paramSchema);
    next();
  };
};

module.exports = {
  validateParams,
  assertPayloadAgainstSchema,
};
