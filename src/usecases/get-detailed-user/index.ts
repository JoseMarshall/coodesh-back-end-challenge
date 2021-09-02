import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import { IUser } from '../../entities/user/user.types';
import { MakeGetOneEntityDependencies } from '../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../utils/custom-error';
import { GetOneUser } from '../../validators/types/user';

// eslint-disable-next-line import/prefer-default-export
export function getDetailedUserUC() {
  return async (query: GetOneUser) => {
    const unitOfWork = await uow();
    try {
      const userRepo = unitOfWork.makeUserRepository();

      const user = await userRepo.get<MakeGetOneEntityDependencies<IUser>>(query, {});

      return {
        payload: user,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FetchingEntityError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
