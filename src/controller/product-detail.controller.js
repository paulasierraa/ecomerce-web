import views from "../views/product/product-detail/product-detail.html";
import "../views/product/product-detail/product-detail.css";
import { environment } from "../environments/environments";

const getProductById = async (id) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/products.routes.php?id=${id}`
  );
  return await response.json();
};

export default async () => {
  const valores = window.location.hash.split("?");
  const id = valores[1].split("=")[1];

  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const product = await getProductById(id);
  console.log(product.image);

  const productElement = divElement.querySelector("#card-product");

  product.forEach((product) => {
    productElement.innerHTML = `
  <div class="preview col-md-6">
                    <div class="preview-pic tab-content">
                        <div class="tab-pane active" id="pic-1">
                            <img class="product-detail-image" src="${product.image}" />
                        </div>
                    </div>
                </div>
                <div class="details col-md-6">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="rating">
                        <div class="stars">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <h4 class="price">Precio <span>$${product.price}</span></h4>
                    <div class="action">
                        <button class="add-to-cart btn btn-default" type="button">Agregar al carrito</button>
                    </div>
                </div>
  
  `;
  });

  return divElement;
};