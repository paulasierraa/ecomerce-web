import { pages } from "../controller/index.controller";

let content = document.getElementById("root");

const router = async (route) => {
  const valores = route.split("?");
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
    case "#/product-home": {
      return content.appendChild(await pages.productHome());
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
    case `#/product-detail?${valores[1]}`: {
      return content.appendChild(await pages.ProductDetail());
    }
    default: {
      break;
    }
  }
};

export { router };
