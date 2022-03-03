import { router } from "./router/index.routes";
import "./dashboard.css";

router(window.location.hash);
window.addEventListener("hashchange", () => {
    console.log(window.location.hash);
    router(window.location.hash);
});