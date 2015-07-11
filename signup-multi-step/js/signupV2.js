document.addEventListener("DOMContentLoaded", () => {
    const progress = document.getElementById("progress");
    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const next = document.getElementById("next");
    const back = document.getElementById("back");
    const submit = document.getElementById("submit");

    next.addEventListener("click", () => {
        if (validateForm1()) {
            form1.style.left = "-450px";
            form2.style.left = "40px";
            progress.style.width = "360px";
        }
    });

    back.addEventListener("click", () => {
        form1.style.left = "40px";
        form2.style.left = "450px";
        progress.style.width = "180px";
    });

    submit.addEventListener("click", (event) => {
        event.preventDefault();

        if (validateForm2()) {
            const jsonObject = handleFormSubmit();
            postRegistration(jsonObject);
        }
    });
});

function handleFormSubmit() {
    return {
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value
    };
};

function postRegistration(jsonObject) {
    fetch('http://localhost:8080/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObject),
    })
        .then(response => {
            if (response.ok) {
                console.log('Registration successful!');
            } else {
                console.log('Server return response status: ', response.status);
            }
        })
        .catch(error => console.error('Error in send registration: ', error));
};

function validateForm1() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

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
    } else if (password.value !== confirmPassword.value) {
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
};

function validateForm2() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phoneNumber = document.getElementById("phoneNumber");
    const nameRegex = /^[A-Za-z]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    let isValid = true;

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
};

function setInvalidStyle(element) {
    element.style.border = "2px solid red";
};

function setValidStyle(element) {
    element.style.border = "";
};
