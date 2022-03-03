import views from '../views/dashboard/category/category.html';
import '../views/dashboard/category/category.css';

export default ()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}