uniform mat4 projection;
uniform mat4 view;

attribute vec3 vertex0Position;
attribute vec2 vertex1Size;
attribute vec4 vertex2Color;

varying vec4 color;
varying vec2 size;

void main() {
  gl_Position = projection * view * vec4(vertex0Position, 1.0);
  gl_PointSize = max(vertex1Size.x, vertex1Size.y);

  color = vertex2Color;
  size = vertex1Size;
}
