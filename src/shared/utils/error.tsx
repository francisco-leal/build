export class BadRequestError extends Error {
  constructor(message: string = "bad request") {
    super(message);
    this.name = BadRequestError.name;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "unauthorized") {
    super(message);
    this.name = UnauthorizedError.name;
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "not found") {
    super(message);
    this.name = NotFoundError.name;
  }
}