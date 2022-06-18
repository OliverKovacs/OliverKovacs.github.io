const style = `
div {
    background-color: #303030;
    display: inline-block;
    border-radius: 2px;
    min-width: 19px;
    text-align: center;
    margin: 0px;
    padding-left: 3px;
    padding-right: 3px;
}
`;
const template = document.createElement("template");
template.innerHTML = `
<style>${style}</style>
<div>
    <b><slot></b>
</div>
`;
class UIKey extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define("ui-key", UIKey);
export {};
//# sourceMappingURL=ui-key.js.map