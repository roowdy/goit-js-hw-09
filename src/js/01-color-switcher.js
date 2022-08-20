
const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let id = null;

startBtn.style.width = '120px';
startBtn.style.height = '40px';
startBtn.style.marginLeft = '40%';
startBtn.style.border = '2px solid green';
startBtn.style.borderRadius = '10px';
startBtn.style.backgroundColor = '#97EAB9';
startBtn.style.marginTop = '20%';
startBtn.style.cursor = 'pointer';

stopBtn.setAttribute('disabled', 'true');
stopBtn.style.width = '120px';
stopBtn.style.height = '40px';
stopBtn.style.border = '2px solid transparent';
stopBtn.style.borderRadius = '10px';
stopBtn.style.backgroundColor = 'pink';
stopBtn.style.cursor = 'pointer';

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  if (startBtn.hasAttribute('disabled')) {
    return;
  }
    startBtn.style.cursor = 'default';
  stopBtn.removeAttribute('disabled');
  stopBtn.style.borderColor = 'red';
  startBtn.setAttribute('disabled', 'true');
  startBtn.style.borderColor = 'transparent';
  id = setInterval(changeBodyColor, 1000);
}

function onStopClick() {
  if (stopBtn.hasAttribute('disabled')) {
    return;
  }
  stopBtn.style.cursor = 'default';
  startBtn.removeAttribute('disabled');
  startBtn.style.borderColor = 'green';
  stopBtn.setAttribute('disabled', 'true');
  stopBtn.style.borderColor = 'transparent';
  clearInterval(id);
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}