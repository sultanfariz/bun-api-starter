class ForbiddenAccessError extends Error {
  constructor(message?: string) {
    super(message || 'You are not allowed to access this resource!');
    this.name = 'ForbiddenAccessError';

    // Restore prototype chain
    Object.setPrototypeOf(this, ForbiddenAccessError.prototype);
  }
}

export default ForbiddenAccessError;
