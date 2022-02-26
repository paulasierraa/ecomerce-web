import views from "../views/product/product-home/product-home.html";

const getProducts = async () => {
  const response = await fetch(
    "http://localhost/ecommerce-core/routes/product.routes.php"
  );
  return await response.json();
};

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const cardProduct = divElement.querySelector("#card-products");

  const products = await getProducts();

  products.forEach((product) => {
    cardProduct.innerHTML += `
    <div class="col-sm-3">
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${product.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
  </div>
  <div class="card-body">
    <a href="#" class="btn">
    <i class="fas fa-info"></i>
    </a>
    <button class="btn btn-default">
    <i class="fas fa-shopping-cart"></i>
    </button>
  </div>
</div>
</div>
    `;
  });

  return divElement;
};
