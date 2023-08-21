const themeSwitchCheckbox = document.querySelector(".theme-switch__checkbox");
const mainBody = document.getElementById("main-body");

themeSwitchCheckbox.addEventListener("change", function () {
    if (this.checked) {
        mainBody.style.backgroundColor = "#1d1f2c"; // Cambia el color de fondo al hacer clic en el switch
    } else {
        mainBody.style.backgroundColor = "white"; // Cambia el color de fondo al volver a hacer clic en el switch
    }
});