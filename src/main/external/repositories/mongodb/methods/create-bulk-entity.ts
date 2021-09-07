import { Document } from 'mongoose';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../../constants';
import { Entity } from '../../../../../entities/entity.types';
import CustomError from '../../../../../utils/custom-error';
import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateBulkEntity<D extends Document, K extends Entity>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K[]) => {
    try {
      const docs = await queryGuard<D[]>(
        model.create(body, {
          session: transaction?.id ? transaction : undefined,
        })
      );
      return docs as unknown as K[];
    } catch (error) {
      // Verify if its a mongoDB duplicate key error
      throw error.code === 11000
        ? new CustomError({
            statusCode: 422,
            name: ApiErrorsName.DuplicateKey,
            type: ApiErrorsType.ValidationError,
            message: ApiMessages.CreatingEntityError,
            stack: error.stack,
            details: { existingFields: error.keyValue, msg: error.message },
          })
        : error;
    }
  };
}
