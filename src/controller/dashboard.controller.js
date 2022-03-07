import views from '../views/dashboard/dashboard/dashboard.html';
import '../views/dashboard/dashboard/dashboard.css';

export default()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}