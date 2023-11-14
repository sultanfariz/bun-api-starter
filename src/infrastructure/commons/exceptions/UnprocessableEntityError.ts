import { CustomError } from '.';

class UnprocessableEntityError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(422, message || 'Unprocessable Entity');
    this.name = 'UnprocessableEntityError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }
}

export default UnprocessableEntityError;
