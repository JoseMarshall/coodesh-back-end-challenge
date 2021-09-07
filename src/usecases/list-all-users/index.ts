import { ApiErrorsName, ApiErrorsType, ApiMessages, Login, User } from '../../constants';
import { IUser } from '../../entities/user/user.types';
import { formatQueryToRegex } from '../../main/external/repositories/mongodb/helpers/query-formatters';
import { MakeGetAllEntitiesDependencies } from '../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../utils/custom-error';
import { GetAllUsers } from '../../validators/types/user';

// eslint-disable-next-line import/prefer-default-export
export function listAllUsersUC() {
  return async (query: GetAllUsers) => {
    const unitOfWork = await uow();
    try {
      const usersRepo = unitOfWork.makeUserRepository();

      const users = await usersRepo.getAll<MakeGetAllEntitiesDependencies<IUser>>(query, {
        formatQuery: formatQueryToRegex,
        projection: {
          [`${User.Login}.${Login.Password}`]: 0,
          [`${User.Login}.${Login.Salt}`]: 0,
        },
      });

      return {
        payload: users,
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
