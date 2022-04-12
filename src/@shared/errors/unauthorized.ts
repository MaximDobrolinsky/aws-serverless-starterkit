import { ErrorTypeEnum, ResponseStatusCodes } from '../enums/app';

export class UnauthorizedError extends Error {
  public statusCode: number = ResponseStatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super();

    this.name = ErrorTypeEnum.UNAUTHORIZED;
    this.message = message;
  }
}
