import { CustomError } from '.';

class ForbiddenAccessError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(403, message || 'You are not allowed to access this resource!');
    this.name = 'ForbiddenAccessError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, ForbiddenAccessError.prototype);
  }
}

export default ForbiddenAccessError;
