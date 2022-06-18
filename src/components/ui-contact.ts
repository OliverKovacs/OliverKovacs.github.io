const style = /*css*/`
img {
    height: 20px;
    display: block;
    margin-right: 10px;
}

a:hover img {
    filter: brightness(1000%);
}

a {
    text-decoration: none;
}
`;

const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>${style}</style>
<a href="">
    <img src="">
</a>
`;

class UIContact extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const icon = `./assets/contact${this.getAttribute("icon")}`;
        const href = this.getAttribute("href");

        this.shadowRoot
            .querySelector("a")
            .setAttribute("href", href);

        this.shadowRoot
            .querySelector("img")
            .setAttribute("src", icon); 
    }
}

window.customElements.define("ui-contact", UIContact);

export {}
