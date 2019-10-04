import State from './State';
import ComponentTypes from './ComponentTypes';
import EntityAllocator from './EntityAllocator';
import Renderer from './Renderer';

export default class {
  constructor(opts = { maxEntities: 1000, width: 300, height: 150 }) {
    this.maxEntities = opts.maxEntities;
    this.width = opts.width;
    this.height = opts.height;

    this.allocator = new EntityAllocator(this.maxEntities);
    this.state = new State(this.maxEntities);

    Object.keys(ComponentTypes).forEach((type) => {
      this.state.register(ComponentTypes[type]);
    });

    this.renderer = new Renderer(this.width, this.height);

    this.systems = [];

    this.lastTime = 0;
  }

  allocateEntity() {
    return this.allocator.allocate();
  }

  deallocateEntity(entityIndex) {
    this.allocator.deallocate(entityIndex);
    this.state.deallocateAll(entityIndex);
  }

  allocateComponent(entityIndex, type) {
    return this.state.components(type).allocate(entityIndex);
  }

  fetchComponent(entityIndex, type) {
    return this.state.components(type).fetch(entityIndex);
  }

  * entitiesWith(type) {
    yield* this.state.components(type).activeEntries();
  }

  createEntity(components) {
    const index = this.allocateEntity();

    Object.keys(components).forEach((type) => {
      const component = this.allocateComponent(index, ComponentTypes[type]);

      Object.keys(components[type]).forEach((attribute) => {
        component[attribute] = components[type][attribute];
      });
    });

    return index;
  }

  addSystem(type) {
    this.systems.push(new type(this)); // eslint-disable-line new-cap
  }

  run() {
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  update(currentTime) {
    requestAnimationFrame((timestamp) => this.update(timestamp));

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.renderer.clear();

    this.systems.forEach((system) => system.run(deltaTime));
  }
}
