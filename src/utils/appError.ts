export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message); // set the error message // built-in Error message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Maintain proper stack trace for debugging, capture where this error was thrown from
    Error.captureStackTrace(this, this.constructor);
  }
}
