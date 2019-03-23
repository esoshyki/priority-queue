const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		var nod = new Node(data, priority);
		this.insertNode(nod);
		this.shiftNodeUp(nod);
	}

	pop() {
		if (this.isEmpty()) {
			return 
		}
		const popedroot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(popedroot);
	//	this.shiftNodeDown(this.root);
		return popedroot.data
	}

	detachRoot() {

		if (this.parentNodes.indexOf(this.root) >= 0) {
		this.parentNodes.shift();}
		const Root = this.root;
		this.root = null;
		this.currentSize -= 1;
		return Root
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!detached.left) {
			return
		}
		var lastInsertedNode = this.parentNodes[this.parentNodes.length-1]
		this.root = lastInsertedNode;
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		if (detached.left) { lastInsertedNode.left.parent = lastInsertedNode};
		if (detached.right) { lastInsertedNode.right.parent = lastInsertedNode};
		if (this.parentNodes.length <= 2) {
			this.parentNodes[0] = lastInsertedNode;
			this.parentNodes[1] = lastInsertedNode.left;
		}
		else {
			this.parentNodes.pop();
			this.parentNodes.unshift(lastInsertedNode.parent)
			
		}

}

	size() {
		return this.currentSize
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
		  this.root = node;
		  this.parentNodes.push(node);
		  this.currentSize += 1;
		  return
		}
		if (this.currentSize == 1) {
		  this.root.appendChild(node);
		  this.parentNodes.push(node);
		  this.currentSize += 1;
		  return
		  }
		if (this.currentSize == 2) {
		  this.root.appendChild(node);
		  this.parentNodes.shift();
		  this.parentNodes.push(node);
		  this.currentSize += 1;
		  return
		}
		if (this.currentSize > 2) {
		  if (this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.shift();
			this.parentNodes.push(node);
			this.currentSize += 1;
			return
		  }
		  else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.currentSize += 1;
		  }
	  }
	}
	
	shiftNodeUp(node) {
		if (!node) {
			return
		}
		if (!node.parent) {
			this.root = node;
			
			return
		}

		if (node.parent.priority < node.priority) {
			if (this.parentNodes.indexOf(node.parent) >= 0 && this.parentNodes.indexOf(node) >= 0) {
				var indexup = this.parentNodes.indexOf(node.parent);
				var indexdown = this.parentNodes.indexOf(node);
				this.parentNodes[indexup] = node;
				this.parentNodes[indexdown] = node.parent
			} 
			else if (this.parentNodes.indexOf(node.parent) < 0 && this.parentNodes.indexOf(node) >= 0) {
				var index = this.parentNodes.indexOf(node);
				this.parentNodes[index] = node.parent
			}
		}
		else {
			return
		}
		node.swapWithParent()
		this.shiftNodeUp(node)
	}



	shiftNodeDown(node) {
		if (!node) {
			return
		}
		if (this.parentNodes.length <2 ) {
			return
		}
		if (!node.left) {
			if (node.parent.right) {
				var index = this.parentNodes.indexOf(node.parent);
				this.parentNodes[index] = node
			}
			else { 
				var indexup = this.parentNodes.indexOf(node.parent.parent);
				var indexdown = this.parentNodes.indexOf(node.parent)
				this.parentNodes[indexup] = node.parent
				this.parentNodes[indexdown] = node
			}
			return
		}
		if (node.left.priority > node.priority) {
			if (node.right) {
				if (node.left.priority > node.right.priority) {
					node.left.swapWithParent()
				}
				else if (node.right.priority > node.priority) {node.right.swapWithParent()}
			}
			else {
				node.left.swapWithParent()
			}
			if (!node.parent.parent) {
				this.root = node.parent
			}
		}
		else if (node.right) { 
			if (node.right.priority < node.priority) 
			{node.right.swapWithParent()} 
		}
		else {
			return
		}
		this.shiftNodeDown(node)
			
	}
	}

module.exports = MaxHeap;
