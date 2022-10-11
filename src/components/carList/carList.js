class CarList extends HTMLElement {
  contentElement;
  filterElement;

  cars = [];

  connectedCallback() {
    const div = document.createElement("div");
    const image = document.createElement("img");

    div.id = "spinner";
    image.src = "../../assets/spinner.svg";

    div.appendChild(image);
    this.replaceChildren(div);

    // simulates an async endpoint request
    setTimeout(() => {
      this.fetchCars("./data/cars.json");
    }, 1000);
  }

  fetchCars(url) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.cars = json;
        this.setupCarList();
      })
      .catch((error) => {
        console.error("Error getting cars response: ", error);
      });
  }

  async setupCarList() {
    const resp = await fetch("/components/carList/carList.html");
    const html = await resp.text();
    this.setHTML(html);

    this.contentElement = document.querySelector(".car-list__content");
    this.filterElement = document.getElementById("car-filter");
    this.filterElement.onkeyup = (e) => this.filterCarList(e);

    this.renderCarList(this.cars);
  }

  renderCarList(carList) {
    let html = "";

    carList.forEach((car, index) => {
      const id = `${index}-${car.modelClass}-${car.version}`.replaceAll(
        " ",
        "-"
      );
      const name = `${car.modelClass} ${car.version}`;

      html += `<car-card id="${id}" name="${name}" image="${car.imagePath}" price="${car.price.amount}"></car-card>`;
    });

    this.contentElement.innerHTML = html;
  }

  filterCarList(e) {
    const filterText = e.target.value.toLowerCase();

    const carName = (car) => `${car.modelClass} ${car.version}`.toLowerCase();

    if (filterText.length > 2) {
      const carsFiltered = this.cars.filter((car) =>
        carName(car).includes(filterText)
      );

      carsFiltered.length > 0
        ? this.renderCarList(carsFiltered)
        : this.renderNoFilterMessage();
    } else {
      this.renderCarList(this.cars);
    }
  }

  renderNoFilterMessage() {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.height = "75vh";
    div.style.width = "918px";

    const message = document.createElement("span");
    message.setHTML("No cars with that name were found :(");

    div.appendChild(message);

    this.contentElement.replaceChildren(div);
  }
}

customElements.define("car-list", CarList);
