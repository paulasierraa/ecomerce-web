import views from "../views/auth/login/login.html";
import "../views/auth/login/login.css";
import { environment } from "../environments/environments";
// import ncrypt from 'ncrypt-js';


export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const form = divElement.querySelector("#formLogin");
  form.addEventListener("submit", () => {

    const email = divElement.querySelector("#emailtxt").value;
    const password = divElement.querySelector("#passwordtxt").value;
    login(email, password, divElement);

  });
  return divElement;
};


/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {user} usuario
 */
var login = async (email, password, divElement) => {
  const errorMesagge = divElement.querySelector("#loginErrorMessage");
  fetch
    (
      `${environment.endpoint}/ecommerce-core/routes/auth.routes.php?email=${email}&password=${password}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      //si la respuesta es correcta
      if (response.ok) {
        //parsea la información devuelta
        response.json().then(data => {
          errorMesagge.classList.add("d-none")
          localStorage.setItem("userInformation", JSON.stringify(data));
          window.location.hash = '/';
          window.location.reload()
        });
      }
      else {
        errorMesagge.classList.remove("d-none");
        throw "Error en la petición"
      }
    })
    .catch((error) => console.log(error))
}