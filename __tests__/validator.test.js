import validateURL from '../src/scripts/validator.js';
import state from '../src/scripts/model.js';

jest.mock('../src/scripts/model.js', () => ({
  feeds: [],
  posts: [],
}));

describe('validateURL testing', () => {
  const url = 'http://ya.ru';

  it('should validate successfully', async () => {
    const result = await validateURL('http://ya.ru');

    expect(result.valid).toBeTruthy();
  });

  it('should return invalid with incorrect url', async () => {
    const result = await validateURL('http://justrandomstirng');

    expect(result.valid).toBeFalsy();
    expect(result.message).toBe('Некорректная ссылка');
  });

  it('should return invalid with duplicate message', async () => {
    state.feeds.push(url);
    const result = await validateURL(url);

    expect(result.valid).toBeFalsy();
    expect(result.message).toBe('Этот RSS уже был добавлен');
  });
});
