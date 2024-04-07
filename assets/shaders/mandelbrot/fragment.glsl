precision highp float;

uniform vec2 resolution;
uniform vec2 position;
uniform vec4 background;
uniform float zoom;
uniform float time;
const float i = 1000.0;

void main() {
    vec2 uv = 2.0 * (gl_FragCoord.xy / resolution.y) - vec2(resolution.x / resolution.y, 1.0);
    uv.y *= -1.0;
    vec2 _0 = uv / zoom - position;

    float x = _0.x;
    float y = _0.y;
    float o;

    for (float m = 0.0; m < i; m++) {
        if (!(x * x + y * y < 4.0)) {
            o = m;
            break;
        }
        float xtemp = x * x - y * y + _0.x;
        y = 2.0 * x * y + _0.y;
        x = xtemp;
    }

    float speed = 0.00002;
    float k = 0.01;
    o *= (3.1415 + k) / i;
    gl_FragColor = vec4(
        (cos(61.0 * (time * speed + o - k)) + 1.0) / 2.0,
        (cos(51.0 * (time * speed + o - k)) + 1.0) / 2.0,
        (cos(11.0 * (time * speed + o - k)) + 1.0) / 2.0,
        1.0
    );

    if (o < 0.025) {
        gl_FragColor = background;
    }
}