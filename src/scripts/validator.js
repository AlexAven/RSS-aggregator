import * as yup from 'yup';
import state from './model.js';

const formSchema = yup
  .string()
  .url('Некорректная ссылка')
  .test('is-duplicate', 'Этот RSS уже был добавлен', (value) => !state.feeds.includes(value)); // переделать проверку
// .notOneOf(state.feeds, 'Этот RSS уже был добавлен'); // почему не работает?

const validateURL = (url) =>
  formSchema
    .validate(url)
    .then(() => ({ valid: true, message: '' }))
    .catch((error) => ({ valid: false, message: error.message }));

export default validateURL;
