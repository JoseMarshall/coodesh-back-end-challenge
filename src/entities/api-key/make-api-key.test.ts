import apiKeyValidator from '../../../server-test-suite/validations/schemas/http-response/api-key/register';
import { makeApiKey } from './index';

describe(`${makeApiKey.name} Entity`, () => {
  it('should receive a built API KEY with the sent host', async () => {
    const host = '192.168.1.1:8080';
    const validated = await apiKeyValidator(makeApiKey(host));
    expect(validated).toBeDefined();
  });

  it('should receive an error due to undefined host', async () => {
    try {
      throw await apiKeyValidator(makeApiKey(undefined));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
