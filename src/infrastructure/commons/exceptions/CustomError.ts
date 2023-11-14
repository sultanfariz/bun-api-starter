class CustomError extends Error {
  constructor(
    public code: number,
    message: string,
    public content?: any
  ) {
    super(message);
    this.content = content;
  }
}

export default CustomError;
