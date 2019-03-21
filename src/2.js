
class Node {
	constructor(data, priority) {
		this.left = null;
		this.right = null;
		this.parent = null;
		this.data = data;
		this.priority = priority;

	}

	appendChild(node) {
		if (!this.left) {
		this.left = node;

}
		else if (this.left && this.right) {
			return
		}
		else  { 
		this.right = node;
		}
		node.parent = this;
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
		}
		else if (this.right == node) {
			this.right = null;
		}
		else if (node.parent != this) {
			throw('Node is not child of it');
		};
		node.parent =null;
}
		
	remove() {
		if (!this.parent) {
			return
		}
		else {	
			this.parent.removeChild(this);
		}
		if (this.left) {
			this.left.parent = null;
		}
		if (this.right) {
			this.right.parent = null;
		}
	}
			

	swapWithParent() {
		if (!this.parent) {
			return
	}
	/* Эта хуйня решает updates parent.parent 
	updates parent.parent.parent
	updates child.parent*/
	let childCopy = new Node;
	childCopy.Clone(this);
	let Parent = this.parent;
	
	if (Parent.parent) {
		if (Parent.parent.left == Parent) { Parent.parent.left = this}
		else if (Parent.parent.right == Parent) { Parent.parent.right = this};
	}

	if (Parent.left == this) {
		this.left = Parent;
		this.right = Parent.right; 
		if (this.right) { this.right.parent = this}
	}
	else {
		this.right = Parent;
		this.left = Parent.left;
		if (this.left) { this.left.parent = this}
	}
	
	this.parent = Parent.parent
	Parent.left = childCopy.left;
	Parent.right = childCopy.right;
	
	if (Parent.left) {
		Parent.left.parent = Parent
	}
	if (Parent.right) {
		Parent.right.parent = Parent
	}
	Parent.parent = this
}
Clone(node) {
	this.data = node.data;
	this.priority = node.priority;
	this.left = node.left;
	this.right = node.right;
	this.parent = node.parent;
	}
}

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
			console.log('here')
			return 
		}

		let popedroot = this.detachRoot();
		this.restoreRootFromLastInsertedNode();
		this.shiftNodeDown(this.root);
		return popedroot.data
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
		if (this.parentNodes.length = 0) {
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
	
	} 
	this.root = node;
	while (node.parent) {

		node.swapWithParent()
		this.shiftNodeUp(node);
	}


} 
	shiftNodeDown(node) {
		if (!node) { return }

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

	detachRoot() {

		if (this.parentNodes.indexOf(this.root) >= 0) {
		this.parentNodes.shift();}
		const Root = this.root;
		this.root = null;
		this.currentSize -= 1;
		return Root
	}

	restoreRootFromLastInsertedNode(detached) {
			this.root = this.parentNodes.pop()
			this.parentNodes.unshift(this.root)
	
	}
}
	const h = new MaxHeap();
	h.push(42, 15);
	h.push(15, 14);
	h.push(0, 16);
	h.push(100, 100);
	console.log(this.root.data)
	console.log(h.pop() == 100);
	console.log(h.pop() == 0);
	console.log(h.pop() == 42);
	console.log(h.pop() == 15);
	
