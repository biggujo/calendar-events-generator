import { createEvent } from 'ics';
import { getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns/fp';

export async function generateEvent({
  title,
  description,
  location,
  url,
  startDate,
  endDate,
}) {
  const start = startDate.split(',').map((num) => Number(num));
  const end = endDate.split(',').map((num) => Number(num));

  const event = {
    start,
    end,
    title,
    description,
    location,
    url: url || undefined, // alarms: [
    //   {
    //     action: 'display',
    //     description: 'Reminder',
    //     trigger: {
    //       hours: 0,
    //       minutes: 5,
    //       before: true,
    //     },
    //   },
    // ],
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
