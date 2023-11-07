import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  //   const formData = form.elements;

  //   const email = formData.email.value;
  //   const message = formData.message.value;
  //   const dataToSave = { email, message };
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  //   const {
  //     elements: { email, message },
  //   } = event.currentTarget;

  //   if (email.value === '' || message.value === '') {
  //     return window.alert('Усі поля повинні бути заповнені!');
  //   }

  //   console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  console.log(formData);
  formData = {};
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// function getDataFromStorage() {
//   const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

//   if (savedData) {
//     emailInput.value = savedData.email;
//     textInput.value = savedData.message;
//   }
// }
refreshForm();
function refreshForm() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
