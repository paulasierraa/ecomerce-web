import views from "../views/template/shopping-cart/shopping-cart.html";
import "../views/template/shopping-cart/shopping-cart.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  return divElement;
};
