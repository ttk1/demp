#version 300 es
precision mediump float;
in float data;
out vec4 outColor;
void main(void) {
    outColor = vec4(data, 0.0, 0.0, 1.0);
}