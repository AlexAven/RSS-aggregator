import testing from '../src/index.js';

describe('testing test', () => {
  it('testiiiing', () => {
    const expectedRes = 'ooo';
    const reuslt = testing('OOO');

    expect(reuslt).toBe(expectedRes);
  });
});
