class CarsPage extends HTMLElement {
    connectedCallback() {
        if (window.innerWidth < 1024) {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.height = "100vh";
            div.style.backgroundColor = "black";

            document.body.appendChild(div);

            const message = document.createElement("span");
            message.style.color = "white"
            message.setHTML("I look much better in a wide window ;)");

            div.appendChild(message);
        } else {
            const header = document.createElement('custom-header');
            const carList = document.createElement('car-list');
            const footer = document.createElement('custom-footer');

            document.body.appendChild(header);
            document.body.appendChild(carList);
            document.body.appendChild(footer);
        }
    }
}

customElements.define("cars-page", CarsPage);
