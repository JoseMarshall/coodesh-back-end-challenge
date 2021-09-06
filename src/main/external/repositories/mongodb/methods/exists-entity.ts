import { Document } from 'mongoose';

import { MakeExistsEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeExistsEntity<D extends Document>({ model }: MakeExistsEntityData<D>) {
  return async (query: Record<string, any>) => model.exists(query);
}
