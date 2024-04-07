import WebGLShaderRenderer from "./webgl.js";
import Vector from "./vector.js";
let resolution;
let position = [2, 0];
let color = 0x21 / 255;
color = 0;
let background = [color, color, color, 1.0];
let zoom = 0.3;
let start = Date.now();
const wheel = canvas => event => {
    event.preventDefault();
    const rectangle = canvas.getBoundingClientRect();
    const speed = -0.003;
    const nzoom = zoom * (1 + event.deltaY * speed);
    const mouse = [event.clientX - rectangle.left, event.clientY - rectangle.top];
    let uv = Vector.scalar(Vector.subtract(Vector.scalar(mouse, 2), resolution), 1 / resolution[1]);
    position = Vector.add(position, Vector.scalar(uv, (zoom - nzoom) / (zoom * nzoom)));
    zoom = nzoom;
};
export default async (res, obj) => {
    resolution = res;
    let renderer = new WebGLShaderRenderer("canvas", resolution);
    renderer.programInfo.uniforms = [
        "resolution",
        "position",
        "background",
        "zoom",
        "time",
    ];
    await renderer.setShader("/assets/shaders/mandelbrot/vertex.glsl", "/assets/shaders/mandelbrot/fragment.glsl");
    renderer.callback = (gl, shaderProgram) => {
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        gl.uniform2fv(shaderProgram.uniforms.resolution, resolution);
        gl.uniform2fv(shaderProgram.uniforms.position, position);
        gl.uniform4fv(shaderProgram.uniforms.background, background);
        gl.uniform1f(shaderProgram.uniforms.zoom, zoom);
        gl.uniform1f(shaderProgram.uniforms.time, Date.now() - start + obj.phase);
    };
    renderer.canvas.onwheel = wheel(renderer.canvas);
    renderer.start();
};
//# sourceMappingURL=mandelbrot.js.map