import cron from 'node-cron';

import { ApiMessages } from '../../constants';
import { makeUser } from '../../entities/user';
import { IUser, IUserInput } from '../../entities/user/user.types';
import { logger } from '../../utils/logger';
import uow from '../external/repositories/mongodb/unit-of-work';
import { getRequest } from './make-request';

const SECOND = process.env.CORN_SECOND ?? '00';
const MINUTE = process.env.CORN_MINUTE ?? '00';
const HOUR = process.env.CORN_HOUR ?? '00';

const importUsers = async () => {
  const userRepo = (await uow()).makeUserRepository();

  const importedUsers = (
    (await Promise.all(
      Array.from({ length: 4 }, (_, i) => i + 1).flatMap(page => [
        getRequest<{ results: IUserInput[] }>(
          `https://randomuser.me/api/1.3/?page=${page}&results=500&format=json`
        ).then(importedUser => importedUser.data.results.map(user => makeUser(user))),
      ])
    ).catch(e => logger.error(e, ApiMessages.InternalError))) as unknown as IUser[]
  ).flat();

  await userRepo.add(importedUsers);
};

// eslint-disable-next-line import/prefer-default-export
export const importUserTask = cron.schedule(`${SECOND} ${MINUTE} ${HOUR} * * *`, importUsers);
