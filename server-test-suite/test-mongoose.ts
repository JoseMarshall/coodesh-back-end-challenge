import mongoose, { Mongoose } from 'mongoose';

let client: Mongoose | undefined;

// eslint-disable-next-line import/prefer-default-export
export const TestMongoose = {
  connect: async (): Promise<void> => {
    client = await mongoose.connect(process.env.MONGO_URL!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  },
  disconnect: async (): Promise<void> => {
    if (client) {
      await client?.disconnect();
      client = undefined;
    }
  },
  dropDatabase: async (): Promise<void> => {
    await client?.connection?.dropDatabase();
  },
};
