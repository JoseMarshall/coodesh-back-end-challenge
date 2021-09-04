import joi from 'joi';

import {
  Common,
  Coordinates,
  Dob,
  Genders,
  Location,
  Login,
  Name,
  Picture,
  Registered,
  Status,
  Street,
  TimeZone,
  User,
  UserId,
} from '../../../../constants';
import joiValidator from '../../../index';
import { UpdateUser } from '../../../types/user';
import { idSchema } from '../sub-schemas';

const updateUserSchema = joi
  .object({
    params: joi.object(idSchema).required().unknown(false),
    body: joi
      .object({
        [User.Name]: joi
          .object({
            [Name.Title]: joi.string().required().allow(''),
            [Name.First]: joi.string().required().allow(''),
            [Name.Last]: joi.string().required().allow(''),
          })
          .unknown(false),
        [User.Gender]: joi.string().valid(...Object.values(Genders)),
        [Common.Status]: joi.string().valid(...Object.values(Status)),
        [User.Location]: joi
          .object({
            [Location.Street]: joi
              .object({
                [Street.Name]: joi.string().required().allow(''),
                [Street.Number]: joi.number().required(),
              })
              .required()
              .unknown(false),
            [Location.City]: joi.string().required(),
            [Location.State]: joi.string().required(),
            [Location.PostCode]: joi.string().required(),
            [Location.Coordinates]: joi
              .object({
                [Coordinates.Latitude]: joi.string().required(),
                [Coordinates.Longitude]: joi.string().required(),
              })
              .required()
              .unknown(false),
            [Location.TimeZone]: joi
              .object({
                [TimeZone.Offset]: joi.string().required(),
                [TimeZone.Description]: joi.string().required(),
              })
              .required()
              .unknown(false),
          })
          .unknown(false),
        [User.Email]: joi.string().email(),
        [User.Login]: joi
          .object({
            [Login.UUID]: joi.string().required(),
            [Login.Username]: joi.string().required(),
            [Login.Password]: joi.string().required(),
            [Login.Salt]: joi.string().required(),
            [Login.MD5]: joi.string().required(),
            [Login.SHA1]: joi.string().required(),
            [Login.SHA256]: joi.string().required(),
          })
          .unknown(false),
        [User.Dob]: joi
          .object({
            [Dob.Date]: joi.date().required(),
            [Dob.Age]: joi.number().required(),
          })
          .unknown(false),
        [User.Registered]: joi
          .object({
            [Registered.Date]: joi.date().required(),
            [Registered.Age]: joi.number().required(),
          })
          .unknown(false),
        [User.Phone]: joi.string(),
        [User.Cell]: joi.string(),
        [User.Nat]: joi.string(),
        [User.Id]: joi
          .object({
            [UserId.Name]: joi.string().allow(''),
            [UserId.Value]: joi.string(),
          })
          .unknown(false),
        [User.Picture]: joi
          .object({
            [Picture.Large]: joi.string().required(),
            [Picture.Medium]: joi.string().required(),
            [Picture.Thumbnail]: joi.string().required(),
          })
          .unknown(false),
      })
      .required()
      .unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateUser>(updateUserSchema);
