import { pages } from "../controller/index.controller";
import { environment } from "../environments/environments";
let content = document.getElementById("root");
let dashboardContent = document.getElementById("dashboard-content");
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
      if (validateAuth()) {
        return content.appendChild(await pages.productHome());
      }
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
    case "#/dashboard": {
      return content.appendChild(pages.dashboard());
    }
    case "#/dashboard/productos": {
      return content.appendChild(pages.product());
    }
    case "#/dashboard/categoria": {
      return content.appendChild(pages.category());
    }
    default: {
      break;
    }
  }
};

export { router };

function validateAuth() {
  var auth = localStorage.getItem("userInformation");
  if (!auth) {
    window.location.replace(`${environment.principalPage}/#/`);
    return false;
  }
  return true;
}
