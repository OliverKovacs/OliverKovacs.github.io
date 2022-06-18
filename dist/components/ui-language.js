import style from "./ui-contact.css.js";
const template = document.createElement("template");
template.innerHTML = `
<style>${style}</style>
<a href="">
    <img src="">
</a>
`;
class UIIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        const icon = `./assets/${this.getAttribute("icon")}`;
        const href = this.getAttribute("href");
        this.shadowRoot
            .querySelector("a")
            .setAttribute("href", href);
        this.shadowRoot
            .querySelector("img")
            .setAttribute("src", icon);
    }
}
window.customElements.define("ui-icon", UIIcon);
//# sourceMappingURL=ui-language.js.map