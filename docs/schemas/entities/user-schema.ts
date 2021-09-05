import {
  Coordinates,
  Dob,
  Genders,
  Location,
  Login,
  Name,
  Picture,
  Registered,
  Street,
  TimeZone,
  User,
  UserId,
} from '../../../src/constants';
import { calcAge } from '../../../src/utils';
import { makeIntegerSchema, makeObjectSchema, makeStringSchema } from '../../builders';

const nameSchema = makeObjectSchema({
  required: [Name.First, Name.Last, Name.Title],
  description: 'The object containing the name (title, first and last) of the user',
  properties: {
    [Name.Title]: makeStringSchema({ description: 'The title of the user', example: 'Mr.' }),
    [Name.First]: makeStringSchema({
      description: 'The first name of the user',
      example: 'John',
    }),
    [Name.Last]: makeStringSchema({ description: 'The last name of the user', example: 'Doe' }),
  },
});

const coordinatesSchema = makeObjectSchema({
  required: [Coordinates.Latitude, Coordinates.Longitude],
  description: 'The object containing the coordinates information of user location',
  properties: {
    [Coordinates.Latitude]: makeStringSchema({
      description: 'The latitude coords',
      example: '-2.2032',
    }),
    [Coordinates.Longitude]: makeStringSchema({
      description: 'The longitude coords',
      example: '-80.9314',
    }),
  },
});

const timezoneSchema = makeObjectSchema({
  required: [TimeZone.Description, TimeZone.Offset],
  description: 'The object containing the timezone information of user location',
  properties: {
    [TimeZone.Description]: makeStringSchema({
      description: 'The Description of this timezone',
      example: 'Western Europe Time, London, Lisbon, Casablanca',
    }),
    [TimeZone.Offset]: makeStringSchema({
      description: 'The offset of this timezone',
      example: '0:00',
    }),
  },
});

const streetSchema = makeObjectSchema({
  required: [Street.Name, Street.Number],
  description: 'The object containing the street information of user location',
  properties: {
    [Street.Name]: makeStringSchema({
      description: 'The street name',
      example: `Place de L'Europe`,
    }),
    [Street.Number]: makeIntegerSchema({
      description: 'the house number',
      example: 9304,
    }),
  },
});

const locationSchema = makeObjectSchema({
  required: [
    Location.Street,
    Location.City,
    Location.State,
    Location.PostCode,
    Location.Coordinates,
    Location.TimeZone,
  ],
  description: 'The object containing the information of user location',
  properties: {
    [Location.Street]: streetSchema,
    [Location.City]: makeStringSchema({
      description: 'The city name',
      example: `Poitiers`,
    }),
    [Location.State]: makeStringSchema({
      description: 'The state name',
      example: `Haute-Loire`,
    }),
    [Location.PostCode]: makeIntegerSchema({
      description: 'The postcode',
      example: 85250,
    }),
    [Location.Coordinates]: coordinatesSchema,
    [Location.TimeZone]: timezoneSchema,
  },
});

const loginSchema = makeObjectSchema({
  required: [Login.UUID, Login.Username, Login.MD5, Login.SHA1, Login.SHA256],
  description: 'The object containing the information of user login',
  properties: {
    [Login.UUID]: makeStringSchema({
      example: `656e3b6d-c06f-4506-9181-99abb3afdef0`,
      format: 'uuid',
    }),
    [Login.Username]: makeStringSchema({
      description: 'The username',
      example: `orangebutterfly624`,
    }),
    [Login.MD5]: makeStringSchema({
      description: 'The md5 encryption of user password',
      example: `93ca5a713cd73d0647fff16ffb82ee3c`,
    }),
    [Login.SHA1]: makeStringSchema({
      description: 'The SHA1 encryption of user password',
      example: `dc87927dd9a782e17f7e945adbeb49e43656a202`,
    }),
    [Login.SHA256]: makeStringSchema({
      description: 'The SHA256 encryption of user password',
      example: `298f87655d3a4e612be49a20d156301820ccfce5073a6465d03c14fa6e476cc3`,
    }),
  },
});

