
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

	}

	push(data, priority) {
		var nod = new Node(data, priority);
		this.insertNode(nod);
		this.shiftNodeUp(nod);
	}

	pop() {
		
	}

	detachRoot() {
		
		this.parentNodes.pop();
		this.root = null;
		return this.root;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		if (this.root) {
		return this.parentNodes.length}
		else { 
			return 0;
		}
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return
		}
		else {
		if (this.parentNodes[0].left == this.parentNodes[this.parentNodes.length - 1])
			{
				this.parentNodes[0].appendChild(node);
				this.parentNodes.shift();
				this.parentNodes.push(node);
			}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		}
	/*		var index = this.parentNodes.length;
			this.parentNodes.push(node);
			var parentIndex = Math.floor((index-1)/2);
			this.parentNodes[parentIndex].appendChild(node); */
		}
	}

	
	shiftNodeUp(node) {
		this.root = node;
		if (this.parentNodes.indexOf(node) >= 0) {
			let nodeIndex = this.parentNodes.indexOf(node)
			let parentIndex = this.parentNodes.indexOf(node.parent);
			this.parentNodes[nodeIndex] = node.parent;
			this.parentNodes[parentIndex] = node.parent.parent;
		} 
		while (node.parent) {

			node.swapWithParent()
			this.shiftNodeUp(node);
		}


	}

	shiftNodeDown(node) {
		
	}
}

h = new MaxHeap();

h.root = new Node(0, 10);
h.root.appendChild(new Node(1, 5));
h.root.appendChild(new Node(2, 7));
h.root.left.appendChild(new Node(3, 20));
/**
        10                       20
       /  \                     /  \
      5    7  - shift up ->   10   7
     /                        /
    20                       5
**/
h.parentNodes = [
	h.root.left,
	h.root.right,
	h.root.left.left,
];

const newRoot = h.root.left.left;


	const correctParentNodesOrderAfterShiftUp = [
		h.root,
		h.root.right,
		h.root.left
	]

h.shiftNodeUp(h.root.left.left);
console.log(h.root == newRoot);
console.log('________________________')
console.log(correctParentNodesOrderAfterShiftUp[2].priority)
console.log(h.root.left.priority)
console.log(h.parentNodes[0] == correctParentNodesOrderAfterShiftUp[0]);
console.log(h.parentNodes[1] == correctParentNodesOrderAfterShiftUp[1]);
console.log(h.parentNodes[2] == correctParentNodesOrderAfterShiftUp[2]);
