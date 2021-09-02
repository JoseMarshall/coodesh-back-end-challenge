import { ApiMessages } from '../../constants';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { MakeDeleteEntityDependencies } from './delete-entity.types';

function makeDeleteEntityController<D, K>({
  deleteAll,
  requestValidator,
}: MakeDeleteEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);

    const result = await deleteAll(validatedReq);

    return {
      status: 200,
      body: result.payload,
      msg: ApiMessages.DeletingEntitySuccess,
    };
  };
}

export default makeDeleteEntityController;
