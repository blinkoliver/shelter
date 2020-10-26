//burger
const burger = document.querySelector("#header .container > svg");
const blurBody = document.querySelector(".unblur");
const navigation = document.querySelector("#header .container nav");
const headerLogo = document.querySelector("#header .container > .header-logo");

burger.onclick = () => {
  navigation.classList.toggle("ham-navigation-close");
  blurBody.classList.toggle("blur");
  burger.classList.toggle("burger-rotate");
  headerLogo.classList.toggle("header-logo-none");
};
addEventListener("mouseup", (event) => {
  if (
    event.target !== navigation &&
    navigation.classList.length === 2 &&
    event.target !== burger
  ) {
    navigation.classList.remove("ham-navigation-close");
    blurBody.classList.remove("blur");
    burger.classList.remove("burger-rotate");
    headerLogo.classList.remove("header-logo-none");
  }
});
//get pets
const requestURL = "../../assets/pets.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let pets;
request.onload = () => {
  pets = request.response;
  showCards(pets);
};
//render cards to slider
const carusel = document.querySelector(
  ".our-friends-wrapper .container .carusel"
);
const card = document.querySelector(
  ".our-friends-wrapper .container .carusel .card"
);
const leftButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-child(1)"
);
const rightButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-child(2)"
);

let showCards = (jsonObj) => {
  jsonObj.map((element) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    img.src = element.img;
    let button = document.createElement("button");
    button.textContent = "Lear more";
    let span = document.createElement("span");
    span.textContent = element.name;
    card.classList.add("card");
    carusel.appendChild(card);
    card.appendChild(img);
    card.appendChild(span);
    card.appendChild(button);
  });
};

const cards = document.querySelectorAll(
  ".our-friends-wrapper .container .carusel .card"
);
let current = 0;
let slider = () => {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.add("opacity0");
  }
  cards[current].classList.remove("opacity0");
};
slider();
leftButton.addEventListener("click", function () {
  if (current - 1 == -1) {
    current = images.length - 1;
  } else {
    current--;
  }
  slider();
});
rightButton.addEventListener("click", function () {
  if (current + 1 == images.length) {
    current = 0;
  } else {
    current++;
  }
  slider();
});

// let nextSlide = () => {
//   showSlides((slideIndex += 1));
// };
// let previousSlide = () => {
//   showSlides((slideIndex -= 1));
// };
// let currentSlide = () => {
//   showSlides((slideIndex = n));
// };

// let slideIndex = 1;
// let showSlides = (n) => {
//   let i;
//   let slides = document.querySelectorAll(
//     ".our-friends-wrapper .container .carusel .card"
//   );
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slides[slideIndex - 1].style.display = "block";
// };
// showSlides(slideIndex);
// leftButton.addEventListener("click", previousSlide);
// rightButton.addEventListener("click", nextSlide);
