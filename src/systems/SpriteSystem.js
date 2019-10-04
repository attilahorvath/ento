import ComponentTypes from '../ComponentTypes';

export default class SpriteSystem {
  constructor(game) {
    this.game = game;
    this.renderer = this.game.renderer;

    this.vertices = new Float32Array(this.game.maxEntities
      * this.renderer.spriteShader.stride * 2);

    this.vertexBuffer = this.renderer.createVertexBuffer(this.vertices);
  }

  run() {
    let i = 0;

    for (const { entityIndex, component: sprite } of this.game.entitiesWith(ComponentTypes.Sprite)) {
      const position = this.game.fetchComponent(entityIndex, ComponentTypes.Position);

      /* eslint-disable no-plusplus */
      this.vertices[i++] = position.x;
      this.vertices[i++] = position.y;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 1.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;

      this.vertices[i++] = position.x + sprite.width;
      this.vertices[i++] = position.y;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;

      this.vertices[i++] = position.x;
      this.vertices[i++] = position.y + sprite.height;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 0.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;
      this.vertices[i++] = 1.0;

      this.vertices[i++] = position.x + sprite.width;
      this.vertices[i++] = position.y;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;

      this.vertices[i++] = position.x;
      this.vertices[i++] = position.y + sprite.height;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 0.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;
      this.vertices[i++] = 1.0;

      this.vertices[i++] = position.x + sprite.width;
      this.vertices[i++] = position.y + sprite.height;
      this.vertices[i++] = 0.0;

      this.vertices[i++] = 1.0;
      this.vertices[i++] = 1.0;
      this.vertices[i++] = 0.0;
      this.vertices[i++] = 1.0;
      /* eslint-enable no-plusplus */
    }

    this.renderer.updateVertexBuffer(this.vertexBuffer, this.vertices);

    this.renderer.draw(this.renderer.spriteShader, this.vertexBuffer,
      i / this.renderer.spriteShader.size);
  }
}
