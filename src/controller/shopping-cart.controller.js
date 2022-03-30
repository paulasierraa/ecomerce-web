import views from "../views/shopping-cart/shopping-cart.html";
import { environment } from "../environments/environments";

const keyLocalStorage = "Productos";
const divElement = document.createElement("div");
divElement.innerHTML = views;
const items = divElement.querySelector("#items-cart");
const fragment = document.createDocumentFragment();
const templateProduct = divElement.querySelector("#product-row").content;
let user = JSON.parse(localStorage.getItem("userInformation"));
let subtotal = 0;
let total=0;
const getProductById = async (id) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/products.routes.php?id=${id}`
  );
  return await response.json();
};

const createSale = async ({ id, date, id_seller_fk, id_client_fk }) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/sale.routes.php?id=${id}&date=${date}&id_seller_fk=${id_seller_fk}&id_client_fk=${id_client_fk}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la petición";
      }
    })
    .catch((error) => console.log(error));
};

const createSaleProduct = async ({ id_sale, id_product, amount }) => {
  console.log(id_sale, id_product, amount);
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleProduct.routes.php?id_sale=${id_sale}&id_product=${id_product}&amount=${amount}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la petición";
      }
    })
    .catch((error) => console.log(error));
};

const getSale = async () => {
  const response = await fetch(
    environment.endpoint+"/ecommerce-core/routes/sale.routes.php",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return await response.json();
};

export default () => {
  const products = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

  products.forEach(async (idProduct) => {
    const product = await getProductById(idProduct);
    renderProductCart(product);
  });

  items.addEventListener("click", deleteProductCart);
  divElement.addEventListener("click", finishShop);

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
    subtotal = parseInt(subtotal) + parseInt(p.price);
    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  let iva = subtotal * 0.19; //no cambiar
  let descuento =0; //no cambiar
  if(Number(user.id_rol_fk)==6) //no cambiar
  {
    descuento = (subtotal+iva)*0.05;
    divElement.querySelector("#descuento").textContent = `${descuento}`;
  }
  total = (subtotal+iva)-descuento; 
  divElement.querySelector("#subtotalCard").textContent = `Subtotal: ${subtotal}`;
  divElement.querySelector("#iva").textContent = `Iva: ${iva}`; //no cambiar
  divElement.querySelector("#totalCard").textContent = `Total: ${total}`;
};

const deleteProductCart = (event) => {
  if (event.target.classList.contains("btn-outline-dark")) {
    const id = event.target.dataset.id;
    const products = readLocalStorage() || [];
    const nuevoArray = products.filter((e) => e !== id);
    localStorage.setItem(keyLocalStorage, JSON.stringify(nuevoArray));
    window.location.reload();
  }
};

const readLocalStorage = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorage));
};

const finishShop = async (event) => {
  if (event.target.classList.contains("btn-success")) {
    const user = JSON.parse(localStorage.getItem("userInformation"));
    const saleProduct = {
      id: 0,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
      id_seller_fk: user.id,
      id_client_fk: user.id,
    };
    await createSale(saleProduct);

    const sale = await getSale();

    const products = readLocalStorage() || [];

    products.forEach(async (id) => {
      const product = await getProductById(id);
      console.log(product);

      let saleProducts = {
        id_sale: sale.id,
        id_product: id,
        amount: product[0].price,
      };

      await createSaleProduct(saleProducts);
    });

    localStorage.removeItem(keyLocalStorage);
    divElement.querySelector("#alertShop").classList.remove("d-none");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
};
