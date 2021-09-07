import { Request, Response } from 'express';

import { adaptExpressRoute } from '../express-route-adapter';

const makeController = () =>
  jest.fn().mockResolvedValue({ status: 200, body: { key: 'value' }, msg: 'success' });

const makeSut = ({ controller = makeController(), req = {} as Request }) => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });

  return {
    sut: adaptExpressRoute(controller)(req, {
      status,
    } as unknown as Response),
    controller,
    status,
    json,
  };
};

describe(adaptExpressRoute.name, () => {
  it('call the controller with correct data', async () => {
    const req = { data: 'data' } as unknown as Request;
    const { controller, status, sut } = makeSut({
      req,
    });
    await sut;
    expect(controller).toHaveBeenCalledWith(req, { status });
  });

  it('calls status and json with the right values', async () => {
    const req = {} as unknown as Request;
    const { status, json, sut } = makeSut({
      req,
    });
    await sut;
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toBeCalledWith({ msg: 'success', payload: { key: 'value' } });
  });
});
