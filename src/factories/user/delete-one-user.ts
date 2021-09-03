import makeDeleteEntityController from '../../controllers/delete-entity';
import { IUser } from '../../entities/user/user.types';
import { deleteOneUserUC } from '../../usecases/delete-one-user';
import { makeDeleteOneUserValidator } from '../../validators/schemas/http-requests/user';
import { DeleteOneUser } from '../../validators/types/user';

const deleteOneUser = makeDeleteEntityController<IUser, DeleteOneUser>({
  deleteAll: deleteOneUserUC(),
  requestValidator: makeDeleteOneUserValidator(),
});

export default deleteOneUser;
