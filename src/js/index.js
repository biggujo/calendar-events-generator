import '../sass/index.scss';
import 'modern-normalize';
import 'picnic';

import { refs, applySettings } from './service';
import { showBody, createDatePicker } from './utils';
import { handleFormSubmit, handleResultUrlClick } from './handlers';

applySettings();
showBody();

const { elements: formItems } = refs.form;

// Create date pickers
const startDatePicker = createDatePicker(formItems.start);
const endDatePicker = createDatePicker(formItems.end);

refs.form.addEventListener('submit', handleFormSubmit({
  startDatePicker,
  endDatePicker,
}));
formItems.result.addEventListener('click', handleResultUrlClick);




