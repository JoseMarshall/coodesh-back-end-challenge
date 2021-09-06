import { HttpRequest } from '../../../../main/adapters/adapters.types';
import registerApiKeySchemaValidator from './register';

// eslint-disable-next-line import/prefer-default-export
export const makeRegisterApiKeyValidator = () => async (req: HttpRequest) =>
  registerApiKeySchemaValidator(req);
