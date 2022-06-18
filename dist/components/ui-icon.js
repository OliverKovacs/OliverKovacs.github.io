const style = /*css*/ `
img {
    width: 20px;
    display: block;
    margin-right: 10px;
    float: left;
    border-radius: 2px;
}

a {
    text-decoration: none;
    color: #d4d4d4;

    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: row;
    flex-wrap: wrap;

    margin-left: 0px;
    margin-bottom: 15px;

    height: 20px;
}

a:hover {
    color: #ffffff;
}
`;
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>${style}</style>
<a href="">
    <img src="">
    <div id="text"></div>
</a>
`;
class UIIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        const icon = `./assets${this.getAttribute("icon")}`;
        const text = this.getAttribute("text");
        const href = this.getAttribute("href");
        this.shadowRoot
            .querySelector("a")
            .setAttribute("href", href);
        this.shadowRoot
            .querySelector("img")
            .setAttribute("src", icon);
        this.shadowRoot
            .querySelector("#text")
            .innerHTML = text;
        if (href === null) {
            this.shadowRoot
                .querySelector("a")
                .style.pointerEvents = "none";
        }
    }
}
window.customElements.define("ui-icon", UIIcon);
export {};
//# sourceMappingURL=ui-icon.js.map