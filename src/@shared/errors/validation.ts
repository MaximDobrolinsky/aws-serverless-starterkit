import { ErrorTypeEnum } from '../enums/app';

export class ValidationError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();

    this.name = ErrorTypeEnum.VALIDATION;
    this.message = message;
    this.statusCode = statusCode;
  }
}
