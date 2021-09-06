import { ClientSession, Document, Model } from 'mongoose';

import { Entity } from '../../../../entities/entity.types';
import { GetAll, GetOne } from '../../../../validators/types/sub-types';
import { DeletedEntity, IRepository } from '../repository.types';
import {
  makeCreateBulkEntity,
  makeDeleteOneEntity,
  makeGetAllEntities,
  makeGetOneEntity,
  makeUpdateOneEntity,
} from './methods';

function BaseRepository<D extends Document, T extends Entity>(
  model: Model<D>,
  transaction: ClientSession
): IRepository<T> {
  const repository: IRepository<T> = {
    async add(entities: T[]) {
      return makeCreateBulkEntity<D, T>({ model, transaction })(entities);
    },
    async get(query: GetOne, options: Record<string, any>) {
      return makeGetOneEntity<D, T>({ model, options })(query);
    },
    async getAll(query: GetAll, options: Record<string, any>) {
      return makeGetAllEntities<D, T>({ model, options })(query);
    },
    async remove(query: GetOne) {
      return makeDeleteOneEntity<D, DeletedEntity>({ model, transaction })(query);
    },
    async update(query: GetOne, body: Omit<Record<string, any>, keyof Entity>) {
      return makeUpdateOneEntity<D, T>({ model, transaction })(query, body);
    },
  };
  return repository;
}

export default BaseRepository;
