precision highp float;

varying vec4 color;
varying vec2 size;

void main() {
  gl_FragColor = color;

  vec2 distance = abs(gl_PointCoord - 0.5);

  if (distance.x > (size.x / size.y) / 2.0 || distance.y > (size.y / size.x) / 2.0) {
    discard;
  }
}
