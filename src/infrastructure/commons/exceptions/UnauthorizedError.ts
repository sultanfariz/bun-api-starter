class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message || 'You need to login to access this resource!');
    this.name = 'UnauthorizedError';

    // Restore prototype chain
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
