import onChange from 'on-change';

import state from './model.js';

const view = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  feedback: document.querySelector('.feedback'),
  watchedValidation: onChange(state.uiState.validate, renderValidation),
};

function renderValidation(path, value) {
  console.log(typeof path);
  if (path === 'valid') {
    if (value) {
      view.input.classList.remove('is-invalid');
      view.feedback.classList.remove('text-danger');
      view.input.classList.add('is-valid');
      view.feedback.classList.add('text-success');
    } else {
      view.input.classList.remove('is-valid');
      view.feedback.classList.remove('text-success');
      view.input.classList.add('is-invalid');
      view.feedback.classList.add('text-danger');
    }
  }
  view.feedback.textContent = value;
}

export default view;
