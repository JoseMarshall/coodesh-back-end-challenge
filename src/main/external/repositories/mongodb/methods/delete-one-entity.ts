import { Document } from 'mongoose';

import { GetOne } from '../../../../../validators/types/sub-types';
import { queryGuard } from '../helpers';
import { MakeDeleteOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeDeleteOneEntity<D extends Document, K>({
  model,
  transaction,
}: MakeDeleteOneEntityData<D>) {
  return async (query: GetOne) => {
    const doc = await queryGuard<D>(
      model
        .deleteOne(query, {
          session: transaction?.id ? transaction : undefined,
        })
        .lean()
    );

    if ((doc as any).deletedCount === 0) throw new Error();
    return doc as unknown as K;
  };
}
