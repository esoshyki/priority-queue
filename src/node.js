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
		this.left = node; }
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
		var node = this;
		if (this.parent.left == this) {
			var temp = new Node(this.data, this.priority);
			temp.parent = this.parent;
			temp.left = this.left;
			temp.right = this.right;
			this.parent.parent = this;
			if (this.parent.right) {
				this.parent.right.parent = this;
			}
			this.parent.left = this.left;
			this.parent.right = this.right;
			node = temp;
		}
		if (this.parent.right == this) {
			var temp = new Node(this.data, this.priority);
			temp.parent = this.parent;
			temp.left = this.left;
			temp.right = this.right;
			this.parent.parent = this;
			if (this.parent.left) {
				this.parent.left.parent = this;
			}
			this.parent.left = this.left;
			this.parent.right = this.right;
			node = temp;
		}		
	}
}

module.exports = Node;
