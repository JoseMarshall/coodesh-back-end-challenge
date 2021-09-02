import { v4 as uuid } from 'uuid';

import { Common, Status, TimeStamps } from '../../constants';
import { IUserInput } from './user.types';

// eslint-disable-next-line import/prefer-default-export
export const makeUser = (data: IUserInput, id?: string) => ({
  [Common.MongoId]: id ?? uuid(),
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
  [Common.ImportedT]: new Date(),
  [Common.Status]: Status.Draft,
  ...data,
});
