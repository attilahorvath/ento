import ComponentTypes from '../ComponentTypes';

export default class SpriteSystem {
  constructor(game) {
    this.game = game;
    this.renderer = this.game.renderer;
  }

  run() {
    for (const { entityIndex, component: sprite } of this.game.entitiesWith(ComponentTypes.Sprite)) {
      const position = this.game.fetchComponent(entityIndex, ComponentTypes.Position);

      this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
      this.renderer.gl.scissor(position.x, position.y, sprite.width, sprite.height);
      this.renderer.gl.clearColor(1.0, 1.0, 1.0, 1.0);
      this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT);
      this.renderer.gl.disable(this.renderer.gl.SCISSOR_TEST);
    }
  }
}
