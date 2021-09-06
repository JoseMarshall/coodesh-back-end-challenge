import { ApiKey, TimeStamps } from '../../constants';
import { IApiKeyInput } from './api-key.types';

// eslint-disable-next-line import/prefer-default-export
export const makeApiKey = (host: string): IApiKeyInput => {
  // create a base-36 string
  const key = [...Array(30)]
    // eslint-disable-next-line no-bitwise
    .map(_ => ((Math.random() * 36) | 0).toString(36))
    .join('');

  return {
    [ApiKey.Apikey]: key,
    [ApiKey.Host]: host,
    [ApiKey.Usage]: [{ date: new Date(), count: 0 }],
    [TimeStamps.CreatedAt]: new Date(),
    [TimeStamps.UpdatedAt]: new Date(),
  };
};
