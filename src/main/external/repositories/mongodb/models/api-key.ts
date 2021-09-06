import { Schema } from 'mongoose';

import { ApiKey, ApiKeyUsage, CollectionNames } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { ApiKeyDocument } from './model.types';

const apiKeyUsageSchema = new Schema(
  {
    [ApiKeyUsage.Date]: { type: Date, required: true },
    [ApiKeyUsage.Count]: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  }
);

const apiKeySchema = new Schema<any, any>(
  {
    [ApiKey.Apikey]: { type: String, required: true },
    [ApiKey.Host]: { type: String, required: true, trim: true },
    [ApiKey.Usage]: [apiKeyUsageSchema],
  },
  { timestamps: true, versionKey: false, _id: true }
);

apiKeySchema.set('toObject', {
  virtuals: true,
});

apiKeySchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<ApiKeyDocument>(CollectionNames.ApiKeys, apiKeySchema);
