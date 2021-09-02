import { Router } from 'express';

import getAllUsersController from '../../factories/user/get-all-users';
import { adaptExpressRoute } from '../../main/adapters/express-route-adapter';

export default (router: Router) => {
  router.get('/', adaptExpressRoute(getAllUsersController));

  return router;
};
