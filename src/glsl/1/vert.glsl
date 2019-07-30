#version 300 es
in vec3 pos;
out vec4 color;
void main(void) {
    gl_Position = vec4(pos, 1.0);
    color = gl_Position;
}