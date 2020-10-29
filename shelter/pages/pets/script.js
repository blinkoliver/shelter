//BURGER
const burger = document.querySelector("#header .container > svg");
const blurBody = document.querySelector(".unblur");
const navigation = document.querySelector("#header .container nav");
const headerLogo = document.querySelector("#header .container > .header-logo");
const headerBar = document.querySelector("#header");

burger.onclick = () => {
  navigation.classList.toggle("ham-navigation-close");
  blurBody.classList.toggle("blur");
  burger.classList.toggle("burger-rotate");
  headerLogo.classList.toggle("header-logo-none");
  headerBar.classList.toggle("absolut");
};
addEventListener("mouseup", (event) => {
  if (
    event.target !== navigation &&
    navigation.classList.length === 2 &&
    event.target !== burger
  ) {
    navigation.classList.remove("ham-navigation-close");
    blurBody.classList.remove("blur");
    headerBar.classList.remove("absolut");
    burger.classList.remove("burger-rotate");
    headerLogo.classList.remove("header-logo-none");
  }
});
//POPUP
let cards = document.querySelector(".carusel");
let modalWindow = document.querySelector(".modal-wrapper");

let changeOverflow = () => {
  let overflowY = document.body.style.overflowY;
  document.body.style.overflowY = overflowY != "hidden" ? "hidden" : "visible";
  document.body.style.paddingRight =
    overflowY != "hidden" ? `${getScrollbarWidth()}px` : "0";
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
  let card = e.target.closest(".cards__item");
  if (!card) return;

  let itemId = card.dataset.id;
  fillModalWindow(pets.find((p) => p.id == itemId));
  toggleModalWindow();
});

modalWindow.addEventListener("click", (e) => {
  if (!e.target.closest(".modal") || e.target.closest(".modal-close"))
    toggleModalWindow();
});
//PAGINATION
let arrowNext = document.querySelector(".arrow-next");
let arrowPrevious = document.querySelector(".arrow-previous");
let arrowToStart = document.querySelector(".arrow-to-start");
let arrowToEnd = document.querySelector(".arrow-to-end");
let currentPageBtn = document.querySelector(".page-number");
let navigationBar = document.querySelector(".cards-container-navigation");
let pages = [];

let getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

let = computeNumberItemsOnPage = () => {
  let width = window.innerWidth;

  if (width > 1279) return 8;
  else if (width > 767) return 6;
  else return 3;
};

let shuffle = (array) => {
  let i = array.length,
    j = 0;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let calculatePages = () => {
  pages = [];
  let items = [];
  let itemsOnPage = computeNumberItemsOnPage();
  let pagesCount = 48 / itemsOnPage;

  while (items.length != 48) {
    items.push(1, 2, 3, 4, 5, 6, 7, 8);
  }

  for (let i = 0; i < pagesCount; i++) {
    pages[i] = shuffle(items.slice(i * itemsOnPage, itemsOnPage * (i + 1)));
  }
};

let createCardItem = (item) => {
  let cardItem = document.createElement("div");
  cardItem.classList.add("cards__item");
  cardItem.dataset.id = item.id;

  let cardItemImage = document.createElement("div");
  cardItemImage.classList.add("cards__item-image");

  let image = document.createElement("img");
  image.setAttribute("src", item.img);
  image.setAttribute("alt", item.name);

  let cardItemName = document.createElement("div");
  cardItemName.classList.add("cards__item-name");
  cardItemName.innerText = item.name;

  let button = document.createElement("button");
  button.classList.add("cards__item-button");
  button.innerText = "Learn more";

  cardItemImage.append(image);
  cardItem.append(cardItemImage, cardItemName, button);

  return cardItem;
};

let drawPage = (pageNumber) => {
  let cardContainer = document.querySelector(".carusel");
  let itemNumbersForShow = pages[pageNumber - 1];
  let itemsForShow = itemNumbersForShow.map((n) => createCardItem(pets[n - 1]));
  cardContainer.innerHTML = "";
  cardContainer.append(...itemsForShow);
};

let changeDisableStatus = (pageNumber) => {
  arrowToStart.disabled = arrowPrevious.disabled =
    pageNumber == 1 ? true : false;

  arrowToEnd.disabled = arrowNext.disabled =
    pageNumber == pages.length ? true : false;
};

window.addEventListener("resize", () => {
  if (pages[0].length != computeNumberItemsOnPage()) {
    calculatePages();
    currentPageBtn.textContent = 1;
    drawPage(currentPageBtn.textContent);
    changeDisableStatus(currentPageBtn.textContent);
  }
});

navigationBar.addEventListener("click", (e) => {
  let target = e.target.closest(".pages__paginator");
  if (!target) return;

  let direction = target.dataset.direction;

  switch (direction) {
    case "toStart":
      currentPageBtn.textContent = 1;
      break;
    case "previous":
      currentPageBtn.textContent--;
      break;
    case "next":
      currentPageBtn.textContent++;
      break;
    case "toEnd":
      currentPageBtn.textContent = pages.length;
      break;

    default:
      return;
  }

  drawPage(currentPageBtn.textContent);
  changeDisableStatus(currentPageBtn.textContent);
});

calculatePages();
drawPage(currentPageBtn.textContent);
changeDisableStatus(currentPageBtn.textContent);
