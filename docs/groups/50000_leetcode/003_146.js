// [参考](https://leetcode.cn/problems/lru-cache/solutions/2456294/tu-jie-yi-zhang-tu-miao-dong-lrupythonja-czgt/)

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.dummy = new Node()
  this.dummy.next = this.dummy
  this.dummy.prev = this.dummy
  this.keyToNode = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const node = this.getNode(key)
  return node ? node.value : -1
};
LRUCache.prototype.getNode = function(key) {
  if (!this.keyToNode.has(key)) {
    return null
  }
  const node = this.keyToNode.get(key)
  this.remove(node)
  this.pushFront(node)
  return node
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  let node = this.getNode(key)
  if (node) {
    node.value = value
    return
  }
  node = new Node(key, value)
  this.keyToNode.set(key, node)
  this.pushFront(node)
  if (this.keyToNode.size > this.capacity) {
    const oldNode = this.dummy.prev
    this.remove(oldNode)
    this.keyToNode.delete(oldNode.key)
  }
};
LRUCache.prototype.remove = function(node) {
  node.prev.next = node.next
  node.next.prev = node.prev
};
LRUCache.prototype.pushFront = function(node) {
  node.prev = this.dummy
  node.next = this.dummy.next
  node.prev.next = node
  node.next.prev = node
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */