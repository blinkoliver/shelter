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
