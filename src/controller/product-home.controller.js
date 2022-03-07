import views from "../views/product/product-home/product-home.html";

const keyLocalStorage = "Productos";

const getProducts = async () => {
  const response = await fetch(
    "http://localhost/ecommerce-core/routes/product.routes.php"
  );
  return await response.json();
};

const getProductById = async (id) => {
  const response = await fetch(
    `http://localhost/ecommerce-core/routes/products.routes.php?id=${id}`
  );
  return await response.json();
};

const getProductsPaginate = async () => {
  const response = await fetch(
    `http://localhost/ecommerce-core/routes/paginate-products.routes.php?pagina=0&regPagina=8`
  );
  return await response.json();
};

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;
  const productsCantidad = await getProducts();
  let regPagina = 8;
  let paginas = productsCantidad.length / regPagina;
  const templateCard = divElement.querySelector("#template-card").content;
  const items = divElement.querySelector("#items");
  const fragment = document.createDocumentFragment();

  const products = await getProductsPaginate();

  console.log(products);

  products.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.name;
    templateCard.querySelector("img").src = product.image;
    templateCard.querySelector("p").textContent = product.price;
    templateCard.querySelector("a").href = `#/product-detail?id=${product.id}`;
    templateCard.querySelector(".btn-cart").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  items.addEventListener("click", (event) => {
    addToCart(event);
  });

  for (let i = 0; i < paginas; i++) {}

  console.log(productsCantidad.length);

  return divElement;
};

const addToCart = (event) => {
  if (event.target.classList.contains("btn-cart")) {
    const id = event.target.dataset.id;
    addToLocalStorage(id);
    event.stopPropagation();
  }
};

const addToLocalStorage = (id) => {
  let datosGuardados = readLocalStorage() || [];
  let datosFinales = [...datosGuardados, id];
  // productRepeat(datosFinales);
  localStorage.setItem(keyLocalStorage, JSON.stringify(datosFinales));
};

const readLocalStorage = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorage));
};

const productRepeat = (product) => {
  let producto;
  let datosGuardados = readLocalStorage() || [];
  if (datosGuardados.length.length > 0) {
    producto = datosGuardados.map((item) => {
      if (item.id === product.id) {
        item.cantidad++;
      }
    });
  }
  localStorage.setItem(keyLocalStorage, JSON.stringify(producto));
};
