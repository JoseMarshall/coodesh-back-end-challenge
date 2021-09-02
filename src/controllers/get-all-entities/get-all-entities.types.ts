import { RequestValidator } from '../../main/adapters/adapters.types';

interface Records<T> {
  data: ReadonlyArray<T>;
  count: number;
}
export interface MakeGetAllEntitiesDependencies<T, K> {
  findAll: (query: K) => Promise<{ payload: Records<T> }>;
  requestValidator: RequestValidator<K>;
}
