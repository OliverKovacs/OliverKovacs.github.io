// This is terrible code but it provides enough abstraction to ignore it
export default class WebGLShaderRenderer {
    constructor(id, resolution) {
        this.vertexShaderPath = "/assets/shaders/vertex.glsl";
        this.programInfo = {
            shaders: [
                { type: "vertex", },
                { type: "fragment" },
            ],
            uniforms: [],
            attributes: ["position"],
        };
        this.id = id;
        this.resolution = resolution;
        this.initCanvas();
        this.initWebGLRenderingContext();
        this.initVertexBuffer();
    }
    ;
    static downloadShader(path) {
        return fetch(path).then(res => res.text());
    }
    initCanvas() {
        this.canvas = document.getElementById(this.id);
        this.canvas.width = this.resolution[0];
        this.canvas.height = this.resolution[1];
        this.canvas.style.width = this.resolution[0];
        this.canvas.style.height = this.resolution[1];
    }
    initWebGLRenderingContext() {
        this.gl = this.canvas.getContext("webgl", {
            antialias: false,
            depth: false,
        });
        if (!this.gl)
            return alert("WebGL not supported");
        this.shader = {
            [this.gl.VERTEX_SHADER]: "vertex",
            [this.gl.FRAGMENT_SHADER]: "fragment",
            vertex: this.gl.VERTEX_SHADER,
            fragment: this.gl.FRAGMENT_SHADER,
        };
    }
    initVertexBuffer() {
        this.vertices = new Float32Array([
            -1, 1, 0, 0,
            1, 1, 1, 0,
            -1, -1, 0, 1,
            1, -1, 1, 1,
        ]);
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
        this.vertexCount = this.vertices.length / 4;
    }
    async setShader(vertex, fragment) {
        // @ts-ignore
        this.programInfo.shaders[0].code = await WebGLShaderRenderer.downloadShader(vertex);
        // @ts-ignore
        this.programInfo.shaders[1].code = await WebGLShaderRenderer.downloadShader(fragment);
        this.shaderProgram = this.buildShaderProgram();
        this.gl.enableVertexAttribArray(this.shaderProgram.attributes.position);
        this.gl.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.gl.FLOAT, false, 4 * 4, 0);
    }
    compileShader(code, type) {
        const gl = this.gl;
        let shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Error compiling ${this.shader[type]} shader:\n${gl.getShaderInfoLog(shader)}`);
        }
        return shader;
    }
    buildShaderProgram() {
        let program = this.gl.createProgram();
        this.programInfo.shaders.forEach(desc => {
            // @ts-ignore
            let shader = this.compileShader(desc.code, this.shader[desc.type]);
            if (shader)
                this.gl.attachShader(program, shader);
        });
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error(`Error linking shader program:\n${this.gl.getProgramInfoLog(program)}`);
        }
        let uniforms = Object.fromEntries(this.programInfo.uniforms.map(name => [name, this.gl.getUniformLocation(program, name)]));
        let attributes = Object.fromEntries(this.programInfo.attributes.map(name => [name, this.gl.getAttribLocation(program, name)]));
        return { program, uniforms, attributes };
    }
    start() {
        this.ms = 0;
        window.requestAnimationFrame(ts => this.loop(ts));
    }
    loop(ts) {
        window.requestAnimationFrame(ts => this.loop(ts));
        this.dt = ts - this.ms;
        this.ms = ts;
        this.gl.useProgram(this.shaderProgram.program);
        this.callback(this.gl, this.shaderProgram);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexCount);
    }
    callback(a, b) { }
}
;
//# sourceMappingURL=webgl.js.map