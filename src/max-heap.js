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
		this.detachRoot();
		this.restoreRootFromLastInsertedNode();
		this.shiftNodeDown(this.root);
		return this.root.data
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
			this.parentNodes.push(node)
			return
		}
		else {
			this.parentNodes[this.parentNodes.length -1].appendChild(node);
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
