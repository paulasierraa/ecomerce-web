import views from "../views/auth/register/register.html";
import "../views/auth/register/register.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  return divElement;
};
