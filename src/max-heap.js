const Node = require('./node');

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
		
		this.parentNodes.pop();
		const Root = this.root;
		this.root = null;
		return Root;
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

module.exports = MaxHeap;
