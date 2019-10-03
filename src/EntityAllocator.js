import EntityIndex from './EntityIndex';

export default class {
  constructor(capacity) {
    this.entities = new Array(capacity).fill();

    this.entities.forEach((_, i) => {
      this.entities[i] = { active: false, generation: 0 };
    });
  }

  allocate() {
    const index = this.entities.findIndex((entity) => !entity.active);
    const entity = this.entities[index];

    if (entity && !entity.active) {
      entity.active = true;
      entity.generation += 1;

      return new EntityIndex(index, entity.generation);
    }

    return null;
  }

  deallocate(entityIndex) {
    const entity = this.entities[entityIndex.index];

    if (entity.generation === entityIndex.generation) {
      entity.active = false;
    }
  }
}
