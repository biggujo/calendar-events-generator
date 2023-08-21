import '../sass/index.scss';
import 'modern-normalize';
import 'picnic';

import {
  generateEvent, showBody, downloadFile, getUrlParams, renderResultInfo,
} from './utils';

const PLAIN_TEXT = 'plain/text';

const urlParameters = getUrlParams();

showBody();
init();

function init() {
  if (isEmptyObj(urlParameters)) {
    console.log('Parameters are empty');
    return;
  }

  const refs = {
    createIcsButton: document.getElementById('create-ics-button'),
    eventContainerRef: document.getElementById('event-info-container'),
  };

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
      const eventData = (await generateEvent(urlParameters));

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
