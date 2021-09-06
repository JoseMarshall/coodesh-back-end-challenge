import { ApiMessages } from '../../constants';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { MakeCreateEntityDependencies } from './create-entity.types';

function makeCreateEntityController<D, K>({
  create,
  requestValidator,
}: MakeCreateEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);
    const result = await create(validatedReq);

    return {
      status: 201,
      body: result.payload,
      msg: ApiMessages.CreatingEntitySuccess,
    };
  };
}

export default makeCreateEntityController;
