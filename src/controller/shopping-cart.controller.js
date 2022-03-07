import views from "../views/shopping-cart/shopping-cart.html";

const keyLocalStorage = "Productos";
const divElement = document.createElement("div");
divElement.innerHTML = views;
const items = divElement.querySelector("#items-cart");
const fragment = document.createDocumentFragment();
const templateProduct = divElement.querySelector("#product-row").content;

const getProductById = async (id) => {
  const response = await fetch(
    `http://localhost/ecommerce-core/routes/products.routes.php?id=${id}`
  );
  return await response.json();
};

export default () => {
  const products = JSON.parse(localStorage.getItem(keyLocalStorage));

  products.forEach(async (idProduct) => {
    const product = await getProductById(idProduct);
    renderProductCart(product);
  });

  items.addEventListener("click", deleteProductCart);

  return divElement;
};

const renderProductCart = (product) => {
  product.forEach((p) => {
    templateProduct.querySelector("#name").textContent = p.name;
    templateProduct.querySelector(".img-flag").src = p.image;
    templateProduct.querySelector("#price").textContent = p.price;
    templateProduct.querySelector("#cantidad").textContent = 1;
    templateProduct.querySelector("#total").textContent = p.price;
    templateProduct.querySelector(".btn-outline-dark").dataset.id = p.id;

    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

const deleteProductCart = (event) => {
  if (event.target.classList.contains("btn-outline-dark")) {
    const id = event.target.dataset.id;
    localStorage.removeItem(keyLocalStorage, id);
  }
};
