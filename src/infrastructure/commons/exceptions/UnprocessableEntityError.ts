class UnprocessableEntityError extends Error {
  constructor(message?: string) {
    super(message || 'Unprocessable Entity');
    this.name = 'UnprocessableEntityError';

    // Restore prototype chain
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }
}

export default UnprocessableEntityError;
