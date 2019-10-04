import EntityIndex from './EntityIndex';

export default class {
  constructor(capacity, type) {
    this.entries = [...Array(capacity)].map(() => (
      // eslint-disable-next-line new-cap
      { active: false, generation: 0, component: new type() }
    ));
  }

  allocate(entityIndex, opts = { resetComponent: false }) {
    const entry = this.entries[entityIndex.index];

    if (entry.generation <= entityIndex.generation) {
      entry.active = true;
      entry.generation = entityIndex.generation;

      if (opts.resetComponent) {
        entry.component.constructor();
      }

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
