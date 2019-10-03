import Game from './Game';
import SpriteSystem from './systems/SpriteSystem';
import InputSystem from './systems/InputSystem';

const game = new Game();

game.addSystem(InputSystem);
game.addSystem(SpriteSystem);

game.createEntity({
  Tilemap: {},
});

game.createEntity({
  Position: {
    x: 20,
    y: 10,
  },
  Sprite: {
    width: 10,
    height: 10,
  },
  Input: {},
});

game.createEntity({
  Position: {
    x: 50,
    y: 30,
  },
  Sprite: {
    width: 10,
    height: 20,
  },
  Input: {},
});

game.run();
