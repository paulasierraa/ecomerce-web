import views from "../views/shop/shop-history/shop-history.html";
import "../views/shop/shop-history/shop-history.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  return divElement;
};