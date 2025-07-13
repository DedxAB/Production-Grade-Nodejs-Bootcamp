import { Request, Response, NextFunction } from 'express';

type AsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function catchAsync(fn: AsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Automatically catch error and forward to global handler
  };
}
