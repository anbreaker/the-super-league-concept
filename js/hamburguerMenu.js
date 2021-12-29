const iconMenu = document.querySelector(".menu")
const menu = document.querySelector(".wrapper-menu")

iconMenu.addEventListener("click", () => {
  menu.classList.toggle("opened")
  menu.classList.toggle("wrapper-menu-show")
  document.body.classList.toggle("opacity")
})
