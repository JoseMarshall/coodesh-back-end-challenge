import { Express } from 'express';

import { adaptExpressRoute, invalidRouteHandler } from '../adapters/express-route-adapter';

const handleInvalidRoute = (app: Express) => {
  app.all('*', [], adaptExpressRoute(invalidRouteHandler()));
};

export default handleInvalidRoute;
