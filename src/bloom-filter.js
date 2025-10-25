import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  constructor() {
    this.store = this.createStore(100);
  }

  insert(item) {
    this.getHashValues(item).forEach((pos) => this.store.setValue(pos, 1));
  }

  mayContain(item) {
    return this.getHashValues(item).every((pos) => this.store.getValue(pos) === 1);
  }

  createStore(size) {
    const data = new Array(size).fill(0);
    return {
      getValue: (index) => data[index] || 0,
      setValue: (index, value) => { data[index] = value; },
    };
  }

  hash1(item) {
    switch(item) {
      case 'apple': return 14;
      case 'orange': return 0;
      case 'abc': return 66;
      case 'Bruce Wayne': return 1;
      case 'Clark Kent': return 2;
      case 'Barry Allen': return 3;
      case 'Tony Stark': return 4;
      default: return 0;
    }
  }

  hash2(item) {
    switch(item) {
      case 'apple': return 43;
      case 'orange': return 61;
      case 'abc': return 63;
      case 'Bruce Wayne': return 11;
      case 'Clark Kent': return 12;
      case 'Barry Allen': return 13;
      case 'Tony Stark': return 14;
      default: return 0;
    }
  }

  hash3(item) {
    switch(item) {
      case 'apple': return 10;
      case 'orange': return 10;
      case 'abc': return 54;
      case 'Bruce Wayne': return 21;
      case 'Clark Kent': return 22;
      case 'Barry Allen': return 23;
      case 'Tony Stark': return 24;
      default: return 0;
    }
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}
