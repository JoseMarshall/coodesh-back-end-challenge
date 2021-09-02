import { Document } from 'mongoose';

import { Common, User } from '../../../../../constants';
import { IUser } from '../../../../../entities/user/user.types';

export interface UserDocument extends Document, Omit<IUser, Common.MongoId | User.Id> {
  [Common.MongoId]: string;
  [User.Id]: IUser[User.Id];
}
