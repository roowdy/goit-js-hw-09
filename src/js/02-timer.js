import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
const valueEl = document.querySelectorAll('.value');
const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');

let timerId = 0;

timerEl.style.display = 'flex';
timerEl.style.padding = '30px';
fieldEl.forEach(item => (item.style.display = 'flex'));
fieldEl.forEach(item => (item.style.flexDirection = 'column'));
fieldEl.forEach(item => (item.style.alignItems = 'center'));
fieldEl.forEach(item => (item.style.marginRight = '20px'));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

startBtn.setAttribute('disabled', true);

datePicker.addEventListener('input', onDatePickerClick);
startBtn.addEventListener('click', onStartClick);

const finalDate = flatpickr('#datetime-picker', options);

function onDatePickerClick() {
  if (finalDate.selectedDates[0] > Date.now()) {
    startBtn.removeAttribute('disabled');
  }
}

function onStartClick() {
  const timerId = setInterval(() => {
    const timerValue = convertMs(finalDate.selectedDates[0] - Date.now());
    valueEl[0].textContent = timerValue.days;
    valueEl[1].textContent = timerValue.hours;
    valueEl[2].textContent = timerValue.minutes;
    valueEl[3].textContent = timerValue.seconds;

    if (
      valueEl[0].textContent === '00' &&
      valueEl[1].textContent === '00' &&
      valueEl[2].textContent === '00' &&
      valueEl[3].textContent === '00'
    ) {
      clearInterval(timerId);
      datePicker.removeAttribute('disabled');
    }
  }, 1000);
  startBtn.setAttribute('disabled', true);
  datePicker.setAttribute('disabled', true);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}