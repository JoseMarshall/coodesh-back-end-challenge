import { Schema } from 'mongoose';

import {
  Coordinates,
  Dob,
  Location,
  Login,
  Name,
  Picture,
  Registered,
  Street,
  TimeZone,
  UserId,
} from '../../../../../constants';

export const nameSchema = new Schema(
  {
    [Name.Title]: { type: String, required: true },
    [Name.First]: { type: String, required: true },
    [Name.Last]: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const coordinatesSchema = new Schema(
  {
    [Coordinates.Latitude]: { type: String, required: true },
    [Coordinates.Longitude]: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const timeZoneSchema = new Schema(
  {
    [TimeZone.Offset]: { type: String, required: true },
    [TimeZone.Description]: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export const streetSchema = new Schema(
  {
    [Street.Name]: { type: String, required: true },
    [Street.Number]: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

export const locationSchema = new Schema(
  {
    [Location.Street]: streetSchema,
    [Location.City]: { type: String, required: true },
    [Location.Country]: { type: String, required: true },
    [Location.State]: { type: String, required: true },
    [Location.PostCode]: { type: String, required: true },
    [Location.Coordinates]: coordinatesSchema,
    [Location.TimeZone]: timeZoneSchema,
  },
  {
    _id: false,
  }
);

export const loginSchema = new Schema(
  {
    [Login.UUID]: { type: String, required: true },
    [Login.Username]: { type: String, required: true },
    [Login.Password]: { type: String, required: true, select: false },
    [Login.Salt]: { type: String, required: true, select: false },
    [Login.MD5]: { type: String, required: true },
    [Login.SHA1]: { type: String, required: true },
    [Login.SHA256]: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export const dateOfBirthSchema = new Schema(
  {
    [Dob.Date]: { type: Date, required: true },
    [Dob.Age]: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

export const registeredSchema = new Schema(
  {
    [Registered.Date]: { type: Date, required: true },
    [Registered.Age]: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

export const userIdSchema = new Schema(
  {
    [UserId.Name]: { type: String, required: false },
    [UserId.Value]: { type: String, required: false },
  },
  {
    _id: false,
  }
);

export const pictureSchema = new Schema(
  {
    [Picture.Large]: { type: String, required: true },
    [Picture.Medium]: { type: String, required: true },
    [Picture.Thumbnail]: { type: String, required: true },
  },
  {
    _id: false,
  }
);
