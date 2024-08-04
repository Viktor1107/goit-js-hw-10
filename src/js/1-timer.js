import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerInterval = null;
let userSelectedDate = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
};

flatpickr(dateTimePicker, options);

function handleDateSelection(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
      timeout: 5000,
      messageSize: 20,
    });
    startButton.disabled = true;
  } else {
    userSelectedDate = selectedDates[0];
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', startTimer);

function startTimer() {
  if (!userSelectedDate) return;
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  timerInterval = setInterval(checkTimeRemaining, 1000);
}
function checkTimeRemaining() {
  const timeRemaining = userSelectedDate - new Date();
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    updateTimerDisplay(0);
    dateTimePicker.disabled = false;
  } else {
    updateTimerDisplay(timeRemaining);
  }
}
function updateTimerDisplay(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
