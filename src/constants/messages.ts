export enum ApiErrorsName {
  GenericName = 'ERROR',
  InvalidToken = 'INVALID_TOKEN',
  NoMatchedSchema = 'NO_MATCHED_SCHEMA',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  DuplicateKey = 'DUPLICATE_KEY_ERROR',
}

export enum ApiErrorsType {
  ValidationError = 'VALIDATION_ERROR',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  GenericType = 'ERROR',
  InternalError = 'INTERNAL_ERROR',
}
export type ApiErrorsStatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;

export enum ApiMessages {
  NotSignedIn = 'You are not signed in, please sign in',
  InternalError = 'An application error occurred, the server was unable to process your request',
  UpdatingEntityError = 'Failed to update the entity, probably due to some data entered incorrectly, please check the data on your form',
  RouteNotFound = 'Route not found',
  CreatingEntityError = 'Failed to create the entity, probably due to some data entered incorrectly, please check your form data',
  DeletingEntityError = 'Failed to delete the entity',
  FetchingEntityError = 'Failed to fetch the resource, this may be due to poorly entered search parameters',
  SchemaError = 'The data sent does not obey the defined schema',
  MethodNotAllowed = 'The requested HTTP method is not allowed',
  CreatingEntitySuccess = 'Entity created successfully!',
  DeletingEntitySuccess = 'Entity successfully deleted!',
  FetchingEntitySuccess = 'Entity found successfully!',
  UpdatingEntitySuccess = 'Entity updated successfully!',
  RequestProcessedSuccessfully = 'Request processed successfully!',
  RequestProcessedError = 'Failed processing the entity',
}
