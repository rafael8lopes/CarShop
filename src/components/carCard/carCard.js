// parses the cart total string to a valid float string
function parseCartPrice(price) {
  return price.replace(".", "").replace(",", ".")
}

function formatPrice(price) {
  // switch decimal point to decimal comma
  const priceWithComma = price.toFixed(2).replace('.', ',');
  // add an point between every decimal place
  return priceWithComma.replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

class CarCard extends HTMLElement {
  carElement = document.getElementById(this.id);
  nameElement;
  imageElement;
  priceElement;
  addCartBtnElement;

  cartTotalElement;
  isSelected = false;

  async connectedCallback() {
    const resp = await fetch("/components/carCard/carCard.html");
    const html = await resp.text();
    this.setHTML(html);

    this.nameElement = this.carElement.querySelector(".car-card__name");
    this.imageElement = this.carElement.querySelector(".car-card__image");
    this.priceElement = this.carElement.querySelector(".car-card__price");
    this.addCartBtnElement = this.carElement.querySelector(".car-card__add-cart-btn");

    this.cartTotalElement = document.querySelector("#cart-total");
    this.isSelected = this.cartTotalElement.dataset.selectedCars.includes(this.id);

    this.setup();
  }

  setup() {
    const price = this.carElement.getAttribute("price");

    this.nameElement.setHTML(this.carElement.getAttribute("name"));

    this.imageElement.src = this.carElement.getAttribute("image");

    this.priceElement.setHTML(`${formatPrice(parseFloat(price))} €`);

    this.carElement.addEventListener("click", () =>
      this.updateCart(price)
    );

    if (this.isSelected) {
      this.addSelectedModifiers();
    }
  }

  updateCart(price) {
    const cartValue = parseFloat(parseCartPrice(this.cartTotalElement.innerText));
    const carPrice = parseFloat(price);

    let newCartTotal = 0;

    if (this.isSelected) {
      newCartTotal = cartValue - carPrice;
      this.removeSelectedModifiers();

      this.isSelected = false;
      this.cartTotalElement.dataset.selectedCars = this.cartTotalElement.dataset.selectedCars.replace(this.id, "");
    } else {
      newCartTotal = cartValue + carPrice;
      this.addSelectedModifiers();

      this.isSelected = true;
      this.cartTotalElement.dataset.selectedCars += this.id;
    }

    this.cartTotalElement.setHTML(formatPrice(newCartTotal));
  }

  addSelectedModifiers() {
    this.priceElement.classList.add("car-card__price--selected");

    this.addCartBtnElement.setHTML("Remove from Shopping Bag");
    this.addCartBtnElement.classList.add("car-card__add-cart-btn--selected");
  }

  removeSelectedModifiers() {
    this.priceElement.classList.remove("car-card__price--selected");

    this.addCartBtnElement.setHTML("Add to Shopping Bag");
    this.addCartBtnElement.classList.remove("car-card__add-cart-btn--selected");
  }
}

// Define the new element
customElements.define("car-card", CarCard);
