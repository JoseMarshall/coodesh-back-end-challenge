import { Common, Status, TimeStamps } from '../constants';

export interface Entity {
  [Common.MongoId]: string;
  [TimeStamps.CreatedAt]: Date;
  [TimeStamps.UpdatedAt]: Date;
  [Common.ImportedT]: Date;
  [Common.Status]: `${Status}`;
}
