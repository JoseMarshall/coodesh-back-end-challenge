import joi from 'joi';

import {
  Common,
  Coordinates,
  Genders,
  Location,
  Name,
  Street,
  TimeStamps,
  TimeZone,
  User,
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
    [User.Dob]: joi.string().required(),
    [User.Registered]: joi.string().required(),
    [User.Phone]: joi.string().required(),
    [User.Cell]: joi.string().required(),
    [User.Nat]: joi.string().required(),
    [User.Id]: joi.string().required(),
    [User.Picture]: joi.string().required(),
    [TimeStamps.CreatedAt]: joi.date().required(),
    [TimeStamps.UpdatedAt]: joi.date().required(),
  })
  .required()
  .unknown(true);

export default joiValidator(getOneUserSchema);
