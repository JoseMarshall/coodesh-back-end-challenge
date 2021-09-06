import { Router } from 'express';

import deleteOneUserController from '../../factories/user/delete-one-user';
import getAllUsersController from '../../factories/user/get-all-users';
import getOneUserController from '../../factories/user/get-one-user';
import updateUserController from '../../factories/user/update-user';
import { adaptExpressRoute } from '../../main/adapters/express-route-adapter';
import { validateApiKey } from '../../main/middleware/api-key-checker';

export default (router: Router) => {
  router.get('/:_id', validateApiKey, adaptExpressRoute(getOneUserController));
  router.get('/', validateApiKey, adaptExpressRoute(getAllUsersController));
  router.put('/:_id', validateApiKey, adaptExpressRoute(updateUserController));
  router.delete('/:_id', validateApiKey, adaptExpressRoute(deleteOneUserController));

  return router;
};
