import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../utils/custom-error';
import { UpdateUser } from '../../validators/types/user';

// eslint-disable-next-line import/prefer-default-export
export function updateUserUC() {
  return async (req: UpdateUser) => {
    const unitOfWork = await uow();
    try {
      const userRepo = unitOfWork.makeUserRepository();

      const updatedUser = await userRepo.update(req.params, req.body);

      return {
        payload: updatedUser,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.UpdatingEntityError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
