import makeUpdateEntityController from '../../controllers/update-entity';
import { IUser } from '../../entities/user/user.types';
import { updateUserUC } from '../../usecases/update-user';
import { makeUpdateUserValidator } from '../../validators/schemas/http-requests/user';
import { UpdateUser } from '../../validators/types/user';

const updateUser = makeUpdateEntityController<IUser, UpdateUser>({
  update: updateUserUC(),
  requestValidator: makeUpdateUserValidator(),
});

export default updateUser;
