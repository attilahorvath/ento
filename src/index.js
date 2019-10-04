import Game from './Game';
import SpriteSystem from './systems/SpriteSystem';
import InputSystem from './systems/InputSystem';

import aStarTest from './aStarTest';

const game = new Game();

game.addSystem(InputSystem);
game.addSystem(SpriteSystem);

aStarTest(game);

game.createEntity({
  Position: {
    x: 200,
    y: 100,
  },
  Sprite: {
    width: 10,
    height: 10,

    blue: 0.0,
  },
  Input: {},
});

game.run();
