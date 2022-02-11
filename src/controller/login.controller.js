import views from "../views/auth/login/login.html";
import "../views/auth/login/login.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  return divElement;
};
