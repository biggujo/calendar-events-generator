import 'modern-normalize';
import 'picnic';
import '../sass/index.scss';

import { refs, applySettings } from './service';
import {
  showBody,
  createDatePicker,
  addFormValidation,
  createDownloadLink,
  resetResultInfo,
  renderResultInfo,
  setDownloadLinkValue,
} from './utils';
import { handleFormSubmit, handleResultUrlClick } from './handlers';
import { addHours, addMinutes, differenceInMinutes } from 'date-fns';

const MIN_EVT_DUR_IN_MINUTES = 30;

applySettings();
showBody();

addFormValidation(refs.form)
.onSuccess(() => {
  const formData = Object.fromEntries(new FormData(refs.form));

  const startDate = new Date(startDatePicker.selectedDates[0]);
  const endDate = new Date(endDatePicker.selectedDates[0]);

  const link = createDownloadLink({
    data: {
      ...formData,
    },
    startDate,
    endDate,
  });

  setDownloadLinkValue(link);
  renderResultInfo({
    element: refs.resultData,
    data: {
      ...formData,
    },
    startDate,
    endDate,
    shouldShowEmpty: true,
    isDebug: true,
  });

  refs.form.elements.result.removeAttribute('disabled');
})
.onFail(() => {
  resetResultInfo({
    element: refs.resultData,
  });
  setDownloadLinkValue('');

  refs.form.elements.result.setAttribute('disabled', 'true');
});

const { elements: formItems } = refs.form;

const currentDate = new Date();

// Create date pickers
const startDatePicker = createDatePicker({
  element: formItems.start,
  givenInitialDate: currentDate,
  onChange: handleOnStartDatePickerChange,
});

const endDatePicker = createDatePicker({
  element: formItems.end,
  givenInitialDate: addMinutes(currentDate, MIN_EVT_DUR_IN_MINUTES),
});

function handleOnStartDatePickerChange([startDate]) {
  const [endDate] = endDatePicker.selectedDates;

  if (differenceInMinutes(endDate, startDate) < MIN_EVT_DUR_IN_MINUTES) {
    endDatePicker.config.minDate = addMinutes(startDate,
      MIN_EVT_DUR_IN_MINUTES,
    );
    endDatePicker.setDate(addMinutes(startDate, MIN_EVT_DUR_IN_MINUTES));
  }
}

refs.form.addEventListener('submit', handleFormSubmit);
formItems.result.addEventListener('click', handleResultUrlClick);
