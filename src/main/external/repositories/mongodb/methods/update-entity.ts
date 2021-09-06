import { Document, UpdateQuery } from 'mongoose';

import { Common } from '../../../../../constants';
import { Entity } from '../../../../../entities/entity.types';
import { queryGuard } from '../helpers';
import { MakeUpdateOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeUpdateOneEntity<D extends Document, T>({
  model,
  transaction,
  populateOptions,
}: MakeUpdateOneEntityData<D>) {
  return async (query: Record<string, any>, body: Omit<Record<string, any>, keyof Entity>) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(query, body as UpdateQuery<unknown>, {
          new: true,
          projection: { [Common.MongoId]: 0 },
          session: transaction?.id ? transaction : undefined,
        })
        ?.populate(populateOptions)
        .exec()
    );
    return doc.toObject() as unknown as T;
  };
}
