const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.isEmpty()) return 
		const popedroot = this.detachRoot()
		this.restoreRootFromLastInsertedNode(popedroot)
		this.shiftNodeDown(this.root)
		return popedroot.data
	}

	detachRoot() {
		if (this.parentNodes.indexOf(this.root) >= 0) this.parentNodes.shift()
		const Root = this.root
		this.root = null
		this.currentSize -= 1
		return Root
	}

	restoreRootFromLastInsertedNode(detached) {
		const size = this.size() + 1;
		if (size == 1) return

		const node = this.parentNodes.pop()
		this.root = node
		node.appendChild(detached.left)
		node.appendChild(detached.right)
		if (size == 3) this.parentNodes.unshift(node.right)
		if (size > 3) {
		if (size%2 != 0) {
				this.parentNodes.unshift(node.parent)
			}
		}
		node.parent = null
}

	size() {
		return this.currentSize
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {
		this.root = null
		this.parentNodes = []
		this.currentSize = 0
	}

	insertNode(node) {
		if (this.isEmpty()) {
		  this.root = node;
		  this.parentNodes.push(node)
		  this.currentSize += 1
		  return
		}
		if (this.currentSize == 1) {
		  this.root.appendChild(node)
		  this.parentNodes.push(node)
		  this.currentSize += 1
		  return
		  }
		if (this.currentSize == 2) {
		  this.root.appendChild(node)
		  this.parentNodes.shift()
		  this.parentNodes.push(node)
		  this.currentSize += 1
		  return
		}
		if (this.currentSize > 2) {
		  if (this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node)
			this.parentNodes.shift()
			this.parentNodes.push(node)
			this.currentSize += 1
			return
		  }
		  else {
			this.parentNodes[0].appendChild(node)
			this.parentNodes.push(node)
			this.currentSize += 1
		  }
	  }
	}
	
	shiftNodeUp(node) {
		if (!node) return
		if (!node.parent) {
			this.root = node;
			return
			}

		if (node.parent.priority < node.priority) {
			if (this.parentNodes.indexOf(node.parent) >= 0 && this.parentNodes.indexOf(node) >= 0) {
				const indexup = this.parentNodes.indexOf(node.parent);
				const indexdown = this.parentNodes.indexOf(node);
				this.parentNodes[indexup] = node;
				this.parentNodes[indexdown] = node.parent
				} 
			else if (this.parentNodes.indexOf(node.parent) < 0 && this.parentNodes.indexOf(node) >= 0) {
				const index = this.parentNodes.indexOf(node);
				this.parentNodes[index] = node.parent
				}
			}
		else return

		node.swapWithParent()
		this.shiftNodeUp(node)
	}


	shiftNodeDown(node) {
		if (!node) return
		let Child = null;

		if (node.left && node.left.priority > node.priority) {
			Child = node.left
			}
		if (node.right) {
			if (!Child && node.right.priority > node.priority) {
				Child = node.right
				}
			else {
				if (node.right.priority > node.priority && node.right.priority > Child.priority) {
					Child = node.right
					}
				}
			}

		if (!Child) return

		if (this.parentNodes.indexOf(Child) >= 0 && this.parentNodes.indexOf(node) < 0) {
			const index = (this.parentNodes.indexOf(Child));
			this.parentNodes[index] = node;
		}
		else if (this.parentNodes.indexOf(Child) >=0 && this.parentNodes.indexOf(node) >= 0) {
			const indexup = this.parentNodes.indexOf(node);
			const indexdown = this.parentNodes.indexOf(Child);
			this.parentNodes[indexup] = Child;
			this.parentNodes[indexdown] = node;
		}
		if (Child && !node.parent) {
			this.root = Child
		}
		Child.swapWithParent();
		this.shiftNodeDown(node)
		}
	}
module.exports = MaxHeap;
