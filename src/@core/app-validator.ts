import * as Joi from 'joi';
import {
  ResponseStatusCodes,
  RouteSchemasTypeEnum,
} from '../@shared/enums/app';
import { ILogger } from './app-logger';
import { AppEvent } from './app-middleware';
import { schemas } from './validate-schema-definitions';
import { ValidationError } from '../@shared/errors/validation';

export type RouteSchemasType = {
  type:
    | RouteSchemasTypeEnum.QUERY_STRING_PARAMETERS
    | RouteSchemasTypeEnum.BODY
    | RouteSchemasTypeEnum.PATH_PARAMETERS;
  requestSchema?: Joi.SchemaLike;
  responseSchema?: Joi.SchemaLike;
};

export class Validator {
  private schema: RouteSchemasType;

  constructor(private route: string, private logger: ILogger) {
    this.schema = schemas.get(route);
  }

  requestValidator(event: AppEvent) {
    if (this.schema?.requestSchema) {
      const compiled = Joi.compile(this.schema.requestSchema);
      const { error, value } = compiled.validate(event[this.schema.type], {
        abortEarly: false,
        allowUnknown: true,
      });

      if (error) {
        throw new ValidationError(
          error.message,
          ResponseStatusCodes.BAD_REQUEST
        );
      }
    }
  }
}
