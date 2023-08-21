import { parseStringDate } from './result-service.js';
import { lightFormat } from 'date-fns';

const BASE_URL = 'https://calendar.google.com/calendar/render';

// Date:

export function getDownloadLinkByData({
  title,
  description,
  location,
  url,
  startDate,
  endDate,
}) {
  const start = parseStringDate(startDate);
  const startDateFormatted = `${lightFormat(start, 'yyyyMMdd')}T${lightFormat(start,
    'HHmmss',
  )}`;

  const end = parseStringDate(endDate);
  const endDateFormatted = `${lightFormat(end, 'yyyyMMdd')}T${lightFormat(end,
    'HHmmss',
  )}`;

  const urlParameters = new URLSearchParams({
    action: 'TEMPLATE', // do not touch
    text: title,
    details: `${description && (`${description}\n\n`)}${url && (`URL: ${url}`)}`,
    location: location,
    crm: 'BUSY', // if Free, Busy, or Out of Office respectively.
    ctz: 'Europe/Kyiv', // timezone
    dates: `${startDateFormatted}/${endDateFormatted}`, // YYYYMMDDTHHmmSSZ/YYYYMMDDTHHmmSSZ
  });

  return `${BASE_URL}?${urlParameters}`;
}
