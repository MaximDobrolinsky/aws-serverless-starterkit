import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { serializeError } from 'serialize-error';
import { ILogger, logger } from './app-logger';
import { Validator } from './app-validator';
import {
  ResponseStatus,
  ResponseStatusCodes,
  ErrorTypeEnum,
} from '../@shared/enums/app';

export type AppEvent = APIGatewayEvent;
export type AppContext = Context & {};
export type AppResponse = APIGatewayProxyResult;
export type AppBodyResponse<T> = {
  status: ResponseStatus;
  data: T;
};

export type ControllerActionType = (
  event: AppEvent,
  context: AppContext
) => Promise<any>;

class AppMiddleware {
  constructor(protected logger: ILogger) {}

  public wrapControllerAction(route: string, controller: ControllerActionType) {
    return async (event: AppEvent | any, context: Context) => {
      const logger = this.logger.child({ awsId: context.awsRequestId });
      logger.info(event);

      if (typeof event.body === 'string') {
        event.body = JSON.parse(event.body);
      }

      const validator = new Validator(route, logger);

      const appContext = { ...context } as AppContext;

      try {
        validator.requestValidator(event);

        const result = await controller(event, appContext);

        return this.response(result?.statusCode, result);
      } catch (error) {
        const serializedError = {
          name: error?.name || ErrorTypeEnum.SERVER,
          route,
          error: serializeError(error),
        };

        this.logger.error(serializedError);

        return this.response(
          error?.statusCode || ResponseStatusCodes.SERVER_ERROR,
          serializedError
        );
      }
    };
  }

  private response(
    statusCode: number = ResponseStatusCodes.OK,
    payload?: any
  ): AppResponse {
    let response;

    switch (statusCode) {
      case ResponseStatusCodes.REDIRECT:
        response = {
          statusCode: ResponseStatusCodes.REDIRECT,
          headers: {
            Location: payload.url,
          },
        };
        break;
      case ResponseStatusCodes.OK:
        response = {
          statusCode,
          body: JSON.stringify({
            status: ResponseStatus.SUCCESS,
            data: payload ? payload : {},
          }),
        };
        break;
      case ResponseStatusCodes.CREATED:
        response = {
          statusCode,
          body: JSON.stringify({
            status: ResponseStatus.SUCCESS,
            data: payload?.data ? payload?.data : {},
          }),
        };
        break;
      default:
        response = {
          statusCode,
          body: JSON.stringify({
            status: ResponseStatus.ERROR,
            data: payload ? payload : {},
          }),
        };
        break;
    }

    return response;
  }
}

export default new AppMiddleware(logger);
