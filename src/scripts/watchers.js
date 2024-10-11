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

function renderRss(path, value, prevValue, i18nInstance) {
  console.log('Текущий путь:', path);
  console.log('Предыдущее Значение:', prevValue);
  console.log('Значение:', value);
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');

  if (path === 'feeds' && value.length < 2) {
    console.log('Рендер шапки');
    feedsContainer.innerHTML = `<div class="card-body"><h2 class="card-title h4 fw-bold">${i18nInstance.t('rss.feeds')}</h2></div><ul class="list-group border-0 rounded-0"></ul>`;
    postsContainer.innerHTML = `<div class="card border-0"><div class="card-body"><h2 class="card-title h4 fw-bold">${i18nInstance.t('rss.posts')}</h2></div><ul class="list-group border-0 rounded-0"></ul></div>`;
  }

  const feedsList = feedsContainer.querySelector('ul');
  const postList = postsContainer.querySelector('ul');

  if (path === 'feeds') {
    // feedsList.innerHTML = '';
    const feedsToRender = value.filter((feed) => !prevValue.includes(feed));
    console.log('feedsToRender', feedsToRender);
    // value.forEach((feed) => {
    feedsToRender.forEach((feed) => {
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

  if (path === 'posts') {
    // postList.innerHTML = '';
    const postsToRender = value.filter((feed) => !prevValue.includes(feed));
    console.log('postsToRender', postsToRender);
    // value.forEach((post) => {
    postsToRender.forEach((post) => {
      const listElement = document.createElement('li');
      const postName = document.createElement('a');
      const btn = document.createElement('button');

      listElement.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      );
      postName.classList.add('fw-bold');
      postName.setAttribute('data-id', post.feedId);
      postName.setAttribute('target', '_blank');
      postName.setAttribute('rel', 'noopener noreferrer');
      postName.href = post.postLink;
      postName.textContent = post.postTitle;
      btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      btn.setAttribute('data-id', post.feedId);
      btn.setAttribute('data-bs-toggle', 'modal');
      btn.setAttribute('data-bs-target', '#modal');
      btn.textContent = i18nInstance.t('rss.linkBtn');
      listElement.append(postName, btn);
      postList.append(listElement);
    });
  }
}

export { renderValidation, renderLanguage, renderRss };
