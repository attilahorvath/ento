import ComponentArray from './ComponentArray';

export default class {
  constructor(capacity) {
    this.capacity = capacity;
    this.componentArrays = new Map();
  }

  register(type) {
    this.componentArrays.set(type, new ComponentArray(this.capacity, type));
  }

  components(type) {
    return this.componentArrays.get(type);
  }

  deallocateAll(entityIndex) {
    this.componentArrays.values().forEach((array) => array.deallocate(entityIndex));
  }
}
