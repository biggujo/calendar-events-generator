import { Notify } from 'notiflix';

export function handleResultUrlClick({ target }) {
  copyToClipboard(target);
}

function copyToClipboard(targetEl) {
  if (targetEl.disabled) {
    return;
  }

  targetEl.blur();

  navigator.clipboard.writeText(targetEl.value)
  .then(() => Notify.success('Copied to clipboard!'))
  .catch(() => Notify.failure('Error writing to clipboard!'));
}
