#version 300 es
out vec4 color;
void main(void) {
    vec3 pos = vec3(0.0);
    pos.x = float(gl_VertexID % 2) * 2.0 - 1.0;
    pos.y = float(gl_VertexID / 2) * 2.0 - 1.0;
    pos.z = - pos.x * pos.y;
    gl_Position = vec4(pos, 1.0);
    color = gl_Position;
}