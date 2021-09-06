import { Document } from 'mongoose';

import { Common, User } from '../../../../../constants';
import { IApiKey } from '../../../../../entities/api-key/api-key.types';
import { IUser } from '../../../../../entities/user/user.types';

export interface UserDocument extends Document, Omit<IUser, Common.MongoId | User.Id> {
  [Common.MongoId]: string;
  [User.Id]: IUser[User.Id];
}

export interface ApiKeyDocument extends Document, Omit<IApiKey, Common.MongoId> {
  [Common.MongoId]: string;
}
