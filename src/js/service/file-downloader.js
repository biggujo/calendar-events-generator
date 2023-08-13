export function downloadFile({
  data,
  filename,
  type,
}) {
  const file = new File([data], filename, { type });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
