import ComponentTypes from '../ComponentTypes';

export default class SpriteSystem {
  constructor(game) {
    this.game = game;
    this.renderer = this.game.renderer;

    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    document.addEventListener('keydown', (event) => this.keyDown(event));
    document.addEventListener('keyup', (event) => this.keyUp(event));
  }

  keyDown(event) {
    switch (event.keyCode) {
      case 38: case 87: case 75:
        this.up = true;
        event.preventDefault();
        break;
      case 40: case 83: case 74:
        this.down = true;
        event.preventDefault();
        break;
      case 37: case 65: case 72:
        this.left = true;
        event.preventDefault();
        break;
      case 39: case 68: case 76:
        this.right = true;
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  keyUp(event) {
    switch (event.keyCode) {
      case 38: case 87: case 75:
        this.up = false;
        event.preventDefault();
        break;
      case 40: case 83: case 74:
        this.down = false;
        event.preventDefault();
        break;
      case 37: case 65: case 72:
        this.left = false;
        event.preventDefault();
        break;
      case 39: case 68: case 76:
        this.right = false;
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  run(deltaTime) {
    for (const { entityIndex } of this.game.entitiesWith(ComponentTypes.Input)) {
      const position = this.game.fetchComponent(entityIndex, ComponentTypes.Position);

      if (this.up) {
        position.y -= 0.1 * deltaTime;
      }

      if (this.down) {
        position.y += 0.1 * deltaTime;
      }

      if (this.left) {
        position.x -= 0.1 * deltaTime;
      }

      if (this.right) {
        position.x += 0.1 * deltaTime;
      }
    }
  }
}
