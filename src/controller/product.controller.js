import views from '../views/dashboard/product/product.html';
import '../views/dashboard/product/product.css';

export default ()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}