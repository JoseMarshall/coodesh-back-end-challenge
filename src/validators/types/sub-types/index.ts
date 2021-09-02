import { Common } from '../../../constants';

export interface GetAll {
  page: string;
  limit?: string;
}

export interface GetOne {
  [Common.MongoId]: string;
}
