class CustomFooter extends HTMLElement {
    async connectedCallback() {
        const resp = await fetch("/components/footer/footer.html");
        const html = await resp.text();
        this.setHTML(html);
    }
}

customElements.define("custom-footer", CustomFooter);
