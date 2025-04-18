export class AppError extends Error {
  protected readonly statusCode: number;
  protected readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = false) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    this.isOperational = isOperational;
    this.statusCode = statusCode;
    Error.captureStackTrace(this)
  }
}
