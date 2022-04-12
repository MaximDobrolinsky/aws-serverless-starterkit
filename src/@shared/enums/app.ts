export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ResponseStatusCodes {
  OK = 200,
  CREATED = 201,
  REDIRECT = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum ErrorTypeEnum {
  VALIDATION = 'ValidationError',
  NOT_FOUND_EXCEPTION = 'NotFoundException',
  BAD_REQUEST_EXCEPTION = 'BadRequestException',
  UPLOAD_EXCEPTION = 'UploadException',
  SERVER = 'ServerError',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
}

export enum RouteSchemasTypeEnum {
  QUERY_STRING_PARAMETERS = 'queryStringParameters',
  BODY = 'body',
  PATH_PARAMETERS = 'pathParameters',
}

export enum LambdaHandlerEnum {
  HELLO = 'hello',
}
