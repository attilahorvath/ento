export default class {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 100;
    this.canvas.height = 50;

    document.body.appendChild(this.canvas);

    this.gl = this.canvas.getContext('webgl');

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  clear() {
    this.gl.disable(this.gl.SCISSOR_TEST);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.enable(this.gl.SCISSOR_TEST);
  }
}
