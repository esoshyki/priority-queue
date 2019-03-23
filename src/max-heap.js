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
		if (!detached.left) {
			return
		}
		let lastInsertedNode = null
		if (this.parentNodes.length < 3) {
		lastInsertedNode = this.parentNodes[this.parentNodes.length-1]
		}
		else {
			lastInsertedNode = this.parentNodes.pop()
			if (lastInsertedNode.parent.priority > lastInsertedNode.priority) {
				this.parentNodes.unshift(lastInsertedNode.parent)
			}
		}

		if (lastInsertedNode) {
		lastInsertedNode.parent.removeChild(lastInsertedNode);
		this.root = lastInsertedNode;
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		lastInsertedNode.parent = null;
		if (lastInsertedNode.left) { lastInsertedNode.left.parent = lastInsertedNode};
		if (lastInsertedNode.right) { lastInsertedNode.right.parent = lastInsertedNode};
		if (this.parentNodes.indexOf(lastInsertedNode) >= 1 && this.parentNodes.length == 2) {
				if (lastInsertedNode.left && !lastInsertedNode.right) {
				this.parentNodes[0] = lastInsertedNode;
				this.parentNodes[1] = lastInsertedNode.left
			}
		}
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
		var Child = null;

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

		if (!Child) {
			return
		}

		if (this.parentNodes.indexOf(Child) >= 0 && this.parentNodes.indexOf(node) < 0) {
			var index = (this.parentNodes.indexOf(Child));
			this.parentNodes[index] = node;
		}
		else if (this.parentNodes.indexOf(Child) >=0 && this.parentNodes.indexOf(node) >= 0) {
			var indexup = this.parentNodes.indexOf(node);
			var indexdown = this.parentNodes.indexOf(Child);
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
