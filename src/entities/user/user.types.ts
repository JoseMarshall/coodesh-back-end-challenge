import {
  Coordinates,
  Dob,
  Genders,
  Location as LocationEnum,
  Login,
  Name as NameEnum,
  Picture,
  Registered,
  Street,
  TimeZone,
  User,
  UserId,
} from '../../constants';
import { Entity } from '../entity.types';

export interface IName {
  [NameEnum.Title]: string;
  [NameEnum.First]: string;
  [NameEnum.Last]: string;
}

export interface ICoordinates {
  [Coordinates.Latitude]: string;
  [Coordinates.Longitude]: string;
}

export interface ITimezone {
  [TimeZone.Offset]: string;
  [TimeZone.Description]: string;
}

export interface IStreet {
  [Street.Name]: string;
  [Street.Number]: number;
}

export interface ILocation {
  [LocationEnum.Street]: IStreet;
  [LocationEnum.City]: string;
  [LocationEnum.Country]: string;
  [LocationEnum.State]: string;
  [LocationEnum.PostCode]: string;
  [LocationEnum.Coordinates]: ICoordinates;
  [LocationEnum.TimeZone]: ITimezone;
}

export interface ILogin {
  [Login.UUID]: string;
  [Login.Username]: string;
  [Login.Password]: string;
  [Login.Salt]: string;
  [Login.MD5]: string;
  [Login.SHA1]: string;
  [Login.SHA256]: string;
}

export interface IDob {
  [Dob.Date]: Date;
  [Dob.Age]: number;
}

export interface IRegistered {
  [Registered.Date]: Date;
  [Registered.Age]: number;
}

export interface IUserId {
  [UserId.Name]: string;
  [UserId.Value]?: string;
}

export interface IPicture {
  [Picture.Large]: string;
  [Picture.Medium]: string;
  [Picture.Thumbnail]: string;
}

export interface IUser extends Entity {
  [User.Name]: IName;
  [User.Gender]: `${Genders}`;
  [User.Location]: ILocation;
  [User.Email]: string;
  [User.Login]: ILogin;
  [User.Dob]: IDob;
  [User.Registered]: IRegistered;
  [User.Phone]: string;
  [User.Cell]: string;
  [User.Nat]: string;
  [User.Id]: IUserId;
  [User.Picture]: IPicture;
}

export type IUserInput = Omit<IUser, keyof Entity>;
