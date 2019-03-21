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
		this.shiftNodeDown(this.root);
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
			if (this.parentNodes.length >= 2) {
			var newNode = this.parentNodes.pop();
			newNode.left = detached.left;
			if (detached.left) {
			detached.left.parent = newNode; }
			if (detached.right) {
			detached.right.parent = newNode; }
			newNode.right = detached.right;
			this.root = newNode;
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
		if (!node.parent) {
			return
		}
		if (this.parentNodes.length <= 1) {
			return
		}
		if (this.parentNodes.length == 2) { 
			if (node.parent.left && !node.parent.right) {
				node.swapWithParent();
				this.parentNodes.push(this.parentNodes.shift());
				this.root = node;
				return
			}
			if (node.parent.left && node.parent.right) {
				var index = this.parentNodes.indexOf(node);
				this.parentNodes[index] = node.parent;
				node.swapWithParent();
				this.root = node
				return
			}
		}

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
	if (!node) {
		return
	}

	if (!node.left) {
		return
	}

	if (this.parentNodes.length == 0 || this.parentNodes.length == 1) {
		return
	}
	if (this.parentNodes.length == 2) {
		if (!this.parentNodes[0].left) {
			node.left.swapWithParent();
			this.root = node.parent;
			this.parentNodes[0] = node;
		}

		else {
			node.left.swapWithParent();
			this.root = node.parent;
			this.parentNodes[0] = node.parent;
			this.parentNodes[1] = node;
		}
		return
	}
	if (this.parentNodes[0].left) {
		
		if ( this.parentNodes[this.parentNodes.length-1] == node.left) {
			this.parentNodes[0] = node.left;
			this.parentNodes[this.parentNodes.length-1] = node;
		}
		node.left.swapWithParent();
		if ( !node.parent.parent ) {this.root = node.parent}
		this.shiftNodeDown(node)
		return
	}
	if (!this.parentNodes[0].left) {
		if (this.parentNodes[this.parentNodes.length-2].parent == node) {
			node.left.swapWithParent();
			this.parentNodes[this.parentNodes.length-2] = node
			return
		}
		node.right.swapWithParent();
		if (!node.parent.parent) {this.root = node.parent};
		this.shiftNodeDown(node);
		return
	}

}
}

module.exports = MaxHeap;
