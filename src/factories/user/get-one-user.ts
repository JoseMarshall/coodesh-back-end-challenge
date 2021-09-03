import makeGetOneEntityController from '../../controllers/get-one-entity';
import { IUser } from '../../entities/user/user.types';
import { getDetailedUserUC } from '../../usecases/get-detailed-user';
import { makeGetOneUserValidator } from '../../validators/schemas/http-requests/user';
import { GetOneUser } from '../../validators/types/user';

const getOneUser = makeGetOneEntityController<IUser, GetOneUser>({
  findOne: getDetailedUserUC(),
  requestValidator: makeGetOneUserValidator(),
});

export default getOneUser;
