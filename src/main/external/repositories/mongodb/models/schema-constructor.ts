import { DocumentDefinition, Schema, SchemaDefinition } from 'mongoose';

import { Common, Status } from '../../../../../constants';

export default (schemaDefinition: SchemaDefinition<DocumentDefinition<any>>) =>
  new Schema<any, any>(
    {
      [Common.MongoId]: { type: String },
      [Common.ImportedT]: { type: Date, required: true },
      [Common.Status]: { type: String, required: true, enum: Object.values(Status) },
      ...schemaDefinition,
    },
    { timestamps: true, versionKey: false }
  );
