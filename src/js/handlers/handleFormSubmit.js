import { renderResultInfo } from '../utils/render-result-info.js';
import { getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns/fp';
import { refs } from '../service/refs.js';

export function handleFormSubmit({
  startDatePicker,
  endDatePicker,
}) {
  return function handleFormSubmit(event) {
    event.preventDefault();

    const { elements } = event.target;

    const { value: title } = elements.title;
    const { value: description } = elements.description;
    const { value: location } = elements.location;
    const { value: url } = elements.url;

    const startDate = new Date(startDatePicker.selectedDates[0]);
    const endDate = new Date(endDatePicker.selectedDates[0]);

    const startDateArray = createDateArray(startDate);
    const endDateArray = createDateArray(endDate);

    const urlParams = new URLSearchParams({
      title,
      description,
      location,
      url,
      start: startDateArray,
      end: endDateArray,
    });

    renderResultInfo({
      element: refs.resultData,
      data: {
        title,
        description,
        location,
        url,
        start: startDate,
        end: endDate,
      },
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
  };

  return handleFormSubmit;
}


