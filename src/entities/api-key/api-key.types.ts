import { ApiKey, ApiKeyUsage, TimeStamps } from '../../constants';

interface IUsage {
  [ApiKeyUsage.Count]: number;
  [ApiKeyUsage.Date]: Date;
}

export interface IApiKey {
  [ApiKey.Apikey]: string;
  [ApiKey.Host]: string;
  [ApiKey.MongoId]: string;
  [ApiKey.Usage]: IUsage[];
  [TimeStamps.CreatedAt]: Date;
  [TimeStamps.UpdatedAt]: Date;
}

export type IApiKeyInput = Omit<IApiKey, ApiKey.MongoId>;
