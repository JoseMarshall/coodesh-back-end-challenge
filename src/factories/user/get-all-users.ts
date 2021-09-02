import makeGetAllEntitiesController from '../../controllers/get-all-entities';
import { IUser } from '../../entities/user/user.types';
import { listAllUsersUC } from '../../usecases/list-all-users';
import { makeGetAllUsersValidator } from '../../validators/schemas/http-requests/user';
import { GetAllUsers } from '../../validators/types/user';

const getAllUsers = makeGetAllEntitiesController<IUser, GetAllUsers>({
  findAll: listAllUsersUC(),
  requestValidator: makeGetAllUsersValidator(),
});

export default getAllUsers;
