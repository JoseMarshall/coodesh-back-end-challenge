import { RequestValidator } from '../../main/adapters/adapters.types';

export interface MakeDeleteEntityDependencies<T, K> {
  deleteAll: (query: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
