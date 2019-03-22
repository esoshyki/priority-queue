
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
			this.shiftNodeDown(node);
	}
	else {

	}
}
}

h = new MaxHeap();
h.root = new Node(0, 3);
h.root.appendChild(new Node(1, 20));
h.root.appendChild(new Node(2, 7));
h.root.left.appendChild(new Node(3, 5));

/**
3                        20
/  \                      /  \
20    7  - shift down ->   5    7
/                          /
5                          3
**/

h.parentNodes = [
	h.root.left,
	h.root.right,
	h.root.left.left,
];

const correctParentNodesOrderAfterShiftUp = [
	h.root.left.left,
	h.root.right,
	h.root
]

h.shiftNodeDown(h.root);

console.log(h.parentNodes[0] == correctParentNodesOrderAfterShiftUp[0]);
console.log(h.parentNodes[1] == correctParentNodesOrderAfterShiftUp[1]);
console.log(h.parentNodes[2] == correctParentNodesOrderAfterShiftUp[2]);