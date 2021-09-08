import { apiRequest } from '../../../server-test-suite/utils';

describe('Method GET / should return a default message', () => {
  it('should return a 200 code response and a message', async () => {
    const response = await apiRequest.get('/').send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toContain('REST Back-end Challenge');
  });
});
