#version 300 es
out float result;
uniform sampler2D tex;
void main(void) {
    result = texelFetch(tex, ivec2(gl_VertexID, 0), 0).x;
}