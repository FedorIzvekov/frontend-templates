const slidesContainer = document.querySelector(".slides");
const buttons = document.querySelectorAll(".nav-button");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const totalSlides = document.querySelectorAll('.slides img').length;
let currentSlide = 0;

function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    updateButtons(index);
}

function updateButtons(index) {
    buttons.forEach((button) => button.classList.remove("active"));
    buttons[index].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        goToSlide(index);
    });
});

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

setInterval(nextSlide, 10000);
