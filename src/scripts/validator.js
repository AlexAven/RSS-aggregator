import * as yup from 'yup';
import state from './model.js';

import view from './view.js';

const formSchema = yup
  .string()
  .url('Некорректная ссылка')
  .test('is-duplicate', 'Этот RSS уже был добавлен', (value) => !state.feeds.includes(value)); // переделать проверку
// .notOneOf(state.feeds, 'Этот RSS уже был добавлен'); // почему не работает?

const validateURL = (url) =>
  formSchema
    .validate(url)
    .then(() => {
      view.watchedValidation.valid = true;
      view.watchedValidation.message = 'корректно';

      // return { valid: true, message: '' };
    })
    .catch((error) => {
      view.watchedValidation.valid = false;
      view.watchedValidation.message = error.message;

      // return { valid: false, message: error.message };
    });

export default validateURL;
