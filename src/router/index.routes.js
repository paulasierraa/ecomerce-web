import { pages } from "../controller/index.controller";

let content = document.getElementById("root");

const router = async (route) => {
  content.innerHTML = "";
  switch (route) {
    case "#/": {
      return content.appendChild(pages.Home());
    }
    case "#/register": {
      return content.appendChild(pages.Register());
    }
    case "#/login": {
      return content.appendChild(pages.Login());
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
