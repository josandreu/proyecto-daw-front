export function getViewportWidth() {
  if(window.innerWidth) {
    return window.innerWidth;
  } else if(document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}

export function addClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for(i = 0; i < arr2.length; i++) {
    if(arr1.indexOf(arr2[i]) === -1) {
      element.className += " " + arr2[i];
    }
  }
}

export function removeClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for(i = 0; i < arr2.length; i++) {
    while(arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

export function addStarsToList(index, rating) {
  for(let i = 0; i < parseInt(rating); i++) {
    document.querySelector(`#alojamiento-rating-${index} #star-${i}`).classList.remove('text-gray-400');
    document.querySelector(`#alojamiento-rating-${index} #star-${i}`).classList.add('text-yellow-500');
  }
}

export function addStarsToInfoWindow(index, rating) {
  for(let i = 0; i < parseInt(rating); i++) {
    if(document.querySelector(`.alojamiento-rating-info-${index} #star-${i}`)) {
      document.querySelector(`.alojamiento-rating-info-${index} #star-${i}`).classList.remove('text-gray-400');
      document.querySelector(`.alojamiento-rating-info-${index} #star-${i}`).classList.add('text-yellow-500');
    }
  }
}
