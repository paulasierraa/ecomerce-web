import { environment } from "../environments/environments";
import views from "../views/auth/register/register.html";
import "../views/auth/register/register.css";
import { setPermisos } from "./navbar.controller.js";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const PORT = 8080 || process.env.PORT;

  const btnRegister = divElement.querySelector("#btnRegister");

  const form = divElement.querySelector("#formRegister");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = divElement.querySelector("#floatingInputUser").value;
    const email = divElement.querySelector("#floatingInput").value;
    const password = divElement.querySelector("#floatingPassword").value;

    const user = {
      username,
      email,
      password,
      state: 1,
      image: "",
      id_rol: 2,
    };
    fetch(
      `${environment.endpoint}/ecommerce-core/routes/user.routes.php?username=${username}&email=${email}&password=${password}&state=1&image=hola&id_rol=2`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            localStorage.setItem("userInformation", JSON.stringify(data[0]));
            setPermisos();
            window.location.href = "";
          });
        } else {
          throw "Error en la petición";
        }
      })
      .catch((error) => console.log(error));
    console.log({ username, email, password });
  });

  return divElement;
};
