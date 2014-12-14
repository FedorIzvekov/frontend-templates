document.addEventListener("DOMContentLoaded", function () {
    var progress = document.getElementById("progress");
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var next = document.getElementById("next");
    var back = document.getElementById("back");
    var submit = document.getElementById("submit");

    next.onclick = function () {
        if (validateForm1()) {
            form1.style.left = "-450px";
            form2.style.left = "40px";
            progress.style.width = "360px";
        }
    };

    back.onclick = function () {
        form1.style.left = "40px";
        form2.style.left = "450px";
        progress.style.width = "180px";
    };

    submit.onclick = function (event) {
        event.preventDefault();

        if (validateForm2()) {
            var jsonObject = handleFormSubmit();
            postRegistration(jsonObject);
        }
    };
});

function handleFormSubmit() {
    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;
    var phoneNumberValue = document.getElementById("phoneNumber").value;
    var firstNameValue = document.getElementById("firstName").value;
    var lastNameValue = document.getElementById("lastName").value;

    var jsonObject = {
        email: emailValue,
        phoneNumber: phoneNumberValue,
        password: passwordValue,
        firstName: firstNameValue,
        lastName: lastNameValue
    };

    return jsonObject;
};

function postRegistration(jsonObject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/registration', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                console.log('Registration successful!');
            } else {
                console.log('Error in registration: ', xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(jsonObject));
};

function validateForm1() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    if (!emailRegex.test(email.value)) {
        email.setCustomValidity("Invalid email address!");
        email.reportValidity();
        setInvalidStyle(email);
        isValid = false;

    } else {
        email.setCustomValidity("");
        setValidStyle(email);
    }

    if (password.value.length < 8) {
        password.setCustomValidity("Password must be at least 8 characters!");
        password.reportValidity();
        setInvalidStyle(password);
        isValid = false;
    }
    else if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Password mismatch!");
        confirmPassword.reportValidity();
        setInvalidStyle(confirmPassword);
        isValid = false;
    } else {
        password.textContent = "";
        confirmPassword.textContent = "";
        setValidStyle(password);
        setValidStyle(confirmPassword);
    }

    return isValid;
}

function validateForm2() {

    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var phoneNumber = document.getElementById("phoneNumber");
    var nameRegex = /^[A-Za-z]{2,}$/;
    var phoneRegex = /^\d{10}$/;
    var isValid = true;

    if (!nameRegex.test(firstName.value)) {
        firstName.setCustomValidity("First Name must be at least 2 characters and contain [A-Za-z]!");
        firstName.reportValidity();
        setInvalidStyle(firstName);
        isValid = false;
    } else {
        firstName.setCustomValidity("");
        setValidStyle(firstName);
    }

    if (!nameRegex.test(lastName.value)) {
        lastName.setCustomValidity("Last Name must be at least 2 characters and contain [A-Za-z]!");
        lastName.reportValidity();
        setInvalidStyle(lastName);
        isValid = false;
    } else {
        lastName.setCustomValidity("");
        setValidStyle(lastName);
    }

    if (!phoneRegex.test(phoneNumber.value)) {
        phoneNumber.setCustomValidity("Phone Number must be valid!");
        phoneNumber.reportValidity();
        setInvalidStyle(phoneNumber);
        isValid = false;
    } else {
        phoneNumber.setCustomValidity("");
        setValidStyle(phoneNumber);
    }

    return isValid;
}

function setInvalidStyle(element) {
    element.style.border = "2px solid red";
}

function setValidStyle(element) {
    element.style.border = "";
}
