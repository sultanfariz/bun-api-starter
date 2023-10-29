class CustomError extends Error {
  constructor(
    message: string,
    public content?: any
  ) {
    super(message);
    this.content = content;
  }
}

export default CustomError;
