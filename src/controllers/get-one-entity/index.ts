import { ApiMessages } from '../../constants';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { MakeGetOneEntityDependencies } from './get-one-entity.types';

function makeGetOneEntityController<D, K>({
  findOne,
  requestValidator,
}: MakeGetOneEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedQuery = await requestValidator(req);
    const result = await findOne(validatedQuery);

    return {
      status: 200,
      body: result.payload,
      msg: ApiMessages.FetchingEntitySuccess,
    };
  };
}

export default makeGetOneEntityController;
