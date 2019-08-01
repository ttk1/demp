#version 300 es
out vec4 color;

const vec3[4] pos = vec3[](vec3(1.0, 1.0, -1.0), vec3(-1.0, 1.0, 1.0),
                           vec3(1.0, -1.0, 1.0), vec3(-1.0, -1.0, -1.0));

void main(void) {
  gl_Position = vec4(pos[gl_VertexID], 1.0);
  color = gl_Position;
}