import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../utils/custom-error';
import { DeleteOneUser } from '../../validators/types/user';

// eslint-disable-next-line import/prefer-default-export
export function deleteOneUserUC() {
  return async (query: DeleteOneUser) => {
    const unitOfWork = await uow();
    try {
      const userRepo = unitOfWork.makeUserRepository();

      const deletedUser = await userRepo.remove(query);

      return {
        payload: deletedUser,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.DeletingEntityError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
