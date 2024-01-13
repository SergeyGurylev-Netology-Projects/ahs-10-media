import './timeline.css';
import markupItem from './markup-item';
import { isCoordsValid } from './validators';

export default class Timeline {
  constructor() {
    this.container = document.querySelector('.timeline-container');
    this.dataList = this.container.querySelector('.timeline-data--list');
    this.inputDataForm = this.container.querySelector('.timeline-input-data-form');
    this.inputCoordsForm = this.container.querySelector('.timeline-input-coords-form');
    this.inputCoordsField = this.inputCoordsForm.querySelector('.timeline-input');

    this.coordsElement = undefined;

    this.bindToDOM();
  }

  bindToDOM() {
    this.onDataFormSubmit = this.onDataFormSubmit.bind(this);
    this.onCoordsFormSubmit = this.onCoordsFormSubmit.bind(this);
    this.onCoordsFormReset = this.onCoordsFormReset.bind(this);
    this.onCoordsFieldInput = this.onCoordsFieldInput.bind(this);

    this.inputDataForm.addEventListener('submit', this.onDataFormSubmit);
    this.inputCoordsForm.addEventListener('submit', this.onCoordsFormSubmit);
    this.inputCoordsForm.addEventListener('reset', this.onCoordsFormReset);
    this.inputCoordsField.addEventListener('input', this.onCoordsFieldInput);
  }

  onDataFormSubmit(e) {
    e.preventDefault();

    const data = {
      text: this.inputDataForm.text.value,
    };

    this.addItem(data);

    this.inputDataForm.text.value = '';
  }

  addItem(data) {
    const currentTime = Date.now();
    const listItem = document.createElement('li');
    listItem.classList.add('timeline-data--item');
    listItem.innerHTML = markupItem;

    if (data.text) {
      const dataItem = document.createElement('a');
      dataItem.classList.add('timeline-data--item-text');
      dataItem.textContent = data.text;

      listItem.querySelector('.timeline-data--item-content').appendChild(dataItem);
    }

    listItem.querySelector('.timeline-data--item-date').textContent = `${new Date(currentTime).toLocaleDateString()} ${new Date(currentTime).toLocaleTimeString()}`;

    this.coordsElement = listItem.querySelector('.timeline-data--item-location');

    this.dataList.insertAdjacentElement('afterbegin', listItem);

    this.addLocation();
  }

  addLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data.coords;

          if (this.coordsElement) {
            this.coordsElement.textContent = `[${latitude}, ${longitude}]`;
            this.coordsElement = undefined;
          }
        },
        (err) => {
          console.log(err);
          this.inputCoordsForm.classList.add('timeline-form--display-active');
          this.inputCoordsForm.coords.value = '';
          this.inputCoordsField.focus();
        },
        { enableHighAccuracy: true },
      );
    }
  }

  onCoordsFormSubmit(e) {
    e.preventDefault();

    const coords = this.inputCoordsForm.coords.value;

    if (!isCoordsValid(coords)) {
      this.inputCoordsField.classList.add('invalid');
      this.inputCoordsField.focus();
      return;
    }

    if (this.coordsElement) {
      this.coordsElement.textContent = this.inputCoordsForm.coords.value;
      this.coordsElement = undefined;
    }

    this.inputCoordsField.classList.remove('invalid');
    this.inputCoordsForm.classList.remove('timeline-form--display-active');
    this.inputDataForm.querySelector('.timeline-input').focus();
  }

  onCoordsFormReset() {
    this.inputCoordsField.classList.remove('invalid');
    this.inputCoordsForm.classList.remove('timeline-form--display-active');
    this.inputDataForm.querySelector('.timeline-input').focus();
  }

  onCoordsFieldInput() {
    this.inputCoordsField.classList.remove('invalid');
  }
}
