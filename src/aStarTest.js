import ComponentTypes from './ComponentTypes';

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.gScore = Number.MAX_SAFE_INTEGER;

    this.passable = true;
    this.entityIndex = null;
  }

  fScore(n) {
    return this.gScore + this.hScore(n);
  }

  hScore(n) {
    return Math.abs(this.x - n.x) + Math.abs(this.y - n.y);
  }

  dist(n) {
    return this.x !== n.x && this.y !== n.y ? 14 : 10;
  }
}

function build() {
  return [...Array(10)].map((_y, y) => [...Array(10)].map((_x, x) => new Node(x, y)));
}

function search(map, start, finish, game) {
  console.log('start', start.x, start.y);
  console.log('finish', finish.x, finish.y);

  const openSet = new Set();
  const closedSet = new Set();

  start.gScore = 0;
  openSet.add(start);

  while (openSet.size > 0) {
    let current = null;

    for (const node of openSet.values()) {
      if (!current || node.fScore(finish) < current.fScore(finish)) {
        current = node;
      }
    }

    if (current === finish) {
      console.log('found');
      let n = finish;
      while (n) {
        const sprite = game.fetchComponent(n.entityIndex, ComponentTypes.Sprite);
        sprite.red = 1.0;
        sprite.green = 1.0;
        sprite.blue = 0.0;
        console.log('f', n.x, n.y);
        n = n.parent;
      }
      return true;
    }

    openSet.delete(current);
    closedSet.add(current);

    for (let y = current.y - 1; y <= current.y + 1; y++) {
      for (let x = current.x - 1; x <= current.x + 1; x++) {
        if (y < 0 || x < 0 || y > 9 || x > 9 || (x === 0 && y === 0)) {
          continue;
        }

        const node = map[y][x];

        if (closedSet.has(node) || !node.passable) {
          continue;
        }

        const score = current.gScore + current.dist(node);

        if (score < node.gScore) {
          node.parent = current;
          node.gScore = score;
          openSet.add(node);
        }
      }
    }
  }

  console.log('fail');
  return false;
}

export default function (game) {
  const map = build();

  map.forEach((row, y) => {
    row.forEach((node, x) => {
      node.entityIndex = game.createEntity({
        Position: {
          x: x * 10,
          y: y * 10,
        },
        Sprite: {
          width: 9,
          height: 9,
        },
      });
    })
  });

  const start = map[2][2];
  const finish = map[7][8];

  const blocked = [map[3][5], map[4][5], map[5][5], map[5][4]];

  blocked.forEach((node) => node.passable = false);

  search(map, start, finish, game);

  const startSprite = game.fetchComponent(start.entityIndex, ComponentTypes.Sprite);
  startSprite.red = 0.0;
  startSprite.green = 1.0;
  startSprite.blue = 0.0;

  const finishSprite = game.fetchComponent(finish.entityIndex, ComponentTypes.Sprite);
  finishSprite.red = 1.0;
  finishSprite.green = 0.0;
  finishSprite.blue = 0.0;

  blocked.forEach((node) => {
    const blockedSprite = game.fetchComponent(node.entityIndex, ComponentTypes.Sprite);
    blockedSprite.red = 0.0;
    blockedSprite.green = 0.0;
    blockedSprite.blue = 0.0;
  });
}
