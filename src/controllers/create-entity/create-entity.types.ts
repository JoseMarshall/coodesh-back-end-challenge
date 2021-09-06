import { RequestValidator } from '../../main/adapters/adapters.types';

export interface MakeCreateEntityDependencies<T, K> {
  create: (req: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
