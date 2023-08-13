import '../sass/index.scss';
import 'modern-normalize';
import 'picnic';

import { refs, applySettings } from './service';
import { showBody, createDatePicker, addFormValidation } from './utils';
import { handleFormSubmit, handleResultUrlClick } from './handlers';

applySettings();
showBody();

addFormValidation(refs.form);

const { elements: formItems } = refs.form;

// Create date pickers
const startDatePicker = createDatePicker(formItems.start);
const endDatePicker = createDatePicker(formItems.end);

refs.form.addEventListener('submit', handleFormSubmit({
  startDatePicker,
  endDatePicker,
}));
formItems.result.addEventListener('click', handleResultUrlClick);




