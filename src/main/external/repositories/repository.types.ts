import { Entity } from '../../../entities/entity.types';
import { IUser } from '../../../entities/user/user.types';
import { GetAll, GetOne } from '../../../validators/types/sub-types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface DeletedEntity {
  n: number;
  opTime: {
    ts: string;
    t: number;
  };
  electionId: string;
  ok: number;
  $clusterTime: {
    clusterTime: string;
    signature: {
      hash: string;
      keyId: string;
    };
  };
  operationTime: string;
  deletedCount: number;
}

export interface IRepository<T> {
  add(entities: T[]): Promise<T[]>;
  update(query: GetOne, body: Omit<Record<string, any>, keyof Entity>): Promise<T>;
  remove(query: GetOne): Promise<DeletedEntity>;
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
