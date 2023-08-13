// Parse URL parameters to the object
export function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);

  const paramsObj = {};

  for (const [key, value] of urlParams.entries()) {
    if (key === 'start' || key === 'end') {
      paramsObj[key] = value.split(',').map(numAsString => parseInt(numAsString));
      continue;
    }

    paramsObj[key] = value;
  }

  return paramsObj;
}
