import WebGLUtil from "./webgl.js";
import Matrix4 from "./util/matrix.js";
import Keyboard from "./util/keyboard.js";
import Vector3 from "./util/vector.js";
export default class RendererSystem {
    constructor() {
        this.time_speed = 50;
        this.offset_speed = 50;
        this.shader_frequency = 10;
        this.shader_phase = 0;
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0,];
        this.scale = Vector3.from(10);
        this.rotate_speed = 5;
    }
    async init() {
        this.canvas = document.querySelector("#canvas");
        this.gl = this.canvas.getContext("webgl");
        const description = await WebGLUtil.createShaderDescription(this.gl, "/assets/shaders/lorenz/vertex.glsl", "/assets/shaders/lorenz/fragment.glsl");
        this.program = WebGLUtil.createProgram(this.gl, description);
        this.uniforms = WebGLUtil.getUniformLocations(this.gl, this.program, [
            "resolution",
            "list",
            "config",
            "color",
            "offset",
            "matrix",
        ]);
        this.attributes = WebGLUtil.getAttributeLocations(this.gl, this.program, [
            "position",
        ]);
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.attributes.position);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    }
    render(engine) {
        this.rotation = Vector3.add(this.rotation, Vector3.scalar([0.0003, 0.002, 0.005], this.rotate_speed / 5));
        this.rotation = Vector3.add(this.rotation, Vector3.scalar(
        // @ts-ignore
        [Keyboard.Digit1, Keyboard.Digit2, Keyboard.Digit3], 
        // @ts-ignore
        (2 * Keyboard.ShiftLeft - 1) * 0.04));
        let matrix = Matrix4.identity();
        matrix = Matrix4.translate(matrix, this.translation[0], this.translation[2], this.translation[1]);
        matrix = Matrix4.rotate_x(matrix, this.rotation[0]);
        matrix = Matrix4.rotate_y(matrix, this.rotation[1]);
        matrix = Matrix4.rotate_z(matrix, this.rotation[2]);
        // @ts-ignore
        matrix = Matrix4.scale(matrix, ...this.scale);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.uniform2f(this.uniforms.resolution, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        if (getComputedStyle(document.body).getPropertyValue('background-color') === "rgb(0, 0, 0)") {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        }
        else {
            this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        }
        const size = 4;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.gl.vertexAttribPointer(this.attributes.position, size, type, normalize, stride, offset);
        this.gl.uniformMatrix4fv(this.uniforms.matrix, false, matrix);
        this.gl.uniform3f(this.uniforms.list, engine.index, engine.lines[0].points.length, engine.time);
        const mode = this.gl.LINE_STRIP;
        const count = engine.lines[0].points.length - 1;
        for (let i = 0; i < engine.lines.length; i++) {
            const first = i * engine.lines[0].points.length;
            this.gl.uniform1f(this.uniforms.offset, i);
            this.gl.drawArrays(mode, first, count);
        }
    }
    set_rotate_speed(value) {
        this.rotate_speed = value;
    }
    set_size(value) {
        this.scale = Vector3.from(value / 5);
    }
    set_shader_speed(value) {
        this.time_speed = value;
        this.update_shader_uniform();
    }
    set_shader_offset(value) {
        this.offset_speed = value;
        this.update_shader_uniform();
    }
    set_shader_frequency(value) {
        this.shader_frequency = value;
        this.update_shader_uniform();
    }
    set_shader_phase(value) {
        this.shader_phase = value;
        this.update_shader_uniform();
    }
    update_canvas_size() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    update_shader_uniform() {
        this.gl.uniform4f(this.uniforms.config, this.time_speed, this.offset_speed, this.shader_frequency, this.shader_phase);
    }
}
//# sourceMappingURL=renderer.js.map