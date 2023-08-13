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

applySettings();
showBody();

addFormValidation(refs.form)
.onSuccess(() => {
  const formData = Object.fromEntries(new FormData(refs.form));

  console.log(formData);

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

// Create date pickers
const startDatePicker = createDatePicker(formItems.start);
const endDatePicker = createDatePicker(formItems.end);

refs.form.addEventListener('submit', handleFormSubmit);
formItems.result.addEventListener('click', handleResultUrlClick);
