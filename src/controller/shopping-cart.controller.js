import views from "../views/shopping-cart/shopping-cart.html";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  return divElement;
};
