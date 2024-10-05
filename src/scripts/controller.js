import view from './view.js';
import state from './model.js';
import validateURL from './validator.js';

function validateForm(event) {
  event.preventDefault();
  const url = view.input.value.trim();

  validateURL(url).then((result) => {
    if (!result.valid) {
      view.input.classList.add('is-invalid');
      view.feedback.classList.add('text-danger');
      view.feedback.textContent = result.message;
      return;
    }
    state.feeds.push(url); // делаем axios запрос и пушим в стек нужные данные
    view.input.value = '';
  });
}
view.form.addEventListener('submit', validateForm);

export default validateForm;
