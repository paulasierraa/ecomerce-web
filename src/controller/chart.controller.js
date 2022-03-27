import views from '../views/charts/chart.html';
import '../views/charts/chart.css';
import { environment } from '../environments/environments';

export default()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}