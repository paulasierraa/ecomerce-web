function setPermisos() {
  //   debugger;
  const divElement = document.getElementById("navbar-element");
  let user = JSON.parse(localStorage.getItem("userInformation"));
  let id_rol = user.id_rol_fk;
  if (id_rol == "1") {
    const category = divElement.querySelector("#option-category");
    const product = divElement.querySelector("#option-product");

    category.classList.remove("d-none");
    product.classList.remove("d-none");
  }
  const login = divElement.querySelector("#option-login");
  const register = divElement.querySelector("#option-register");
  const logOut = divElement.querySelector("#option-logout");
  const cart = divElement.querySelector("#option-cart");
  const history = divElement.querySelector("#option-history");

  login.classList.add("d-none");
  register.classList.add("d-none");
  logOut.classList.remove("d-none");
  cart.classList.remove("d-none");
  history.classList.remove("d-none");
}

window.onload = function () {
  if (
    localStorage.getItem("userInformation") != null &&
    localStorage.getItem("userInformation") != undefined
  ) {
    setPermisos();
  }
  let salirBtn = document.getElementById("option-logout");
  salirBtn.addEventListener("click", (event) => {
    localStorage.removeItem("userInformation");
    window.location.href = "";
  });
};

export { setPermisos };
