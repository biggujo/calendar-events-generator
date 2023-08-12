import './sass/index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'modern-normalize';
import 'picnic';

import { generateEvent } from './js/event-generator.js';
import { downloadFile } from './js/file-downloader.js';

import flatpickr from 'flatpickr';
import { showBody } from './js/showBody.js';

const PLAIN_TEXT = 'plain/text';

showBody();

const refs = {
  form: document.getElementById('event-form'),
};

// refs.form.elements.refs.form.addEventListener('click', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  console.log(event.currentTarget.elements);
}

init();

async function init() {
  const eventData = await generateEvent();
  console.log(eventData);
  // downloadFile({
  //   data: eventData,
  //   filename: '123.ics',
  //   type: PLAIN_TEXT,
  // });
}

console.log(window.location);
