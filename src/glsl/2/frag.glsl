#version 300 es
precision mediump float;
uniform float width, height;
uniform sampler2D tex;
out vec4 color;
void main(void) {
    color = texture(tex, vec2(gl_FragCoord.x / width, gl_FragCoord.y / height));
}