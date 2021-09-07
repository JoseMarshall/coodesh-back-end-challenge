import { makeMsgBody } from '../express-route-adapter';

const makeSut = () => ({
  sut: makeMsgBody,
});

describe(makeMsgBody.name, () => {
  it('should get an object with msg and payload keys', async () => {
    const { sut } = makeSut();
    const msg = 'success';
    const payload = { anyField1: 'anyValue1', anyField2: 'anyValue2' };

    const result = sut(msg, payload);

    expect(result).toEqual({
      msg: 'success',
      payload: { anyField1: 'anyValue1', anyField2: 'anyValue2' },
    });
  });
});
