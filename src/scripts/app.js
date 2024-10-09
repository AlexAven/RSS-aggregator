/* eslint-disable no-use-before-define */
import * as yup from 'yup';
import { setLocale } from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';

import resources from '../locales/languages.js';
import { renderValidation, renderLanguage } from './watchers.js';

export default () => {
  const defaultLanguage = 'ru';
  const i18nInstance = i18next.createInstance();
  i18nInstance
    .init({
      lng: defaultLanguage,
      debug: true,
      resources,
    })
    .then(() => {
      renderLanguage(i18nInstance);
    });

  const state = {
    feeds: [],
    posts: [],
    uiState: {
      language: defaultLanguage,
      validate: {
        isValid: null,
        message: null,
      },
    },
  };

  const watchedValidation = onChange(state.uiState.validate, (path, value) =>
    renderValidation(path, value, i18nInstance),
  );
  // const watchedLanguage = onChange(state.uiState, renderLanguage);
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  const validateURL = (url) => {
    const customMessages = {
      mixed: {
        notOneOf: 'rssAlreadyAdded',
      },
      string: {
        url: 'invalidUrl',
      },
    };
    setLocale(customMessages);
    const formSchema = yup.string().url().notOneOf(state.feeds);

    return formSchema
      .validate(url)
      .then(() => {
        getFeedData(url);
      })
      .then(() => ({ isValid: true }))
      .catch((error) => {
        console.log(error.message);
        watchedValidation.isValid = false;
        watchedValidation.message = error.message;

        return { isValid: false };
      });
  };

  function rssParce(xmlData) {
    const parser = new DOMParser();
    const data = parser.parseFromString(xmlData, 'text/xml');
    console.log('Внутри парсера - ок');

    return data;
  }

  function getFeedData(url) {
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`).then((response) => {
      try {
        const data = rssParce(response.data.contents);
        watchedValidation.isValid = true;
        watchedValidation.message = 'success';
        console.log('Распарсенные данные', data);
      } catch {
        watchedValidation.isValid = false;
        watchedValidation.message = 'invalidUrl';
        console.log('Распарсить не удалось');
      }
    });
  }

  function validateForm(event) {
    event.preventDefault();
    const url = input.value.trim();

    validateURL(url).then((result) => {
      if (result.isValid) {
        state.feeds.push(url);
      }
    });
  }
  form.addEventListener('submit', validateForm);
};
