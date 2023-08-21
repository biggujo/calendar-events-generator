import 'modern-normalize';
import 'picnic';
import '../sass/index.scss';

import {
  generateEvent,
  showBody,
  downloadFile,
  getUrlParams,
  renderResultInfo,
  getDownloadLinkByData,
} from './utils';
import { tzlib_get_ical_block } from 'timezones-ical-library';
import { Notify } from 'notiflix';

const PLAIN_TEXT = 'plain/text';

const urlParameters = getUrlParams();

showBody();
init();

function init() {
  if (isEmptyObj(urlParameters)) {
    Notify.failure('Parameters are empty');
    return;
  }

  const refs = {
    eventContainerRef: document.getElementById('event-info-container'),
    createIcsButton: document.getElementById('create-ics-button'),
    createGCalEventLink: document.getElementById('create-gcal-event-link'),
  };

  refs.createGCalEventLink.setAttribute('href',
    getDownloadLinkByData(urlParameters),
  );

  renderResultInfo({
    element: refs.eventContainerRef,
    data: {
      title: urlParameters.title,
      description: urlParameters.description,
      location: urlParameters.location,
      url: urlParameters.url,
    },
    startDate: urlParameters.startDate,
    endDate: urlParameters.endDate,
    shouldShowEmpty: false,
  });

  refs.createIcsButton.addEventListener('click', handleCreateIcsClick);

  async function handleCreateIcsClick() {
    try {
      let eventData = (await generateEvent(urlParameters));

      eventData = eventData.split('\r\n');

      eventData.splice(6, 0, tzlib_get_ical_block('Europe/Kyiv')[0]);

      eventData = eventData.join('\r\n');

      if (eventData.error) {
        throw new Error(eventData.error.message);
      }

      downloadFile({
        data: eventData,
        filename: 'test.ics',
        type: PLAIN_TEXT,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

// async function downloadICS() {
//   const eventData = await generateEvent({
//     title,
//     description,
//     location,
//     url,
//     start: startDateArray,
//     end: endDateArray,
//   });
//
//   downloadFile({
//     data: eventData,
//     filename: 'test.ics',
//     type: PLAIN_TEXT,
//   });
// }
