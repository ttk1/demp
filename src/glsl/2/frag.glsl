#version 300 es
precision mediump float;
uniform sampler2D tex;
out vec4 color;
void main(void) {
    color = texelFetch(tex, ivec2(gl_FragCoord.xy), 0);
}