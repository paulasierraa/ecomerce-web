import views from '../views/charts/chart.html';
import '../views/charts/chart.css';
import { environment } from '../environments/environments';
import { GoogleCharts } from 'google-charts';

const divElement = document.createElement("div");
export default async () => {
    let user = JSON.parse(localStorage.getItem("userInformation"));
    if (Number(user.id_rol_fk) == 1) {
        GoogleCharts.load(drawChartAdmin);
    }
    else if (Number(user.id_rol_fk) == 5) {
        GoogleCharts.load(drawChartSeller);
    }
    divElement.innerHTML = views;
    return divElement;
}

async function drawChartAdmin() {

    var vendedores = await getAllAdmin();
    var data = GoogleCharts.api.visualization.arrayToDataTable(getChartData(vendedores,'Vendedor'));
    var options = {
        title: 'Top Vendedores',
        legend: 'none',
    };
    var chart = new GoogleCharts.api.visualization.BarChart(divElement.querySelector('#chart'));

    chart.draw(data, options);
}
async function drawChartSeller() {
    let user = JSON.parse(localStorage.getItem("userInformation"));
    var products = await getAllSeller(user.id);
    var data = GoogleCharts.api.visualization.arrayToDataTable(getChartData(products,'Producto'));

    var options = {
        title: 'Top Productos Vendidos',
        legend: 'none',
    };

    var chart = new GoogleCharts.api.visualization.BarChart(divElement.querySelector('#chart'));

    chart.draw(data, options);
}
const getAllAdmin = async () => {
    const response = await fetch(
        `${environment.endpoint}/ecommerce-core/routes/chart-admin.routes.php`
    );
    return await response.json();
};
const getAllSeller = async (id) => {
    const response = await fetch(
        `${environment.endpoint}/ecommerce-core/routes/chart-seller.routes.php?id=${id}`
    );
    return await response.json();
};
function getChartData(list,name) {
    var aux=[];
    aux.push([name, 'Cantidad Ventas'])
    list.forEach(element => {
        aux.push([element.label, Number(element.amount)])
    });
    console.log(aux)
    return aux;
}