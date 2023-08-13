import '../sass/index.scss';
import 'modern-normalize';
import 'picnic';

import { showBody } from './service/showBody.js';
import { generateEvent } from './service/event-generator.js';
import { downloadFile } from './service/file-downloader.js';
import { getUrlParams } from './service/url-params-service.js';
import { createEvent } from 'ics';

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
  };

  refs.createIcsButton.addEventListener('click', handleCreateIcsClick);

  async function handleCreateIcsClick() {
    try {
      const eventData = (await createEvent(urlParameters));

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
