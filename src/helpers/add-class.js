'use strict';

export default function addClass ({ element, className }) {
  return element.classList
    ? element.classList.add(className)
    : (element.className += ' ' + className);
}
