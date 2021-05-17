export function toggleError(elements) {
  const errMessages = document.querySelectorAll('#error');
  let isError = false;
  // Show error message
  elements.forEach((el) => {
    let elId = el.getAttribute('id');
    let span = el.nextElementSibling.nextElementSibling;
    if(elId === 'como-llegar') span = el.nextElementSibling.nextElementSibling.nextElementSibling;
    if(isEmpty(el.value)) {
      console.log(span);
      span.classList.toggle('hidden');
      isError = true;
    }
  })
/*
  // Highlight input and label with red
  const allBorders = document.querySelectorAll('.border-gray-200');
  const allTexts = document.querySelectorAll('.text-gray-500');
  allBorders.forEach((el) => {
    el.classList.toggle('border-red-600');
  })
  allTexts.forEach((el) => {
    el.classList.toggle('text-red-600');
  })*/
  return isError;
}

export function isEmpty(str) {
  return (!str || 0 === str.length);
}
