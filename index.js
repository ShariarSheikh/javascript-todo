const closeIcon = document.querySelector(".close_menuicon");
const menuIcon = document.querySelector(".menuicon");
const humburgerMenu = document.querySelector(".humburger_menu_hide");

function handleMenu() {
  if (humburgerMenu.classList.contains("humburger_menu_hide")) {
    humburgerMenu.classList.remove("humburger_menu_hide");
    humburgerMenu.classList.add("humburger_menu_open");

    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  } else {
    humburgerMenu.classList.add("humburger_menu_hide");
    humburgerMenu.classList.remove("humburger_menu_open");

    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  }
}
