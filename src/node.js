class Node {
	constructor(data, priority) {
		this.Child = null;
		this.Parent = null;
		this.node = [data, priority];

	}

	appendChild(node) {
		this.Child = node;
		node.Parent = this.node;
	}

	removeChild(node) {
		this.Child = null;
	}

	remove() {
		if (this.Parent) {
			this.Parent.Child = this.Child;
		}
		else {
			this.Child.Parent = null;
		}
	}

	swapWithParent() {
		if (this.Parent) {
			this.Parent.Child = this.Child;
			this.Child = this.Parent;
		}	
	}
}

module.exports = Node;
