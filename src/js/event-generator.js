import 'ics';
import { createEvent } from 'ics';
// or, in ESM: import * as ics from 'ics'

const event = {
  start: [
    2023,
    8,
    12,
    17,
    46,
  ],
  duration: {
    hours: 6,
    minutes: 30,
  },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Google Meet',
  url: 'https://meet.google.com',
  alarms: [
    {
      action: 'display',
      description: 'Reminder',
      trigger: {
        hours: 0,
        minutes: 5,
        before: true,
      },
    },
  ],
  status: 'CONFIRMED',
  busyStatus: 'BUSY', // organizer: {
  //   name: 'Admin',
  //   email: 'Race@BolderBOULDER.com',
  // },
  // attendees: [
  //   {
  //     name: 'Adam Gibbons',
  //     email: 'adam@example.com',
  //     rsvp: true,
  //     partstat: 'ACCEPTED',
  //     role: 'REQ-PARTICIPANT',
  //   },
  //   {
  //     name: 'Brittany Seaton',
  //     email: 'brittany@example2.org',
  //     dir: 'https://linkedin.com/in/brittanyseaton',
  //     role: 'OPT-PARTICIPANT',
  //   },
  // ],
};

export function generateEvent() {
  return createEvent(
    event,
    (error, value) => error ? Promise.reject(error) : Promise.resolve(value),
  );
}

// async function handleDownload() {
//   const filename = 'ExampleEvent.ics';
//   const file = await new Promise((resolve, reject) => {
//     createEvent(event, (error, value) => {
//       if (error) {
//         reject(error);
//       }
//
//       resolve(new File([value], filename, { type: 'plain/text' }));
//     });
//   });
//   const url = URL.createObjectURL(file);
//
//   // trying to assign the file URL to a window could cause cross-site
//   // issues so this is a workaround using HTML5
//   // const anchor = document.createElement('a');
//   // anchor.href = url;
//   // anchor.download = filename;
//   //
//   // document.body.appendChild(anchor);
//   // anchor.click();
//   // document.body.removeChild(anchor);
//   //
//   // URL.revokeObjectURL(url);
// }
