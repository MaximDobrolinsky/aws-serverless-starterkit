import { ErrorTypeEnum, ResponseStatusCodes } from '../enums/app';

export class NotFoundException extends Error {
  public statusCode: number = ResponseStatusCodes.NOT_FOUND;

  constructor(message: string) {
    super();

    this.name = ErrorTypeEnum.NOT_FOUND_EXCEPTION;
    this.message = message;
  }
}
