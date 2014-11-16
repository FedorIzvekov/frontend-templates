var slides = document.querySelector(".slides");
var buttons = document.querySelectorAll(".nav-button");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
var currentSlide = 0;

function showSlide(index) {
    slides.style.transform = "translateX(-" + index * 100 + "%)";
    updateButtons(index);
}

function updateButtons(index) {
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
    buttons[index].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 5;
    showSlide(currentSlide);
    updateButtons(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + 5) % 5;
    showSlide(currentSlide);
    updateButtons(currentSlide);
}

buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        currentSlide = index;
        showSlide(currentSlide);
        updateButtons(currentSlide);
    });
});

prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);

setInterval(nextSlide, 10000);
