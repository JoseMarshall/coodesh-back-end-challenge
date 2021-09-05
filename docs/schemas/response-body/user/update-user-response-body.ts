import { User } from '../../../../src/constants';
import { makeGeneralResponseBodySchema } from '../../../builders';
import { userSchema } from '../../entities';

// eslint-disable-next-line import/prefer-default-export
export const updateUserResponseBodySchema = makeGeneralResponseBodySchema(
  {
    [User.Name]: userSchema.properties[User.Name],
    [User.Gender]: userSchema.properties[User.Gender],
    [User.Location]: userSchema.properties[User.Location],
    [User.Email]: userSchema.properties[User.Email],
    [User.Dob]: userSchema.properties[User.Dob],
    [User.Registered]: userSchema.properties[User.Registered],
    [User.Phone]: userSchema.properties[User.Phone],
    [User.Cell]: userSchema.properties[User.Cell],
    [User.Nat]: userSchema.properties[User.Nat],
    [User.Id]: userSchema.properties[User.Id],
    [User.Picture]: userSchema.properties[User.Picture],
  },
  [
    User.Name,
    User.Gender,
    User.Location,
    User.Email,
    User.Dob,
    User.Registered,
    User.Phone,
    User.Cell,
    User.Nat,
    User.Id,
    User.Picture,
  ]
);
