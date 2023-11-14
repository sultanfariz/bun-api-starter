import { CustomError } from '.';

class DuplicatedDataError extends CustomError {
  constructor(
    message?: string,
    public content?: any
  ) {
    super(409, message || 'The data is already in the database!');
    this.name = 'DuplicatedDataError';
    this.content = content;

    // Restore prototype chain
    Object.setPrototypeOf(this, DuplicatedDataError.prototype);
  }
}

export default DuplicatedDataError;
