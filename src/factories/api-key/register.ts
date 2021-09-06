import makeCreateEntityController from '../../controllers/create-entity';
import { IApiKey } from '../../entities/api-key/api-key.types';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { registerApiKeyUC } from '../../usecases/register-api-key';
import { makeRegisterApiKeyValidator } from '../../validators/schemas/http-requests/api-key';

const registerApiKey = makeCreateEntityController<IApiKey, HttpRequest>({
  create: registerApiKeyUC(),
  requestValidator: makeRegisterApiKeyValidator(),
});

export default registerApiKey;
