import { Genders, User } from '../../../constants';
import {
  IDob,
  ILocation,
  ILogin,
  IName,
  IPicture,
  IRegistered,
  IUserId,
} from '../../../entities/user/user.types';
import { DeleteOne, GetAll, GetOne } from '../sub-types';

export interface GetAllUsers extends GetAll {
  'name>title'?: string;
  'name>first'?: string;
  'name>last'?: string;
}

export interface GetOneUser extends GetOne {}

export interface DeleteOneUser extends DeleteOne {}

export interface UpdateUser {
  [User.Name]?: IName;
  [User.Gender]?: `${Genders}`;
  [User.Location]?: ILocation;
  [User.Email]?: string;
  [User.Login]?: ILogin;
  [User.Dob]?: IDob;
  [User.Registered]?: IRegistered;
  [User.Phone]?: string;
  [User.Cell]?: string;
  [User.Nat]?: string;
  [User.Id]?: IUserId;
  [User.Picture]?: IPicture;
}
