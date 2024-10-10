const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

function renderValidation(path, value, i18nInstance) {
  if (path === 'isValid') {
    const isValidClass = value ? 'is-valid' : 'is-invalid';
    const feedbackClass = value ? 'text-success' : 'text-danger';

    input.classList.remove('is-valid', 'is-invalid');
    feedback.classList.remove('text-success', 'text-danger');

    input.classList.add(isValidClass);
    feedback.classList.add(feedbackClass);
  } else if (path === 'message') {
    feedback.textContent = i18nInstance.t(`feedback.${value}`);
  }
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

function renderRss(path, value, i18nInstance) {
  console.log('Текущий путь:', path);
  console.log('Значение:', value);
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');

  feedsContainer.innerHTML =
    '<div class="card-body"><h2 class="card-title h4">Фиды</h2></div><ul class="list-group border-0 rounded-0"></ul>';
  postsContainer.innerHTML =
    '<div class="card border-0"><div class="card-body"><h2 class="card-title h4">Посты</h2></div><ul class="list-group border-0 rounded-0"></ul></div>';

  const feedsList = feedsContainer.querySelector('ul');
  const postList = postsContainer.querySelector('ul');
  // console.log(feedsList);

  if (path === 'feeds') {
    value.forEach((feed) => {
      console.log(feed);
      console.log(feed.title);
      console.log(feed.description);
      const listElement = document.createElement('li');
      const feedHeader = document.createElement('h3');
      const feedParagraph = document.createElement('p');

      listElement.classList.add('list-group-item', 'border-0', 'border-end-0');
      feedHeader.classList.add('h6', 'm-0');
      feedHeader.textContent = feed.title;
      feedParagraph.classList.add('m-0', 'small', 'text-black-50');
      feedParagraph.textContent = feed.description;
      listElement.append(feedHeader, feedParagraph);
      feedsList.append(listElement);
    });
  }

  // const feedTitle = value.querySelector('channel').querySelector('title').textContent;
  // const feedDescription = data.querySelector('channel').querySelector('description').textContent;
  // const posts = data.querySelector('channel').querySelectorAll('item');
  // const postTitle = data
  //   .querySelector('channel')
  //   .querySelector('item')
  //   .querySelector('title').textContent;
  // const postLink = data.querySelector('channel').querySelector('item').querySelector('link').textContent;
}

export { renderValidation, renderLanguage, renderRss };
