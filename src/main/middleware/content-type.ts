import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const contentType = (_req: Request, res: Response, next: NextFunction) => {
  res.type('json');
  next();
};
