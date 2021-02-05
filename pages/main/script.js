//BURGER
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
//SLIDER
//get number slides of slider
let computeNumberItemsInSlider = () => {
  let width = window.innerWidth;
  if (width > 1279) return 3;
  else if (width > 767) return 2;
  else return 1;
};
//get random numbers for slider
let currentPetNumbers = [];
let getRandomNumbers = () => {
  let numbers = [];
  let howManyNumbers = computeNumberItemsInSlider();
  while (numbers.length != howManyNumbers) {
    let randomNumber = Math.ceil(Math.random() * pets.length);
    if (![...currentPetNumbers, ...numbers].includes(randomNumber))
      numbers.push(randomNumber);
  }
  currentPetNumbers = [...numbers];
  return numbers;
};
//create slide for slider
let createOneSlide = (petObj, classForAnimation) => {
  let card = document.createElement("div");
  card.classList.add("card");
  if (classForAnimation) card.classList.add(classForAnimation);
  card.dataset.id = petObj.id;

  let img = document.createElement("img");
  img.src = petObj.img;
  img.alt = petObj.name;

  let span = document.createElement("span");
  span.textContent = petObj.name;

  let button = document.createElement("button");
  button.textContent = "Lear more";

  card.append(img, span, button);

  return card;
};
//inicialization slider
let initSlider = (classForAnimation) => {
  let oldPetItems = document.querySelectorAll(
    ".our-friends-wrapper .container .carusel .card"
  );
  oldPetItems.forEach((i) => i.classList.add(classForAnimation));

  let sliderContainer = document.querySelector(
    ".our-friends-wrapper .container .carusel .items"
  );
  let numbersForShow = getRandomNumbers(pets.length);
  let petItems = numbersForShow.map((element) =>
    createOneSlide(pets[element - 1], classForAnimation)
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
initSlider();
//add listener at buttons
const leftButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-of-type(1)"
);
const rightButton = document.querySelector(
  ".our-friends-wrapper .container .carusel > button:nth-of-type(2)"
);
leftButton.addEventListener("click", () => {
  leftButton.disabled = true;
  setTimeout(() => {
    leftButton.disabled = false;
  }, 500);
  initSlider("item_animation-left");
});
rightButton.addEventListener("click", () => {
  rightButton.disabled = true;
  setTimeout(() => {
    rightButton.disabled = false;
  }, 500);
  initSlider("item_animation-right");
});
//add listener for resize
window.addEventListener("resize", () => {
  if (currentPetNumbers.length != computeNumberItemsInSlider()) initSlider();
});

//POPUP
let sliderContainer = document.querySelector(
  ".our-friends-wrapper .container .carusel .items"
);
sliderContainer.addEventListener("click", (e) => {
  let sliderItem = e.target.closest(".card");
  if (!sliderItem) return;
  let itemId = sliderItem.dataset.id;
  fillModalWindow(pets.find((p) => p.id == itemId));
  toggleModalWindow();
});

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

let modalWindow = document.querySelector(".modal-wrapper");

modalWindow.addEventListener("click", (e) => {
  if (!e.target.closest(".modal") || e.target.closest(".modal-close"))
    toggleModalWindow();
});

let toggleModalWindow = () => {
  modalWindow.classList.toggle("modal-wrapper_active");
  changeOverflow();
};

