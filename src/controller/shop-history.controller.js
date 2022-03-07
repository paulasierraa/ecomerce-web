import views from "../views/shop/shop-history/shop-history.html";
import "../views/shop/shop-history/shop-history.css";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const items = divElement.querySelector("#items-cart");
  const fragment = document.createDocumentFragment();
  const templateProduct = divElement.querySelector("#product-row").content;

  return divElement;
};
