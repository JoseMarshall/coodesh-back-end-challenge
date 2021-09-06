import makeDeleteEntityController from '../../controllers/delete-entity';
import { DeletedEntity } from '../../main/external/repositories/repository.types';
import { deleteOneUserUC } from '../../usecases/delete-one-user';
import { makeDeleteOneUserValidator } from '../../validators/schemas/http-requests/user';
import { DeleteOneUser } from '../../validators/types/user';

const deleteOneUser = makeDeleteEntityController<DeletedEntity, DeleteOneUser>({
  deleteAll: deleteOneUserUC(),
  requestValidator: makeDeleteOneUserValidator(),
});

export default deleteOneUser;
