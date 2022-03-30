import views from "../views/dashboard/category/category.html";
import "../views/dashboard/category/category.css";
import { environment } from "../environments/environments";

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;

  const bodyTable = divElement.querySelector("#list-category");
  const btnSearch = divElement.querySelector("#btnSearch");
  const btnGuardar = divElement.querySelector("#btnGuardar");

  btnSearch.addEventListener("click", (event) => {
    let filter = divElement.querySelector("#txtBuscarCategoria").value;
    search(filter, divElement);
  });

  btnGuardar.addEventListener("click", (event) => {
    // event.preventDefault();

    const category = divElement.querySelector("#txtCategoria").value;
    create(category, divElement);
  });

  const categories = await getAll();
  setListCategories(categories, bodyTable);
  return divElement;
};
const search = async (filter, divElement) => {
  if (filter.trim() == "") {
    // divElement.innerHTML="";
    const categories = await getAll();
    setListCategories(categories, divElement);
  } else {
    console.log("hola");
  }
};
function setListCategories(list, elementHtml) {
  list.forEach((element) => {
    elementHtml.innerHTML += `
        <tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        </tr>
        `;
  });
}
export const getAll = async () => {
  const response = await fetch(
    `${environment.endpoint}/ecommerce-core/routes/category.routes.php`
  );
  return await response.json();
};
function create(category, divElement) {
  const bodyTable = divElement.querySelector("#list-category");
  const modal = divElement.querySelector("#modalCategoryForm");
  const modalBackDrop = divElement.querySelector(".modal-backdrop");

  fetch(
    `${environment.endpoint}/ecommerce-core/routes/category.routes.php?category=${category}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      //si la respuesta es correcta
      if (response.ok) {
        //parsea la información devuelta
        response.json().then((data) => {
          let newDate = data[0];
          limpiarFormulario(divElement);
          bodyTable.innerHTML += `
        <tr>
        <td>${newDate.id}</td>
        <td>${newDate.category}</td>
        </tr>
        `;
        });
      } else {
        throw "Error en la petición";
      }
    })
    .catch((error) => console.log(error));
}
function limpiarFormulario(divElement) {
  divElement.querySelector("#txtCategoria").value = "";
  divElement.querySelector("#txtIdCategoria").value = "";
}
