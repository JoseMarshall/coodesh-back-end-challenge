import { Document } from 'mongoose';

import { Common } from '../../../../../constants';
import { GetOne } from '../../../../../validators/types/sub-types';
import { queryGuard } from '../helpers';
import { MakeGetOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetOneEntity<D extends Document, K>({
  model,
  options,
}: MakeGetOneEntityData<D, K>) {
  return async (query: GetOne) => {
    const doc = await queryGuard<D>(
      model
        .findOne(query, {
          [Common.MongoId]: 0,
          ...(options.projection ?? {}),
        })
        ?.populate(options.populateOptions)
        .exec()
    );

    return options.formatData
      ? options.formatData(doc.toObject())
      : (doc.toObject() as unknown as K);
  };
}
