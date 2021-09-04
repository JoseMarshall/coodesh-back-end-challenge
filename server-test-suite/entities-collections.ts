import { CollectionNames } from '../src/constants';
import users from './collections/users-collection';

export default {
  [CollectionNames.Users]: users,
} as Record<`${CollectionNames}`, any>;
