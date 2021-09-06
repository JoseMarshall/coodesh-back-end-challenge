import { Router } from 'express';

import registerApiKeyController from '../../factories/api-key/register';
import { adaptExpressRoute } from '../../main/adapters/express-route-adapter';

export default (router: Router) => {
  router.get('/register', adaptExpressRoute(registerApiKeyController));

  return router;
};
