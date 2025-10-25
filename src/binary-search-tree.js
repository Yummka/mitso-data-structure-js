import { NotImplementedError } from "../extensions/index.js";
import { Node } from "../extensions/list-tree.js";

export default class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this._root) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (!node) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // узел без детей
        if (!node.left && !node.right) return null;
        // узел с одним ребенком
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // узел с двумя детьми
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;
    let current = this._root;
    while (current.left) current = current.left;
    return current.data;
  }

  max() {
    if (!this._root) return null;
    let current = this._root;
    while (current.right) current = current.right;
    return current.data;
  }
}
