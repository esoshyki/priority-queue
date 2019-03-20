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
		else {
		this.detachRoot();
		this.restoreRootFromLastInsertedNode();
		this.shiftNodeDown(this.root);
		return this.root.data
	}
	}

	detachRoot() {
		
		this.parentNodes.shift();
		const Root = this.root;
		this.root = null;
		this.currentSize -= 1;
		return Root
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.currentSize
		}


	isEmpty() {
		return this.size() == 0
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
	
	if (this.parentNodes.indexOf(node) >= 0) {
		let nodeIndex = this.parentNodes.indexOf(node)
		let parentIndex = this.parentNodes.indexOf(node.parent);
		this.parentNodes[nodeIndex] = node.parent;
		if (node.parent) {
		this.parentNodes[parentIndex] = node.parent.parent; 
	}
	this.root = node;
	} 
	while (node.parent) {

		node.swapWithParent()
		this.shiftNodeUp(node);
	}


}
	


	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
