import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  import('flatpickr/dist/themes/dark.css');
}

export const createDatePicker = (element) => {
  const currentDate = Date.now();
  console.log(new Date().getHours() + 1);
  return flatpickr(element, {
    dateFormat: 'd.m.Y о H:i',
    enableTime: true,
    time_24hr: true,
    minDate: currentDate,
    defaultDate: currentDate,
    monthSelectorType: 'static',
  });
};
