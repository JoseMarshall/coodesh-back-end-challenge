import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import { makeApiKey } from '../../entities/api-key';
import { HttpRequest } from '../../main/adapters/adapters.types';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../utils/custom-error';

// eslint-disable-next-line import/prefer-default-export
export function registerApiKeyUC() {
  return async (req: HttpRequest) => {
    const unitOfWork = await uow();
    try {
      const apiKeyRepo = unitOfWork.makeApiKeyRepository();

      const createdApiKey = (await apiKeyRepo.add(makeApiKey(req.headers.host)))[0];

      return {
        payload: createdApiKey,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.CreatingEntityError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
