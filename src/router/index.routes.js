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
      return content.appendChild(await pages.ShopHistory());
    }
    case "#/product-detail": {
      return content.appendChild(pages.ProductDetail());
    }
    case "#/dashboard": {
      return content.appendChild(pages.dashboard());
    }
    case "#/dashboard/productos": {
      console.log(validateAuthSeller())
      if (validateAuthSeller()) {
        return content.appendChild(await pages.product());
      }
    }
    case "#/dashboard/categoria": {
      if (validateAuthAdmin()) {
        return content.appendChild(await pages.category());
      }
    }
    case "#/dashboard/estadisticas": {
      if (validateAuthSeller()) {
        return content.appendChild(pages.chart());
      }
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


function validateAuthAdmin() {
  var auth = localStorage.getItem("userInformation");
  let user = JSON.parse(localStorage.getItem("userInformation"));
  if (!auth || user.id_rol_fk != 1) {
    window.location.replace(`${environment.principalPage}/#/`);
    return false;
  }
  return true;
}
function validateAuthSeller() {
  var auth = localStorage.getItem("userInformation");
  let user = JSON.parse(localStorage.getItem("userInformation"));
  if (!auth || Number(user.id_rol_fk != 5)) {
    if (Number(user.id_rol_fk == 1)) { return true }
    else {
      window.location.replace(`${environment.principalPage}/#/`);
      return false;
    }
  }
  return true;
}