const dateOfBirthSchema = makeObjectSchema({
  required: [Dob.Date, Dob.Age],
  description: 'The object containing the information about the user date of birth',
  properties: {
    [Dob.Date]: makeStringSchema({
      description: 'The date of birth of the user',
      example: '1975-08-03T16:48:35.174Z',
      format: 'date-time',
    }),
    [Dob.Age]: makeIntegerSchema({
      example: calcAge('1975-08-03T16:48:35.174Z'),
      description: 'The age of the user',
    }),
  },
});

const registeredSchema = makeObjectSchema({
  required: [Registered.Date, Registered.Age],
  description: 'The object containing the information about the user registration',
  properties: {
    [Registered.Date]: makeStringSchema({
      description: 'The register date of the user',
      example: '2013-11-14T01:46:14.291Z',
      format: 'date-time',
    }),
    [Registered.Age]: makeIntegerSchema({
      example: calcAge('2013-11-14T01:46:14.291Z'),
      description: 'The age of the user',
    }),
  },
});

const userIdSchema = makeObjectSchema({
  required: [UserId.Name],
  description: 'The object containing the information about the user id',
  properties: {
    [UserId.Name]: makeStringSchema({
      example: 'INSEE',
    }),
    [UserId.Value]: makeStringSchema({
      example: '1NNaN24422583 20',
    }),
  },
});

const pictureSchema = makeObjectSchema({
  required: [Picture.Large, Picture.Medium, Picture.Thumbnail],
  description: 'The object containing the information about the user pictures',
  properties: {
    [Picture.Large]: makeStringSchema({
      description: 'The url to the user picture (large version)',
      example: 'https://randomuser.me/api/portraits/men/69.jpg',
    }),
    [Picture.Medium]: makeStringSchema({
      description: 'The url to the user picture (medium version)',
      example: 'https://randomuser.me/api/portraits/med/men/69.jpg',
    }),
    [Picture.Thumbnail]: makeStringSchema({
      description: 'The url to the user picture (thumbnail version)',
      example: 'https://randomuser.me/api/portraits/thumb/men/69.jpg',
    }),
  },
});

// eslint-disable-next-line import/prefer-default-export
export const userSchema = makeObjectSchema({
  required: [
    User.Name,
    User.Gender,
    User.Location,
    User.Email,
    User.Login,
    User.Dob,
    User.Registered,
    User.Phone,
    User.Cell,
    User.Nat,
    User.Id,
    User.Picture,
  ],
  properties: {
    [User.Name]: nameSchema,
    [User.Gender]: makeStringSchema({
      example: Genders.Male,
      enum: Object.values(Genders),
    }),
    [User.Location]: locationSchema,
    [User.Email]: makeStringSchema({
      example: 'hebojosemar@gmail.com',
      format: 'email',
      description: 'The user email',
    }),
    [User.Login]: loginSchema,
    [User.Dob]: dateOfBirthSchema,
    [User.Registered]: registeredSchema,
    [User.Phone]: makeStringSchema({
      example: '04-26-98-99-07',
      description: 'The user phone number',
    }),
    [User.Cell]: makeStringSchema({
      example: '06-94-72-43-53',
      description: 'The user cell-phone number',
    }),
    [User.Nat]: makeStringSchema({
      example: 'FR',
      description: 'The user nationality code',
      enum: [
        'AU',
        'BR',
        'CA',
        'CH',
        'DE',
        'DK',
        'ES',
        'FI',
        'FR',
        'GB',
        'IE',
        'IR',
        'NO',
        'NL',
        'NZ',
        'TR',
        'US',
      ],
    }),
    [User.Id]: userIdSchema,
    [User.Picture]: pictureSchema,
  },
});
