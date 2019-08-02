#version 300 es
in float original;
out float data;

void main(void) {
  gl_Position = vec4(float(gl_VertexID) / 2.0 - 1.0 + 0.25, 0.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  data = original;
}