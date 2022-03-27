import views from "../views/shop/shop-history/shop-history.html";
import "../views/shop/shop-history/shop-history.css";
import { environment } from '../environments/environments';

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;
  const table = divElement.querySelector("#table-history")
  let user = JSON.parse(localStorage.getItem("userInformation"));
  switch (Number(user.id_rol_fk)) {
    //ADMIN
    case 1: {
      const sells = await getAllAdmin();
      buildTableAdmin(sells, table)
      break;
    }
    //USUARIO
    case 2: {
      // const sells= await getAllAdmin();
      break;
    }
    //VENDEDOR
    case 5: {
      const sells = await getAllSeller(user.id);
      console.log(sells)
      buildTableSeller(sells, table)

      break;
    }
    //VIP MEMBER
    case 6: {
      break;
    }
  }
  return divElement;
};

const getAllAdmin = async () => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/sale.routes.php`
  );
  return await response.json();
};
const getAllSeller = async (id) => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/sale-seller.routes.php?id=${id}`
  );
  return await response.json();
};
const getAllClient = async () => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/product.routes.php`
  );
  return await response.json();
};

function buildTableAdmin(list, elementHtml) {
  elementHtml.innerHTML +=
    `
    <thead>
    <th class="col-sm-2">Id</th>
    <th class="col-sm-3">Fecha</th>
    <th class="col-sm-2">Cliente</th>
    <th class="col-sm-3">Estado</th>
    </thead>
  `;
  list.forEach(element => {
    elementHtml.innerHTML +=
      `
      <tbody>
        <tr class="row-table-history">
          <td>
          <p class="title">
          ${element.id}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.date}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.id_client_fk}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.state}
          </p>
          </td>
        </tr>

      </tbody>
    `;
  });
}

function buildTableSeller(list, elementHtml) {
  elementHtml.innerHTML +=
    `
    <thead>
    <th>Id</th>
    <th>Fecha</th>
    <th>Cliente</th>
    <th>Estado</th>
    <th class='col-sm-2'>Producto</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Total</th>

    </thead>
  `;
  list.forEach(element => {
    elementHtml.innerHTML +=
      `
      <tbody>
        <tr class="row-table-history">
          <td>
          <p class="title">
          ${element.id}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.date}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.id_client_fk}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.state}
          </p>
          </td>
          <td>
          <img class='media-photo image-responsive' src="${element.image}"/>
          </td>
          <td>
          <p class="title">
          ${element.name}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.price}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.amount}
          </p>
          </td>
          <td>
          <p class="title">
          ${element.price * element.amount}
          </p>
          </td>
        </tr>

      </tbody>
    `;
  });
}

function buildTableClient() {

}