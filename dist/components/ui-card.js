const style = /*css*/ `
img {
    width: 60px;
    display: block;
    margin-right: 10px;
    border-radius: 2px;
    display: inline-block;
    vertical-align:top;
    float: left;
}

a {
    text-decoration: none;
    color: #d4d4d4;

    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: row;
    flex-wrap: wrap;

    margin: 10px;
}


a:hover {
    color: #ffffff;
}

#container {
    float: right;
}
`;
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>${style}</style>
<a href="">
    <img src="" loading="lazy">
    <div id="container">
        <b><div id="title"></div></b>
        <div id="text"></div>
    </div>
</a>
`;
class UICard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        const icon = `./assets${this.getAttribute("icon")}`;
        const title = this.getAttribute("title");
        const text = this.getAttribute("text");
        const href = this.getAttribute("href");
        this.shadowRoot
            .querySelector("a")
            .setAttribute("href", href);
        this.shadowRoot
            .querySelector("img")
            .setAttribute("src", icon);
        this.shadowRoot
            .querySelector("#title")
            .innerHTML = title;
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
window.customElements.define("ui-card", UICard);
//# sourceMappingURL=ui-card.js.map