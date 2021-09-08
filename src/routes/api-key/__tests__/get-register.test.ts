import { apiRequest, connect, disconnect, dropDatabase } from '../../../../server-test-suite/utils';
import apiKeyRegisterValidator from '../../../../server-test-suite/validations/schemas/http-response/api-key/register';
import { MsgBodyErrorValidator } from '../../../../server-test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiMessages } from '../../../constants';

describe('Method GET /api-key/register should return a new API KEY', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 201 code response and a message', async () => {
    const response = await apiRequest.get('/api-key/register').send();
    const validated = await apiKeyRegisterValidator(response.body.payload);

    expect(response.status).toBe(201);
    expect(response.body.msg).toContain(ApiMessages.CreatingEntitySuccess);
    expect(validated).toBeDefined();
  });

  it('should return a 422 since query keys are not allowed', async () => {
    const response = await apiRequest.get('/api-key/register').query({ anyKey: 'anyValue' }).send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
