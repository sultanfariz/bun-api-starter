import { CustomError } from '.';

class NotFoundError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(404, message || 'Resources Not Found!');
    this.name = 'NotFoundError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
