import { RequestValidator } from '../../main/adapters/adapters.types';

export interface MakeGetOneEntityDependencies<T, K> {
  findOne: (query: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
