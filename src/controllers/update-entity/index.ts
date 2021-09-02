import { ApiMessages } from '../../constants';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { MakeUpdateEntityDependencies } from './update-entity.types';

function makeUpdateEntityController<D, K>({
  update,
  requestValidator,
}: MakeUpdateEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);
    const result = await update(validatedReq);

    return {
      status: 201,
      body: result.payload,
      msg: ApiMessages.UpdatingEntitySuccess,
    };
  };
}

export default makeUpdateEntityController;
