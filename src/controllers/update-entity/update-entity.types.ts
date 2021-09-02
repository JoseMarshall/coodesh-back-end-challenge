import { RequestValidator } from '../../main/adapters/adapters.types';

export interface MakeUpdateEntityDependencies<T, K> {
  update: (req: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
