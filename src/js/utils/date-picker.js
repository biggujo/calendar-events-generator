import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { roundToNearestMinutes } from 'date-fns';

export const createDatePicker = (element, onChange) => {
  const currentDate = getMinDate();
  return flatpickr(element, {
    dateFormat: 'd.m.Y о H:i',
    defaultDate: currentDate,
    minDate: currentDate,
    enableTime: true,
    minuteIncrement: 15,
    time_24hr: true,
    monthSelectorType: 'static',
    onChange,
  });
};

function getMinDate() {
  return roundToNearestMinutes(new Date(), {
    nearestTo: 30,
    roundingMethod: 'ceil',
  });
}
