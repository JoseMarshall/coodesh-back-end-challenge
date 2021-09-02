import { json } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const bodyParser = json({ limit: '500kb' });
