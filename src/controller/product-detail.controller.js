import views from '../views/product/product-detail/product-detail.html';
import '../views/product/product-detail/product-detail.css';

export default ()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}