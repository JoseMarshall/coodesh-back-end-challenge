import { CollectionNames } from '../src/constants';
import apikeys from './collections/api-keys-collection';
import users from './collections/users-collection';

export default {
  [CollectionNames.Users]: users,
  [CollectionNames.ApiKeys]: apikeys,
} as Record<`${CollectionNames}`, any>;
