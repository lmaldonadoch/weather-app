import './style.scss';
import 'bootstrap';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello';

  element.classList.add('test');

  return element;
}

document.body.appendChild(component());
