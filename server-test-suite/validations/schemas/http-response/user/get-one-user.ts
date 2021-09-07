import joi from 'joi';

import {
  Common,
  Coordinates,
  Dob,
  Genders,
  Location,
  Name,
  Picture,
  Registered,
  Street,
  TimeStamps,
  TimeZone,
  User,
  UserId,
} from '../../../../../src/constants';
import joiValidator from '../../index';

export const getOneUserSchema = joi
  .object({
    [Common.MongoId]: joi.any(),
    [User.Name]: joi
      .object({
        [Name.Title]: joi.string().required(),
        [Name.First]: joi.string().required(),
        [Name.Last]: joi.string().required(),
      })
      .required()
      .unknown(false),
    [User.Gender]: joi
      .string()
      .valid(...Object.values(Genders))
      .required(),
    [User.Location]: joi
      .object({
        [Location.Street]: joi
          .object({
            [Street.Name]: joi.string().required(),
            [Street.Number]: joi.number().required(),
          })
          .required()
          .unknown(false),
        [Location.City]: joi.string().required(),
        [Location.Country]: joi.string().required(),
        [Location.State]: joi.string().required(),
        [Location.PostCode]: joi.number().required(),
        [Location.Coordinates]: joi
          .object({
            [Coordinates.Latitude]: joi.string().required(),
            [Coordinates.Longitude]: joi.string().required(),
          })
          .required()
          .unknown(false),
        [Location.TimeZone]: joi
          .object({
            [TimeZone.Description]: joi.string().required(),
            [TimeZone.Offset]: joi.string().required(),
          })
          .required()
          .unknown(false),
      })
      .required()
      .unknown(false),
    [User.Email]: joi.string().required(),
    [User.Dob]: joi
      .object({ [Dob.Date]: joi.date().required(), [Dob.Age]: joi.number().required() })
      .required()
      .unknown(false),
    [User.Registered]: joi
      .object({
        [Registered.Date]: joi.date().required(),
        [Registered.Age]: joi.number().required(),
      })
      .required()
      .unknown(false),
    [User.Phone]: joi.string().required(),
    [User.Cell]: joi.string().required(),
    [User.Nat]: joi.string().required(),
    [User.Id]: joi
      .object({
        [UserId.Name]: joi.string().allow(''),
        [UserId.Value]: joi.any(),
      })
      .required()
      .unknown(false),
    [User.Picture]: joi
      .object({
        [Picture.Large]: joi.string().uri().required(),
        [Picture.Medium]: joi.string().uri().required(),
        [Picture.Thumbnail]: joi.string().uri().required(),
      })
      .required()
      .unknown(false),
    [TimeStamps.CreatedAt]: joi.date().required(),
    [TimeStamps.UpdatedAt]: joi.date().required(),
  })
  .required()
  .unknown(true);

export default joiValidator(getOneUserSchema);
