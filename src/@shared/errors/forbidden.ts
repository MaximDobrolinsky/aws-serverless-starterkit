import { ErrorTypeEnum, ResponseStatusCodes } from '../enums/app';

export class ForbiddenError extends Error {
  public statusCode: number = ResponseStatusCodes.FORBIDDEN;

  constructor(message: string) {
    super();

    this.name = ErrorTypeEnum.FORBIDDEN;
    this.message = message;
  }
}
