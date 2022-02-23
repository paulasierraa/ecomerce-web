import views from '../views/home/home/home.html';
import '../views/home/home/home.css';

export default()=>{
    const divElement = document.createElement("div");
    divElement.innerHTML = views;
    return divElement;
}