import { CollectionNames, Genders, User } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { UserDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import {
  dateOfBirthSchema,
  locationSchema,
  loginSchema,
  nameSchema,
  pictureSchema,
  registeredSchema,
  userIdSchema,
} from './user-subschema';

const userSchema = SchemaConstructor({
  [User.Name]: nameSchema,
  [User.Gender]: { type: String, required: true, enum: Object.values(Genders) },
  [User.Location]: locationSchema,
  [User.Email]: { type: String, required: true },
  [User.Login]: loginSchema,
  [User.Dob]: dateOfBirthSchema,
  [User.Registered]: registeredSchema,
  [User.Phone]: { type: String, required: true },
  [User.Cell]: { type: String, required: true },
  [User.Nat]: { type: String, required: true },
  [User.Id]: userIdSchema,
  [User.Picture]: pictureSchema,
});

userSchema.set('toObject', {
  virtuals: true,
});

userSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<UserDocument>(CollectionNames.Users, userSchema);
