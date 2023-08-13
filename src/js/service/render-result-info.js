import { formatDuration } from 'date-fns';
import {
  intervalToDuration, lightFormat,
} from 'date-fns/fp';

const dateFormat = 'dd.MM.yyyy';
const timeFormat = 'HH:mm';
const dateAndTimeFormat = `${dateFormat} ${timeFormat}`;

export function renderResultInfo({
  element,
  data: {
    title,
    description,
    location,
    url,
    start,
    end,
  },
}) {
  element.innerHTML = `
    <h4>Event info</h4>
    <p><b>Title:</b> ${title}</p>
    <p><b>Description:</b> ${description}</p>
    <p><b>Date and time:</b> ${formatDateAndTime(start, end)}</p>
    <p><b>Duration:</b> ${getDuration(start, end)}</p>
    <p><b>Location:</b> ${location || '~none~'}</p>
    <p><b>URL:</b> ${url || '~none~'}</p>
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
