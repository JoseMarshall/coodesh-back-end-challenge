import { HttpRequest } from '../../../../main/adapters/adapters.types';
import registerApiKeySchemaValidator from './register-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeRegisterApiKeyValidator = () => async (req: HttpRequest) =>
  registerApiKeySchemaValidator(req);
