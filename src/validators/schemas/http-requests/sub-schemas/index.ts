import joi from 'joi';

import { Common } from '../../../../constants';
import { limitQueryRegex, pageQueryRegex } from '../../../../utils';

export const getAllSchema = {
  page: joi.string().required().regex(pageQueryRegex),
  limit: joi.string().regex(limitQueryRegex),
};

export const idSchema = {
  [Common.MongoId]: joi.string().uuid({ version: 'uuidv4' }).required(),
};
