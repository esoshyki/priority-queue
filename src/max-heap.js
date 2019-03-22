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
		if (!node) {
			return
		}
		if (!node.parent) {
			this.root = node;
			return
		}

		if (node.parent.priority < node.priority) {
			if (this.parentNodes.indexOf(node) >= 0) {
				var indexNode = this.parentNodes.indexOf(node)
				this.parentNodes[indexNode] = node.parent
			}	
			if (!node.left ) {		
			if (this.parentNodes.indexOf(node.parent) >= 0) {
				var indexParent = this.parentNodes.indexOf(node.parent);
				if (this.parentNodes[this.parentNodes.length -1] == node)
				console.log(this.parentNodes[this.parentNodes.length -1].priority)
				this.parentNodes[indexParent] = node;	
			}
		}
			node.swapWithParent()
			this.shiftNodeUp(node)
		}
		else {
			return
		}
	}


	shiftNodeDown(node) {
		if (!node) {
			return
		}
	
		if (!node.left) {
			return
		}
		if (node.right) {
		if (node.left.priority > node.priority && node.left.priority > node.right.priority) {
			console.log('left')
			if (this.parentNodes.indexOf(node.left) >= 0) {
				var indexChild = this.parentNodes.indexOf(node.left)
				this.parentNodes[indexChild] = node
			}
	
			if (this.parentNodes.indexOf(node) >= 0 && this.parentNodes.indexOf(node.left) >= 0) {
				var indexNode = this.parentNodes.indexOf(node);
				this.parentNodes[indexNode] = node.left
			}
		
			node.left.swapWithParent()
			if (!node.parent.parent) {
				this.root = node.parent
			}
	}
		else if (node.right.priority > node.priority){
			console.log('right')
			if (this.parentNodes.indexOf(node.right) >= 0) {
				var indexChild = this.parentNodes.indexOf(node.right)
				this.parentNodes[indexChild] = node
			}
			if (this.parentNodes.indexOf(node) >= 0) {
				var indexNode = this.parentNodes.indexOf(node);
				this.parentNodes[indexNode] = node.right
			}
			node.right.swapWithParent()
			if (!node.parent.parent) {
				this.root = node.parent
			}		
		 }
		else { 	if (node.left.priority > node.priority) {
			console.log('left')
			if (this.parentNodes.indexOf(node.left) >= 0) {
				var indexChild = this.parentNodes.indexOf(node.left)
				this.parentNodes[indexChild] = node
			}
	
			if (this.parentNodes.indexOf(node) >= 0 && this.parentNodes.indexOf(node.left) >= 0) {
				var indexNode = this.parentNodes.indexOf(node);
				this.parentNodes[indexNode] = node.left
			}
			if (!node.left.left) {
				this.parentNodes[0] = node.left;
			}
		
			node.left.swapWithParent()
			if (!node.parent.parent) {
				this.root = node.parent
			}
	}
			 return
			}
			console.log('[ ' + h.parentNodes[0].priority + ', ' + h.parentNodes[1].priority + ', ' + h.parentNodes[2].priority + ', ' + h.parentNodes[3].priority + ' ]')
			this.shiftNodeDown(node);
		}
		else {
	
		}
	}
}

module.exports = MaxHeap;
