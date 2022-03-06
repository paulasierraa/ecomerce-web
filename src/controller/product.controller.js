import views from '../views/dashboard/product/product.html';
import '../views/dashboard/product/product.css';
import { environment } from '../environments/environments';
import { Product } from '../models/product';
export default async () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = views;

    const bodyTable = divElement.querySelector("#list-products");
    const btnSearch = divElement.querySelector("#txtBuscarProducto");
    const btnGuardar = divElement.querySelector("#btnGuardarProducto");

    btnSearch.addEventListener("click", (event) => {
        let filter = divElement.querySelector("#txtBuscarProducto").value;
        search(filter, divElement);
    })

    // btnGuardar.addEventListener("click", (event) => {
    //     // event.preventDefault();

    //     let product = new Product(
    //         0,
    //         divElement.querySelector("#txtNombre").value,
    //         divElement.querySelector("#txtDesripcion").value,
    //         divElement.querySelector("#txtPrecio").value,
    //         divElement.querySelector("#txtImagen").value,
    //         divElement.querySelector("#txtStock").value,
    //         divElement.querySelector("#txtCategoria").value ,
    //     )
    //     create(product, divElement);
    // });



    const products = await getAll();
    setListProducts(products, bodyTable);


    return divElement;
}
const search = async (filter, divElement) => {
    if (filter.trim() == "") {
        // divElement.innerHTML="";
        const categories = await getAll();
        setListProducts(categories, divElement);
    }
    else {
        console.log("hola");
    }
}
function setListCategories(list, elementHtml) {
    list.forEach(element => {
        elementHtml.innerHTML +=
            `
        <tr>
        <td>${element.id}</td>
        <td>${element.category}</td>
        <td>
            <button class="btn btn-warning">
                <i class="fas fa-edit"></i>
                Editar
            </button>
            <button class="btn btn-danger">
                <i class="fas fa-trash"></i>
                Eliminar
            </button>
        </td>
        </tr>
        `;
    });
}
function setListProducts(list, elementHtml) {
    list.forEach(element => {
        elementHtml.innerHTML +=
            `
        <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td>
        <img class='image-responsive' width="150" height="150" src='${element.image}'/>
        
        </td>
        <td>${element.stock}</td>
        <td>${element.id_category_fk}</td>
        <td>
            <button class="btn btn-warning">
                <i class="fas fa-edit"></i>
                Editar
            </button>
            <button class="btn btn-danger">
                <i class="fas fa-trash"></i>
                Eliminar
            </button>
        </td>
        </tr>
        `;
    });
}
const getAll = async () => {
    const response = await fetch(
        `${environment.endpoint}/ecommerce-core/routes/product.routes.php`
    );
    return await response.json();
};
function create(product, divElement) {
    const bodyTable = divElement.querySelector("#list-products");
    fetch
        (
            `${environment.endpoint}/ecommerce-core/routes
            /product.routes.php?
            name=${product.name}&description=${product.description}&
            price=${product.price}&image=${product.image}&stock=${product.stock}&id_category=${product.id_category}`,
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
                response.json().then(data => {
                    let newDate = data[0];
                    limpiarFormulario(divElement);
                    bodyTable.innerHTML +=
                        `
                    <tr>
                    <td>${newDate.id}</td>
                    <td>${newDate.name}</td>
                    <td>${newDate.description}</td>
                    <td>${newDate.price}</td>
                    <td>${newDate.image}</td>
                    <td>${newDate.stock}</td>
                    <td>${newDate.id_category}</td>
                    <td>
                        <button class="btn btn-warning">
                            <i class="fas fa-edit"></i>
                            Editar
                        </button>
                        <button class="btn btn-danger">
                            <i class="fas fa-trash"></i>
                            Eliminar
                        </button>
                    </td>
                    </tr>
                    `;
                });
            }
            else {
                throw "Error en la petición"
            }
        })
        .catch((error) => console.log(error))
}
function limpiarFormulario(divElement) {
    divElement.querySelector("#txtNombre").value = "";
    divElement.querySelector("#txtPrecio").value = "";
    divElement.querySelector("#txtStock").value = "";
    divElement.querySelector("#Imagen").value = "";
}