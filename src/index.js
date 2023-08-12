import './sass/index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'modern-normalize';
import 'picnic';

import { generateEvent } from './js/event-generator.js';
import { downloadFile } from './js/file-downloader.js';

import { showBody } from './js/showBody.js';
import { createDatePicker } from './js/date-picker.js';
import { getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns/fp';

const PLAIN_TEXT = 'plain/text';

showBody();

const refs = {
  form: document.getElementById('event-form'),
};

const { elements: formItems } = refs.form;

// console.log(formItems);

const startDatePicker = createDatePicker(formItems.start);
const endDatePicker = createDatePicker(formItems.end);

refs.form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const { elements } = event.target;

  const { value: title } = elements.title;
  const { value: description } = elements.description;
  const { value: location } = elements.location;
  const { value: url } = elements.url;

  const startDateArray = createDateArray(new Date(startDatePicker.selectedDates[0]));
  const endDateArray = createDateArray(new Date(endDatePicker.selectedDates[0]));

  // console.log(title);
  // console.log(description);
  // console.log(location);
  // console.log(url);
  // console.log(startDateArray);
  // console.log(endDateArray);

  const eventData = await generateEvent({
    title,
    description,
    location,
    url,
    start: startDateArray,
    end: endDateArray,
  });

  downloadFile({
    data: eventData,
    filename: 'test.ics',
    type: PLAIN_TEXT,
  });

  function createDateArray(dateInstance) {
    return [
      getYear(dateInstance),
      getMonth(dateInstance) + 1,
      getDate(dateInstance),
      getHours(dateInstance),
      getMinutes(dateInstance),
    ];
  }
}

// init();

async function init() {
  const eventData = await generateEvent();
  console.log(eventData);
  // downloadFile({
  //   data: eventData,
  //   filename: '123.ics',
  //   type: PLAIN_TEXT,
  // });
}

// console.log(window.location);
