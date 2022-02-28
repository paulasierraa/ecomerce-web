import { pages } from "../controller/index.controller";
import {environment} from "../environments/environments";
let content = document.getElementById("root");

const router = async (route) => {
  content.innerHTML = "";
  switch (route) {
    case "": {
      return content.appendChild(pages.Home());
    }
    case "#/": {
      return content.appendChild(pages.Home());
    }
    case "#/register": {
      return content.appendChild(pages.Register());
    }
    case "#/login": {
      return content.appendChild(pages.Login());
    }
    case "#/product-home": {
      if(validateAuth())
      {
        return content.appendChild(await pages.productHome());
      }
    }
    case "#/dashboard-productos": {
      break;
    }
    case "#/shopping-cart": {
      return content.appendChild(pages.ShoppingCart());
    }
    case "#/payment": {
      break;
    }
    case "#/history": {
      return content.appendChild(pages.ShopHistory());
    }
    case "#/product-detail": {
      return content.appendChild(pages.ProductDetail());
    }
    default: {
      break;
    }
  }
};

export { router };

function validateAuth()
{
  var auth = localStorage.getItem("userInformation");
    if(!auth)
    {
      window.location.replace(`${environment.principalPage}/#/`);
      return false;
    }
    return true;
}
