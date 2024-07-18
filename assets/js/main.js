import Engine from "./lorenz/engine.js";
const canvas = document.querySelector("canvas");
class Scroll {
    static update() {
        this.scroll_max = document.documentElement.scrollHeight - window.innerHeight;
    }
    // [0; 1]
    static get_normalized() {
        return document.documentElement.scrollTop / this.scroll_max;
    }
}
const update_canvas_size = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.onresize = () => {
    update_canvas_size();
    Scroll.update();
};
update_canvas_size();
Scroll.update();
const amount = 100;
const length = 50;
(async () => {
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
    window.onscroll = () => {
        engine.renderer.set_shader_phase((1 - Scroll.get_normalized()) * 200);
    };
})();
//# sourceMappingURL=main.js.map