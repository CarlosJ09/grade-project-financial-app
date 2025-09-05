import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // Prisma errors
  if (err.code === 'P2002') {
    error.message = 'Duplicate field value entered';
    error.statusCode = 400;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = 'Validation Error';
    error.statusCode = 400;
  }

  // Not found errors
  if (err.name === 'NotFoundError') {
    error.message = 'Resource not found';
    error.statusCode = 404;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
