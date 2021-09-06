export enum Tags {
  User = 'User',
  Generic = '',
}

export enum TimeStamps {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum ErrorDescription {
  BadRequest = 'Bad Request - you may have pass a malformed request',
  Forbidden = 'Forbidden - You are authenticated but dont have permission to access this resource',
  InternalError = 'Server Error - Something went wrong on server side, check the error details',
  NotFound = 'Not Found - The server could not find the requested resource',
  UnprocessableEntity = 'Unprocessable Entity - The request was weel-formed but failed due to semantic errors',
  NotAllowed = 'Method Not Allowed - Server not allows you to use this method on this resource',
  SchemaValidationError = 'Schema Validation Error',
}

export enum SuccessDescription {
  GetAll = 'List of items successfully returned (it can be an empty list, which means there is no item that match this query)',
  GetOne = 'The resource has been fetched, check the msg body',
  UpdateOne = 'The resource has been updated successfully',
  DeleteOne = 'The resource has been deleted successfully',
}
