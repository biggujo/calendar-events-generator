import JustValidate from 'just-validate';

export function addFormValidation(formEl) {
  return new JustValidate(formEl)
  .addField('#title', [
    {
      rule: 'required',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 90,
    },
  ])
  .addField('#location', [
    {
      rule: 'minLength',
      value: 2,
    },
    {
      rule: 'maxLength',
      value: 90,
    },
  ])
  .addField('#url', [
    {
      rule: 'minLength',
      value: 2,
    },
    {
      rule: 'maxLength',
      value: 90,
    },
    {
      rule: 'customRegexp',
      value: /(http|ftp|https):\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g, /* https://regexr.com/36fcc */
    },
  ]);
}
