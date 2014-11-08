var form = document.querySelector('form');

function addFormListener() {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    var jsonObject = {};

    formData.forEach(function (value, key) {
      jsonObject[key] = value;
    });

    postRegistration(jsonObject);
  });
}

function postRegistration(jsonObject) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/registration', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.noninterchangeable = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        console.log('Registration successful!');
      } else {
        console.log('Error in registration: ', xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(jsonObject));
}

addFormListener();