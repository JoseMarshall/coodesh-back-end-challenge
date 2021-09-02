import express from 'express';

import { importUserTask } from '../services/user-corn';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

const app = express();
setupMiddleware(app);
setupRoutes(app);
importUserTask.start();

export default app;
