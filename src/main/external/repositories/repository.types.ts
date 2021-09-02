import { Entity } from '../../../entities/entity.types';
import { IUser } from '../../../entities/user/user.types';
import { GetAll, GetOne } from '../../../validators/types/sub-types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface IRepository<T> {
  add(entities: T[]): Promise<T[]>;
  update(query: GetOne, body: Omit<Record<string, any>, keyof Entity>): Promise<T>;
  remove(query: GetOne): Promise<T>;
  get<O>(query: GetOne, options: O): Promise<T>;
  getAll<O>(query: GetAll, options: O): Promise<GetAllEntitiesData<T>>;
}

export interface IUnitOfWork {
  transaction: unknown;
  makeUserRepository: () => IRepository<IUser>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}
