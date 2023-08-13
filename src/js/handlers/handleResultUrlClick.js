export function handleResultUrlClick({ target }) {
  copyToClipboard(target);
}

function copyToClipboard(targetEl) {
  if (targetEl.disabled) {
    return;
  }

  targetEl.blur();

  navigator.clipboard.writeText(targetEl.value)
  .then(() => console.log('Copied to clipboard!'))
  .catch(() => console.log('Error writing to clipboard!'));
}
