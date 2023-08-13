import { formatDuration } from 'date-fns';
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  intervalToDuration,
  lightFormat,
} from 'date-fns/fp';
import { refs } from '../service';

const dateFormat = 'dd.MM.yyyy';
const timeFormat = 'HH:mm';
const dateAndTimeFormat = `${dateFormat} ${timeFormat}`;

export function createDownloadLink({
  data: {
    title,
    description,
    location,
    url,
  },
  startDate,
  endDate,
}) {
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

  return `${pathToGetPage}?${urlParams}`;

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

export function setDownloadLinkValue(value) {
  refs.form.elements.result.value = value;
}

export function resetResultInfo({ element }) {
  console.dir(element);
  element.innerHTML = `
    <h4>Event info</h4>
    <p><b>Title:</b></p>
    <p><b>Description:</b></p>
    <p><b>Date and time:</b></p>
    <p><b>Duration:</b></p>
    <p><b>Location:</b></p>
    <p><b>URL:</b></p>
  `;
}

export function renderResultInfo({
  element,
  data: {
    title,
    description,
    location,
    url,
  },
  startDate,
  endDate,
}) {
  console.log(url);
  console.log(element);
  element.innerHTML = `
    <h4>Event info</h4>
    <p><b>Title:</b> ${title}</p>
    <p><b>Description:</b> ${description}</p>
    <p><b>Date and time:</b> ${formatDateAndTime(startDate, endDate)}</p>
    <p><b>Duration:</b> ${getDuration(startDate, endDate)}</p>
    <p><b>Location:</b> ${location || '~none~'}</p>
    <p><b>URL:</b> ${url && `<a href='${url}'>${url}</a> (<span style='color: rgb(184, 17, 17)'>Please, test the link</span>)` || '~none~'}</p>
  `;

  function getDuration(start, end) {
    return formatDuration(intervalToDuration({
      start,
      end,
    }), {
      format: [
        'days',
        'hours',
        'minutes',
      ],
    });
  }

  function formatDateAndTime(start, end) {
    if (lightFormat(dateFormat, start) === lightFormat(dateFormat, end)) {
      return `${lightFormat(dateAndTimeFormat, start)} to ${lightFormat(timeFormat,
        end,
      )}`;
    }

    return `${lightFormat(dateAndTimeFormat, start)} to ${lightFormat(dateAndTimeFormat,
      end,
    )}`;
  }
}
