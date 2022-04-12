import { ErrorTypeEnum, ResponseStatusCodes } from '../enums/app';

export class BadRequestException extends Error {
  public statusCode: number = ResponseStatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super();

    this.name = ErrorTypeEnum.BAD_REQUEST_EXCEPTION;
    this.message = message;
  }
}
