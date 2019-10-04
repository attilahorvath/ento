import spriteVertexShader from '../shaders/sprite.vert';
import spriteFragmentShader from '../shaders/sprite.frag';

import Shader from './Shader';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.body.appendChild(this.canvas);

    this.gl = this.canvas.getContext('webgl');

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.spriteShader = new Shader(this.gl,
      spriteVertexShader, spriteFragmentShader);

    this.projection = new Float32Array([
      2.0 / this.width, 0.0, 0.0, 0.0,
      0.0, -2.0 / this.height, 0.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      -1.0, 1.0, 0.0, 1.0,
    ]);

    this.view = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  createVertexBuffer(vertices) {
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    return vertexBuffer;
  }

  updateVertexBuffer(vertexBuffer, vertices) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  }

  draw(shader, vertexBuffer, count) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

    shader.projection = this.projection;
    shader.view = this.view;

    shader.use(this.gl);

    this.gl.drawArrays(this.gl.POINTS, 0, count);
  }
}
