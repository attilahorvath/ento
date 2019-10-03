import EntityIndex from './EntityIndex';

export default class {
  constructor(capacity, type) {
    this.entries = new Array(capacity).fill();

    this.entries.forEach((_, i) => {
      this.entries[i] = { active: false, generation: 0, component: new type() };
    });
  }

  allocate(entityIndex) {
    const entry = this.entries[entityIndex.index];

    if (entry.generation <= entityIndex.generation) {
      entry.active = true;
      entry.generation = entityIndex.generation;

      return entry.component;
    }

    return null;
  }

  fetch(entityIndex) {
    const entry = this.entries[entityIndex.index];

    if (entry.generation === entityIndex.generation && entry.active) {
      return entry.component;
    }

    return null;
  }

  deallocate(entityIndex) {
    this.entries[entityIndex.index].active = false;
  }

  * activeEntries() {
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i];

      if (entry.active) {
        yield { entityIndex: new EntityIndex(i, entry.generation), component: entry.component };
      }
    }
  }
}
