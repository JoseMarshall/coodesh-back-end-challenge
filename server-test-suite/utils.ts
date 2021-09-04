/* eslint-disable import/no-extraneous-dependencies */
import { Model } from 'mongoose';
import request from 'supertest';

import { CollectionNames } from '../src/constants';
import app from '../src/main/config/app';
import entitiesCollections from './entities-collections';
import { TestMongoose } from './test-mongoose';

export const makeSutRequest = async (sut: (...param: any) => Promise<any>, ...args: any) =>
  (await sut(...args)) as any;

export async function collectionInit(model: Model<any>, collectionName: `${CollectionNames}`) {
  await model.deleteMany({}).lean();
  // eslint-disable-next-line no-restricted-syntax
  for (const element of entitiesCollections[collectionName]) {
    // eslint-disable-next-line no-await-in-loop
    await model.create(element);
  }
}

export const { connect, disconnect, dropDatabase } = TestMongoose;

export const apiRequest = request(app);
