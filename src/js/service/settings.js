import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

// import { setDefaultOptions } from 'date-fns';
// import { uk } from 'date-fns/locale';

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  import('flatpickr/dist/themes/dark.css');
}

export function applySettings() {
  flatpickr.localize(Ukrainian);
// setDefaultOptions({ locale: uk });
}
