const template = document.createElement("template");
template.innerHTML = `
Hello World!
`;
class UIElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define("ui-element", UIElement);
//# sourceMappingURL=ui-element.js.map