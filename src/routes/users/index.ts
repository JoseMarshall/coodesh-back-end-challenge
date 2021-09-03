import { Router } from 'express';

import deleteOneUserController from '../../factories/user/delete-one-user';
import getAllUsersController from '../../factories/user/get-all-users';
import getOneUserController from '../../factories/user/get-one-user';
import updateUserController from '../../factories/user/update-user';
import { adaptExpressRoute } from '../../main/adapters/express-route-adapter';

export default (router: Router) => {
  router.get('/:_id', adaptExpressRoute(getOneUserController));
  router.get('/', adaptExpressRoute(getAllUsersController));
  router.put('/:_id', adaptExpressRoute(updateUserController));
  router.delete('/:_id', adaptExpressRoute(deleteOneUserController));

  return router;
};
