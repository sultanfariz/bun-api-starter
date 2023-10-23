class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Resources Not Found!');
    this.name = 'NotFoundError';

    // Restore prototype chain
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
