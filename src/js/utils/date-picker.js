import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { roundToNearestMinutes } from 'date-fns';

export const createDatePicker = ({
  element,
  givenInitialDate = new Date(),
  onChange,
}) => {
  const initialDate = getMinDate(givenInitialDate);
  return flatpickr(element, {
    dateFormat: 'd.m.Y о H:i',
    defaultDate: initialDate,
    minDate: initialDate,
    enableTime: true,
    minuteIncrement: 15,
    time_24hr: true,
    monthSelectorType: 'static',
    onChange,
  });
};

export function getMinDate(date) {
  return roundToNearestMinutes(date, {
    nearestTo: 30,
    roundingMethod: 'ceil',
  });
}
