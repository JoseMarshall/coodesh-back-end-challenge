import { Document } from 'mongoose';

import { Common } from '../../../../../constants';
import { safeParseInt } from '../../../../../utils';
import { GetAll } from '../../../../../validators/types/sub-types';
import { queryGuard } from '../helpers';
import { GetAllEntitiesAggregatedData, MakeGetAllEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetAllEntities<D extends Document, T>({
  model,
  options,
}: MakeGetAllEntityData<D, T>) {
  return async (query: GetAll) => {
    const { page, limit, ...filteredQuery } = query;
    const pageNumber = safeParseInt(page, 10);
    const docPerPage = safeParseInt(limit ?? '0', 10);
    const skip = docPerPage > 0 ? docPerPage * (pageNumber - 1) : 0;

    const formattedQuery = options.formatQuery ? options.formatQuery(filteredQuery) : filteredQuery;

    const document = (await queryGuard<D[] | GetAllEntitiesAggregatedData<D>[]>(
      model
        .aggregate([
          {
            $facet: {
              data: [
                {
                  $match: formattedQuery,
                },
                { $skip: skip },
                { $limit: docPerPage || 15 },
                {
                  $project: {
                    [Common.MongoId]: 0,
                    ...(options.projection ?? {}),
                  },
                },
              ],
              count: [
                {
                  $match: formattedQuery,
                },
                { $count: 'total' },
              ],
            },
          },
        ])
        .exec()
    )) as GetAllEntitiesAggregatedData<D>[];

    return {
      data: options.formatData
        ? options.formatData(document[0].data)
        : (document[0].data as unknown as ReadonlyArray<T>),
      count: document[0].count[0]?.total ?? 0,
    };
  };
}
