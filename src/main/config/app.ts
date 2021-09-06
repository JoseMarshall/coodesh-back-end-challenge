import express from 'express';

import { importUserTask } from '../services/user-corn';
import setupMiddleware from './middleware';
import setupRoutes from './routes';
import setUpSwagger from './swagger';

const app = express();
setUpSwagger(app);
setupMiddleware(app);
setupRoutes(app);

importUserTask.start();

export default app;
