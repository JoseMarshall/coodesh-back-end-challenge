import collections from '../../../server-test-suite/entities-collections';
import userValidator from '../../../server-test-suite/validations/schemas/http-response/user/get-one-user';
import { makeUser } from './index';

describe(`${makeUser.name} Entity`, () => {
  it('should receive a built User with the sent data', async () => {
    const data = collections.users[0];
    const validated = await userValidator(makeUser(data as any));
    expect(validated).toBeDefined();
  });
});
