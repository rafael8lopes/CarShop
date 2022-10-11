class CustomHeader extends HTMLElement {
  async connectedCallback() {
    const resp = await fetch("/components/header/header.html");
    const html = await resp.text();
    this.setHTML(html);

    const cartElement = document.querySelector("#cart-total");
    cartElement.dataset.selectedCars = "";
  }
}

customElements.define("custom-header", CustomHeader);
