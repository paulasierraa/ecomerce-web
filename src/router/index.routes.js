import { pages } from "../controller/index.controller";

let content = document.getElementById("root");

const router = async (route) => {
  content.innerHTML = "";
  switch (route) {
    case "#/": {
      break;
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
      break;
    }
    case "#/payment": {
      break;
    }
    case "#/history": {
      break;
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
