export function toggleError(elements) {
  const errMessages = document.querySelectorAll('#error');
  let isError = false;
  // Show error message
  elements.forEach((el) => {
    let elId = el.getAttribute('id');
    let span = el.nextElementSibling.nextElementSibling;
    if(elId === 'como-llegar') span = el.nextElementSibling.nextElementSibling.nextElementSibling;
    if(isEmpty(el.value)) {
      span.classList.toggle('hidden');
      isError = true;
    }
  })
  return isError;
}

export function isEmpty(str) {
  return (!str || 0 === str.length);
}
