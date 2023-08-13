import '../sass/index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'modern-normalize';
import 'picnic';

import { showBody } from './service/showBody.js';
import { createDatePicker } from './service/date-picker.js';
import { getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns/fp';

showBody();

const refs = {
  form: document.getElementById('event-form'),
};

const { elements: formItems } = refs.form;

console.log(window.location);

// Create date pickers
const startDatePicker = createDatePicker(formItems.start);
const endDatePicker = createDatePicker(formItems.end);

refs.form.addEventListener('submit', handleFormSubmit);
formItems.result.addEventListener('click', handleResultUrlClick);

function handleResultUrlClick({ target }) {
  if (target.disabled) {
    return;
  }

  target.blur();

  navigator.clipboard.writeText(target.value)
  .then(() => console.log('Copied to clipboard!'))
  .catch(() => console.log('Error writing to clipboard!'));
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const { elements } = event.target;

  const { value: title } = elements.title;
  const { value: description } = elements.description;
  const { value: location } = elements.location;
  const { value: url } = elements.url;

  const startDateArray = createDateArray(new Date(startDatePicker.selectedDates[0]));
  const endDateArray = createDateArray(new Date(endDatePicker.selectedDates[0]));

  const urlParams = new URLSearchParams({
    title,
    description,
    location,
    url,
    start: startDateArray,
    end: endDateArray,
  });

  const {
    origin,
    pathname,
  } = window.location;

  let currentPath;
  if (pathname === '/') {
    currentPath = origin;
  } else {
    currentPath = `${origin}${pathname.replace('/index.html', '')}`;
  }

  const pathToGetPage = `${currentPath}/get.html`;

  enableResultInput();
  setResultValue(`${pathToGetPage}?${urlParams}`);

  function createDateArray(dateInstance) {
    return [
      getYear(dateInstance),
      getMonth(dateInstance) + 1,
      getDate(dateInstance),
      getHours(dateInstance),
      getMinutes(dateInstance),
    ];
  }

  function setResultValue(value) {
    refs.form.elements.result.value = value;
  }

  function enableResultInput() {
    refs.form.elements.result.removeAttribute('disabled');
  }
}
