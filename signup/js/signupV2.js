const form = document.querySelector('form');

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonObject = {};

    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    postRegistration(jsonObject);
  });
});

function postRegistration(jsonObject) {
  fetch('http://localhost:8080/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObject)
  })
    .then((response) => {
      if (response.ok) {
        console.log('Registration successful!');
      } else {
        console.log('Server return response status: ', response.status);
      }
    })
    .catch((error) => {
      console.error('Error in send registration:', error);
    });
}
