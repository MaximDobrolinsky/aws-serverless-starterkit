import * as Joi from 'joi';
import { LambdaHandlerEnum, RouteSchemasTypeEnum } from '../@shared/enums/app';

export const schemas = new Map();

schemas.set(LambdaHandlerEnum.HELLO, {
  type: RouteSchemasTypeEnum.BODY,
  requestSchema: {},
});
