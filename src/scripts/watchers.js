const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

function renderValidation(path, value, i18nInstance) {
  if (path === 'isValid') {
    if (value) {
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      input.classList.add('is-valid');
      feedback.classList.add('text-success');
    } else {
      input.classList.remove('is-valid');
      feedback.classList.remove('text-success');
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
    }
  }
  feedback.textContent = i18nInstance.t(`feedback.${value}`);
}

function renderLanguage(i18nInstance) {
  const header = document.querySelector('.main__header');
  const description = document.querySelector('.main__description');
  const label = document.querySelector('label');
  const button = document.querySelector('button');

  header.textContent = i18nInstance.t('header');
  description.textContent = i18nInstance.t('description');
  label.textContent = i18nInstance.t('label');
  button.textContent = i18nInstance.t('button');
}

export { renderValidation, renderLanguage };
