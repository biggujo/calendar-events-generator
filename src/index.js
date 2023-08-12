import './sass/index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'modern-normalize';
import 'picnic';

import { generateEvent } from './js/event-generator.js';
import { downloadFile } from './js/file-downloader.js';

const PLAIN_TEXT = 'plain/text';

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
