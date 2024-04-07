var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Scroll_sum;
// import "./components/components.js";
// import "./lorenz/main.js";
import f from "./mandelbrot/mandelbrot.js";
import Engine from "./lorenz/engine.js";
const canvas = document.querySelector("canvas");
const update_canvas_size = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
class Scroll {
    static update() {
        this.heights = this.pages.map(e => e.scrollHeight);
        this.borders = this.heights.map((e, i, a) => __classPrivateFieldGet(this, _a, "m", _Scroll_sum).call(this, a.slice(0, i)) + e / 2);
        this.scroll_max = __classPrivateFieldGet(this, _a, "m", _Scroll_sum).call(this, this.heights) - window.innerHeight;
    }
    static scroll_to_page(index) {
        this.pages[index]?.scrollIntoView(true);
    }
    static scroll_to_next() {
        this.scroll_to_page(this.scroll_page() + 1);
    }
    static scroll_to_prev() {
        this.scroll_to_page(this.scroll_page() - 1);
    }
    static scroll_page() {
        let i = 0;
        while (i < this.pages.length) {
            if (document.documentElement.scrollTop < this.borders[i])
                return i;
            i++;
        }
        return i;
    }
    static get_normalized() {
        return document.documentElement.scrollTop / this.scroll_max;
    }
}
_a = Scroll, _Scroll_sum = function _Scroll_sum(a) {
    return a.reduce((p, c) => p + c, 0);
};
Scroll.pages = Array.from(document.querySelectorAll(".page"));
Scroll.update();
window.onresize = () => {
    update_canvas_size();
    Scroll.update();
};
update_canvas_size();
const amount = 100;
const length = 50;
window.onload = async () => {
    let engine = new Engine(amount, length);
    await engine.renderer.init();
    engine.start();
    engine.speed = 50;
    engine.set_amount(amount);
    engine.set_length(length);
    engine.renderer.set_size(70);
    engine.renderer.set_shader_speed(0); // 10
    engine.renderer.set_shader_frequency(3); // 10
    engine.renderer.set_shader_phase(0); // 0
    engine.renderer.set_shader_offset(10); // 20
    const obj = { phase: 0 };
    window.onscroll = () => {
        engine.renderer.set_shader_phase((1 - Scroll.get_normalized()) * 200);
        obj.phase = Scroll.get_normalized() * 10000;
    };
    document.addEventListener("keydown", event => {
        if (event.code == "KeyJ")
            Scroll.scroll_to_next();
        if (event.code == "KeyK")
            Scroll.scroll_to_prev();
        if (event.code == "Enter") {
            engine.stop();
            f([window.innerWidth, window.innerHeight], obj);
        }
    });
};
//# sourceMappingURL=main.js.map