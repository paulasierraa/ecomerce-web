import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import navBar from "./views/template/navbar/navbar.html";
import footer from "./views/template/footer/footer.html";
import "./views/template/footer/footer.css";

import { router } from "./router/index.routes";

document.getElementById("navbar").innerHTML = navBar;
document.getElementById("footer").innerHTML = footer;

window.addEventListener("hashchange", () => {
  router(window.location.hash);
});
