import { IUnitOfWork } from '../repository.types';
import ApiKeyRepository from './api-key-repository';
import BaseRepository from './base-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { UserModel } from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    transaction: null,
    makeUserRepository() {
      return BaseRepository(UserModel, this.transaction);
    },
    makeApiKeyRepository() {
      return ApiKeyRepository(this.transaction);
    },
    async commitChanges() {
      await this.transaction.commitTransaction();
      this.transaction.endSession();
    },
    async rollback() {
      await this.transaction.abortTransaction();
      this.transaction.endSession();
    },
    async startTransaction() {
      this.transaction = await MongoHelper.getInstance().startSession();
      this.transaction.startTransaction();
    },
  };
  return uow;
}

export default UnitOfWork;
