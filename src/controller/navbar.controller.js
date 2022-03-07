
function setPermisos() {
    const divElement = document.getElementById("navbar-element");
    console.log("navbar", divElement);
    let user = JSON.parse(localStorage.getItem("userInformation"));
    let id_rol = user.id_rol_fk;
    if (id_rol == "1") {
        const category = divElement.querySelector("#option-category");
        const product = divElement.querySelector("#option-product");
        const logOut = divElement.querySelector("#option-logout");

        category.classList.remove("d-none");
        product.classList.remove("d-none");
        logOut.classList.remove("d-none")
    }
}


window.onload = function () {

    if (localStorage.getItem("userInformation") != null && localStorage.getItem("userInformation") != undefined) {
        setPermisos();
    }
    let salirBtn = document.getElementById("option-logout");
    salirBtn.addEventListener("click", (event) => {
        localStorage.removeItem("userInformation")
        window.location.href = ""
    })

};

export { setPermisos }