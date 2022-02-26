import views from "../views/auth/register/register.html";
import "../views/auth/register/register.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const btnRegister = divElement.querySelector("#btnRegister");
  btnRegister.addEventListener("click", () => {
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
      `http://localhost/ecommerce-core/routes/user.routes.php?username=${username}&email=${email}&password=${password}&state=1&image=hola&id_rol=2`,
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
          return response.text();
        } else {
          throw "Error en la petición";
        }
      })
      .catch((error) => console.log(error));
    console.log({ username, email, password });
  });

  return divElement;
};
