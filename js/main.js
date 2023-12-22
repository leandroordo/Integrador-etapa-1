var menus = document.getElementsByClassName("dropdown");
for (const element of menus) {
  const item = element.nextElementSibling;
  element.addEventListener("click", () => item.classList.toggle("show"));
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropdown")) {
    var menus = document.getElementsByClassName("dropdown");
    for (const element of menus) {
      const item = element.nextElementSibling;
      if (item.classList.contains("show")) {
        item.classList.remove("show");
      }
    }
  }
};
