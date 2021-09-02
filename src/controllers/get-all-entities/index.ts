import { ApiMessages } from '../../constants';
import { HttpRequest } from '../../main/adapters/adapters.types';
import { MakeGetAllEntitiesDependencies } from './get-all-entities.types';

function makeGetAllEntitiesController<D, K>({
  findAll,
  requestValidator,
}: MakeGetAllEntitiesDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedQuery = await requestValidator(req);

    const result = await findAll(validatedQuery);

    return {
      status: 200,
      body: result.payload,
      msg: ApiMessages.FetchingEntitySuccess,
    };
  };
}

export default makeGetAllEntitiesController;
