import views from "../views/shopping-cart/shopping-cart.html";
import { environment } from "../environments/environments";
import { router } from "../router/index.routes";

export const currencyFormat = (number) => new Intl.NumberFormat('es-CO', {style: 'currency',currency: 'COP', minimumFractionDigits: 2}).format(number);


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

const getProductsCart = async (id_sale) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleProduct.routes.php?id_sale=${id_sale}`
  );
  return await response.json();
};

const getSaleState = async (idClient) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleState.routes.php?idClient=${idClient}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return await response.json();
}


export default async() => {
  const user = JSON.parse(localStorage.getItem("userInformation"));
  const sale = await getSaleState(user.id);

  if(sale[0].state === "1"){
    const products = "";
  } else {
    const products = await getProductsCart(sale[0].id);

  products.forEach( async(productSale) => {
    const product = await getProductById(productSale.id_product);
    renderProductCart(product, productSale.amount);
  });
  }

  
  
  items.addEventListener("change", async (event) => {
    event.preventDefault();
    const idProduct = event.target.id;
    const amount = event.target.value;
    await updateSaleProduct(idProduct, amount);
    window.location.reload();
  });

  items.addEventListener('click', async (event) => {
    const idProduct = event.target.dataset.id;
    await deleteProductCart(idProduct);
    window.location.reload();
  });

  divElement.addEventListener('click', async(event) => {
    if(event.target.classList.contains("btn-success")){
      const total = divElement.querySelector("#totalCard").textContent;
      await finishShopping(total);
      window.location.reload();
    }
  })
  

  return divElement;
};

const renderProductCart = (product, mount) => {
  product.forEach((p) => {
    templateProduct.querySelector("#name").textContent = p.name;
    templateProduct.querySelector(".img-flag").src = p.image;
    templateProduct.querySelector("#price").textContent = currencyFormat(p.price);
    templateProduct.querySelector(".input-amount").value = mount;
    templateProduct.querySelector(".input-amount").setAttribute("id", p.id);
    templateProduct.querySelector("#total").textContent = currencyFormat(p.price * mount);
    templateProduct.querySelector(".btn-outline-dark").dataset.id = p.id;
    subtotal = parseInt(subtotal) + (parseInt(p.price) * parseInt(mount));
    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  let iva = subtotal * 0.19; //no cambiar
  let descuento =0; //no cambiar
  if(Number(user.id_rol_fk)==6) //no cambiar
  {
    descuento = (subtotal+iva)*0.05;
    divElement.querySelector("#descuento").textContent = `${currencyFormat(descuento)}`;
  }
  total = (subtotal+iva)-descuento; 
  divElement.querySelector("#subtotalCard").textContent = `Subtotal: ${currencyFormat(subtotal)}`;
  divElement.querySelector("#iva").textContent = `Iva: ${currencyFormat(iva)}`; //no cambiar
  divElement.querySelector("#totalCard").textContent = `Total: ${currencyFormat(total)}`;
};

const updateSaleProduct = async (idProduct, amount) => {
  const user = JSON.parse(localStorage.getItem("userInformation"));
  const sale = await getSaleState(user.id);
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleProduct.routes.php?id_sale=${sale[0].id}&id_product=${idProduct}&amount=${amount}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
    }
  );
}

const deleteProductCart = async (idProduct) => {
  const user = JSON.parse(localStorage.getItem("userInformation"));
  const sale = await getSaleState(user.id);
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleProduct.routes.php?id_product=${idProduct}&id_sale=${sale[0].id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
}

const finishShopping = async (total) => {
  const precioTotal = total.split("$")[1];
  let precioSinComilla = replaceAll(precioTotal, ",", "");
  let precioSinPunto = replaceAll(precioSinComilla, ".", "");
  const user = JSON.parse(localStorage.getItem("userInformation"));
  const sale = await getSaleState(user.id);
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/saleProduct2.routes.php?id=${sale[0].id}&date=${date}&state=${1}&total=${precioSinPunto.trim()}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
    }
  );
}

function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

