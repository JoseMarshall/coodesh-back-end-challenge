import { apiRequest } from '../../../server-test-suite/utils';
import { ApiMessages } from '../../constants';

describe('Any HTTP request to an unknown route, should return 404', () => {
  it(`should return a 404 and ${ApiMessages.RouteNotFound} message - GET`, async () => {
    const response = await apiRequest.get('/i-dont-exist').send();
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.RouteNotFound);
  });

  it(`should return a 404 and ${ApiMessages.RouteNotFound} message - POST`, async () => {
    const response = await apiRequest.post('/i-dont-exist').send({});
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.RouteNotFound);
  });

  it(`should return a 404 and ${ApiMessages.RouteNotFound} message - PUT`, async () => {
    const response = await apiRequest.put('/i-dont-exist').send({});
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.RouteNotFound);
  });

  it(`should return a 404 and ${ApiMessages.RouteNotFound} message - DELETE`, async () => {
    const response = await apiRequest.delete('/i-dont-exist').send();
    expect(response.status).toBe(404);
    expect(response.body.msg).toContain(ApiMessages.RouteNotFound);
  });
});
