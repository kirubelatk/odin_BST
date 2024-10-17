// Node Class/Factory
class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  // Tree Class/Factory
  class Tree {
    constructor(array) {
      this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b)); // Sort and remove duplicates
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
  
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }
  
    insert(value, node = this.root) {
      if (!node) return new Node(value);
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
  
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (!node) return null;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (!node.left && !node.right) return null; // Case 1: No children
        if (!node.left) return node.right; // Case 2: One child (right)
        if (!node.right) return node.left; // Case 2: One child (left)
  
        // Case 3: Two children
        const minValue = this.findMinValue(node.right);
        node.data = minValue;
        node.right = this.deleteItem(minValue, node.right);
      }
  
      return node;
    }
  
    findMinValue(node) {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current.data;
    }
  
    find(value, node = this.root) {
      if (!node) return null;
      if (value === node.data) return node;
      if (value < node.data) return this.find(value, node.left);
      return this.find(value, node.right);
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error("A callback function is required.");
      const queue = [this.root];
  
      while (queue.length) {
        const node = queue.shift();
        callback(node);
  
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback, node = this.root) {
      if (!callback) throw new Error("A callback function is required.");
      if (!node) return;
  
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  
    preOrder(callback, node = this.root) {
      if (!callback) throw new Error("A callback function is required.");
      if (!node) return;
  
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  
    postOrder(callback, node = this.root) {
      if (!callback) throw new Error("A callback function is required.");
      if (!node) return;
  
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  
    height(node) {
      if (!node) return -1;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node, root = this.root, d = 0) {
      if (!root) return -1;
      if (node === root) return d;
  
      if (node.data < root.data) return this.depth(node, root.left, d + 1);
      return this.depth(node, root.right, d + 1);
    }
  
    isBalanced(node = this.root) {
      if (!node) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      const heightDiff = Math.abs(leftHeight - rightHeight) <= 1;
      return heightDiff && this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    rebalance() {
      const nodes = [];
      this.inOrder((node) => nodes.push(node.data));
      this.root = this.buildTree(nodes);
    }
  }
  
  // prettyPrint Function
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
  
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  // Driver script
  const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
  const tree = new Tree(randomArray);
  
  console.log("Initial Tree:");
  prettyPrint(tree.root);
  
  console.log("\nIs tree balanced?", tree.isBalanced());
  
  console.log("\nLevel Order:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPre Order:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPost Order:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nIn Order:");
  tree.inOrder(node => console.log(node.data));
  
  // Unbalance the tree
  tree.insert(101);
  tree.insert(105);
  tree.insert(110);
  
  console.log("\nUnbalanced Tree:");
  prettyPrint(tree.root);
  
  console.log("\nIs tree balanced?", tree.isBalanced());
  
  // Rebalance the tree
  tree.rebalance();
  
  console.log("\nRebalanced Tree:");
  prettyPrint(tree.root);
  
  console.log("\nIs tree balanced?", tree.isBalanced());
  
  console.log("\nLevel Order after rebalance:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPre Order after rebalance:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPost Order after rebalance:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nIn Order after rebalance:");
  tree.inOrder(node => console.log(node.data));
  