import { CustomError } from '.';

class UnauthorizedError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(message || 'You need to login to access this resource!');
    this.name = 'UnauthorizedError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
