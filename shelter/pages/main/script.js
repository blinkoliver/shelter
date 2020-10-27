//burger
const burger = document.querySelector("#header .container > svg");
const blurBody = document.querySelector(".unblur");
const navigation = document.querySelector("#header .container nav");
const headerLogo = document.querySelector("#header .container > .header-logo");
let petsArr = [];
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

//render cards to slider
const carusel = document.querySelector(
  ".our-friends-wrapper .container .carusel"
);
const card = document.querySelector(
  ".our-friends-wrapper .container .carusel .card"
);
const leftButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-of-type(1)"
);
const rightButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-of-type(2)"
);
const cards = document.querySelectorAll(
  ".our-friends-wrapper .container .carusel .card"
);
let showCards = (pets) => {
  pets.map((element) => {
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
showCards(pets);

let computeNumberItemsInSlider = () => {
  let width = window.innerWidth;
  if (width > 1279) return 3;
  else if (width > 767) return 2;
  else return 1;
};
let currentPetNumbers = [];
let getRandomNumbers = (maxNumber) => {
  let numbers = [];
  let howManyNumbers = computeNumberItemsInSlider();
  while (numbers.length != howManyNumbers) {
    let randomNumber = Math.ceil(Math.random() * maxNumber);
    if (![...currentPetNumbers, ...numbers].includes(randomNumber))
      numbers.push(randomNumber);
  }
  currentPetNumbers = [...numbers];
  return numbers;
};
let createSlideItem = (item, classForAnimation) => {
  let petItem = document.createElement("div");
  petItem.classList.add("pet-slider__item");
  if (classForAnimation) petItem.classList.add(classForAnimation);
  petItem.dataset.id = item.id;

  let petItemImage = document.createElement("div");
  petItemImage.classList.add("pet-slider__item-image");

  let image = document.createElement("img");
  image.setAttribute("src", item.img);
  image.setAttribute("alt", item.name);

  let petName = document.createElement("div");
  petName.classList.add("pet-slider__item-name");
  petName.innerText = item.name;

  let button = document.createElement("button");
  button.classList.add("pet-slider__item-button");
  button.innerText = "Learn more";

  petItemImage.append(image);
  petItem.append(petItemImage, petName, button);

  return petItem;
};
let updateSlider = (classForAnimation) => {
  let oldPetItems = document.querySelectorAll(".pet-slider__item");
  oldPetItems.forEach((i) => i.classList.add(classForAnimation));
  let sliderContainer = document.querySelector(".pet-slider__items");
  let numbersForShow = getRandomNumbers(pets.length);
  let petItems = numbersForShow.map((n) =>
    createSlideItem(pets[n - 1], classForAnimation)
  );

  if (classForAnimation == "item_animation-left")
    sliderContainer.prepend(...petItems);
  else sliderContainer.append(...petItems);

  if (classForAnimation == undefined) oldPetItems.forEach((i) => i.remove());

  setTimeout((x) => {
    petItems.forEach((i) => i.classList.remove(classForAnimation));
    oldPetItems.forEach((i) => i.remove());
  }, 480);
};

leftButton.addEventListener("click", () => {
  leftButton.disabled = true;
  setTimeout(() => {
    leftButton.disabled = false;
  }, 500);
  updateSlider("item_animation-left");
});
rightButton.addEventListener("click", () => {
  rightButton.disabled = true;
  setTimeout(() => {
    rightButton.disabled = false;
  }, 500);
  updateSlider("item_animation-right");
});
window.addEventListener("resize", () => {
  if (currentPetNumbers.length != computeNumberItemsInSlider()) updateSlider();
});

updateSlider();

//popup
let changeOverflow = () => {
  let overflowY = document.body.style.overflowY;
  document.body.style.overflowY = overflowY != "hidden" ? "hidden" : "visible";
};

let fillModalWindow = (item) => {
  let petImage = document.querySelector(".modal__image img");
  petImage.setAttribute("alt", item.name);
  petImage.setAttribute("src", item.img);
  let petName = document.querySelector(".pet-info__name");
  petName.textContent = item.name;
  let petType = document.querySelector(".pet-info__type");
  petType.textContent = `${item.type} - ${item.breed}`;
  let petAbout = document.querySelector(".pet-info__about");
  petAbout.textContent = item.description;
  let petAge = document.querySelector(".pet-info__age .value");
  petAge.textContent = item.age;
  let petInoculations = document.querySelector(
    ".pet-info__inoculations .value"
  );
  petInoculations.textContent = item.inoculations.join(", ");
  let petDiseases = document.querySelector(".pet-info__diseases .value");
  petDiseases.textContent = item.diseases.join(", ");
  let petParasites = document.querySelector(".pet-info__parasites .value");
  petParasites.textContent = item.parasites.join(", ");
};

let toggleModalWindow = () => {
  modalWindow.classList.toggle("modal-wrapper_active");
  changeOverflow();
};
cards.addEventListener("click", (e) => {
  let sliderItem = e.target.closest(".pet-slider__item");
  if (!sliderItem) return;

  let itemId = sliderItem.dataset.id;
  fillModalWindow(pets.find((p) => p.id == itemId));
  toggleModalWindow();
});
