import views from "../views/product/product-home/product-home.html";
import { environment } from "../environments/environments";

const divElement = document.createElement("div");
divElement.innerHTML = views;

export const currencyFormat = (number) => new Intl.NumberFormat('es-CO', {style: 'currency',currency: 'COP', minimumFractionDigits: 2}).format(number);

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


const getProducts = async () => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/product.routes.php`
  );
  return await response.json();
};

const getProductById = async (id) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/products.routes.php?id=${id}`
  );
  return await response.json();
};

const getProductsPaginate = async (pagina, regPagina) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/paginate-products.routes.php?pagina=${pagina}&regPagina=${regPagina}`
  );
  return await response.json();
};

export default async () => {
  
  

  const products = await getProductsPaginate(0,8);
  
  renderProducts(products);
  renderButtonPaginate();

 

  console.log(divElement);

  return divElement;
};

const renderProducts = (products) => {
  const templateCard = divElement.querySelector("#template-card").content;
  const items = divElement.querySelector("#card-products");
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.name;
    templateCard.querySelector("img").src = product.image;
    templateCard.querySelector("p").textContent = currencyFormat(product.price);
    templateCard.querySelector("a").href = `#/product-detail?id=${product.id}`;
    templateCard.querySelector(".btn-cart").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  items.addEventListener('click', async(event) => {
    await addToCart(event);
  });
}

const renderButtonPaginate = async() => {
  const templateNav = divElement.querySelector("#navigation-link").content;
  const items = divElement.querySelector("#navigation-products");
  const fragment = document.createDocumentFragment();

  const products = await getProducts();
  let ammountButtonsPaginate = 0;
  const productsByPage = 8;

  (products.length % 2 === 0) 
    ? ammountButtonsPaginate = products.length / productsByPage 
    : ammountButtonsPaginate = ammountButtonsPaginate = Math.trunc(products.length / productsByPage + 1);

  for(let i = 0; i < ammountButtonsPaginate; i++){
    templateNav.querySelector("button").textContent = (i+1);
    const clone = templateNav.cloneNode(true);
    fragment.appendChild(clone);
  }

  items.appendChild(fragment);

}

const createSale = async ({ id, date, id_client_fk, state, total }) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/sale.routes.php?id=${id}&date=${date}&id_client_fk=${id_client_fk}&state=${state}&total=${total}`,
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

const addToCart = async (event) => {
  if(event.target.classList.contains("btn-cart")){
    const idProduct = event.target.dataset.id;
    const user = JSON.parse(localStorage.getItem("userInformation"));
    const statesSale = await getSaleState(user.id);
    let estado;


    if(statesSale.length === 0){
      estado = "2";
    } else {
      estado = statesSale[0].state;
    }

    switch(estado){
      case "0":
        await newSaleProduct(idProduct, statesSale[0].id);
        break;
      case "1":
        await newSale(user.id);
        const sale1 = await getSaleState(user.id);
        await newSaleProduct(idProduct, sale1[0].id);
        break;
      case "2":
        let sale;
        await newSale(user.id);
        sale = await getSaleState(user.id);
        await newSaleProduct(idProduct, sale[0].id);
        break;    
    }

  
    // setTimeout(() => {
    //   divElement.querySelector("#alertProduct").classList.remove("d-none");
    // }, 2000);
  }
};

const newSale = async (id) => {
  const newSale = {
    id: 0,
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    id_client_fk: id,
    state: 0,
    total: 0
  };

  await createSale(newSale);
}

const newSaleProduct = async (idProduct, saleId) => {
    const product = await getProductById(idProduct);


    let saleProduct = {
      id_sale: saleId,
      id_product: product[0].id,
      amount: 1
    };

    await createSaleProduct(saleProduct);
}