import { ClientSession } from 'mongoose';

import { ApiKey } from '../../../../constants';
import { IApiKey } from '../../../../entities/api-key/api-key.types';
import { IApiKeyRepository } from '../repository.types';
import {
  makeCreateBulkEntity,
  makeExistsEntity,
  makeGetOneEntity,
  makeUpdateOneEntity,
} from './methods';
import { ApiKeyModel } from './models';
import { ApiKeyDocument } from './models/model.types';

function ApiKeyRepository(transaction: ClientSession): IApiKeyRepository {
  const repository: IApiKeyRepository = {
    async add(apiKey: IApiKey) {
      return makeCreateBulkEntity<ApiKeyDocument, any>({ model: ApiKeyModel, transaction })([
        apiKey,
      ]);
    },
    async exists(query: { [ApiKey.Host]: string; [ApiKey.Apikey]: string }) {
      return makeExistsEntity<ApiKeyDocument>({ model: ApiKeyModel })(query);
    },

    async update(
      query: { [ApiKey.Host]?: string; [ApiKey.Apikey]?: string; [ApiKey.MongoId]?: any },
      body: Record<string, any>
    ) {
      return makeUpdateOneEntity<ApiKeyDocument, IApiKey>({ model: ApiKeyModel, transaction })(
        query,
        body
      );
    },

    async get(query: { [ApiKey.Host]: string; [ApiKey.Apikey]: string }) {
      return makeGetOneEntity<ApiKeyDocument, IApiKey>({ model: ApiKeyModel, options: {} })(query);
    },
  };
  return repository;
}

export default ApiKeyRepository;
