#version 300 es
out float result;
uniform sampler2D tex;
void main(void) {
    result = texture(tex, vec2(float(gl_VertexID) / 4.0 + 0.125, 0.5)).x;
}