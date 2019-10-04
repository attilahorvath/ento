uniform mat4 projection;
uniform mat4 view;

attribute vec3 vertex0Position;
attribute vec4 vertex1Color;

varying vec4 color;

void main() {
  gl_Position = projection * view * vec4(vertex0Position, 1.0);

  color = vertex1Color;
}
