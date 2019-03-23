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
		var lastInsertedNode = this.parentNodes.pop()
		this.root = lastInsertedNode;
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		lastInsertedNode.parent = null;
		if (detached.left) { lastInsertedNode.left.parent = lastInsertedNode};
		if (detached.right) { lastInsertedNode.right.parent = lastInsertedNode};
		console.log(h.parentNodes.map(n=>n.priority))
		if (this.size() > 3 ) {
			return
		}  
		if (this.size() == 3 && this.parentNodes.length == 2) {

			return
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
	if (!node.left) {
		return
	}
	if (!node.right) {
		if (node.priority < node.left.priority) {
			node.left.swapWithParent();
			this.parentNodes.push(this.parentNodes.shift())
			return
		}
	}
	if (node.parent) {
		if (node.parent.parent) {
			this.root = node.parent;
		}
	}
	
	if (node.right) {
		if (node.left.priority > node.priority && node.right.priority > node.priority) {
			if (node.left.priority > node.right.priority) {
				node.left.swapWithParent();
			}
			else {
				node.right.swapWithParent()
			}
		}
		else if (node.left.priority > node.priority && node.right.priority < node.priority) {
			node.left.swapWithParent()
		}
		else if (node.right.priority < node.priority && node.right.priority > node.priority) {
			node.right.swapWithParent()
		}
		else if (node.left.priority < node.priority && node.right.priority < node.priority) {
			return
		}
	}
	this.shiftNodeDown(node)
		
}
}
const h = new MaxHeap();
h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);


console.log(h.pop() == 100);
console.log(h.pop() == 0);
console.log(h.pop() == 42);
console.log(h.pop() == 15);
