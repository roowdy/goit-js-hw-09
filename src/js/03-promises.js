import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const info = document.querySelectorAll('input');

formEl.addEventListener('submit', onSubmitClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitClick(e) {
  e.preventDefault();

  let delay = Number(info[0].value);
  const delayStep = Number(info[1].value);
  const amount = Number(info[2].value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += delayStep;
  }
}