class DuplicatedDataError extends Error {
  constructor(message?: string) {
    super(message || 'The data is already in the database!');
    this.name = 'DuplicatedDataError';

    // Restore prototype chain
    Object.setPrototypeOf(this, DuplicatedDataError.prototype);
  }
}

export default DuplicatedDataError;
