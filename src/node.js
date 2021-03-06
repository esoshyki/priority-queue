class Node {
	constructor(data, priority) {
		this.left = null;
		this.right = null;
		this.parent = null;
		this.data = data;
		this.priority = priority;
	}

	appendChild(node) {
		if (!this.left) this.left = node
		else if (this.left && this.right) return
		else this.right = node
		if (node) node.parent = this;
	}

	removeChild(node) {
		if (this.left == node) this.left = null
		else if (this.right == node) this.right = null
		else if (node.parent != this) throw('Node is not child of it')
		if (node) node.parent =null
	}
		
	remove() {
		if (!this.parent) return
		else this.parent.removeChild(this)
		
		if (this.left) this.left.parent = null
		if (this.right) this.right.parent = null
	}
			

	swapWithParent() {
		if (!this.parent) return

		const childCopy = new Node;
		childCopy.Clone(this);
		const Parent = this.parent;
		if (Parent.parent) {
			if (Parent.parent.left == Parent) Parent.parent.left = this
			else if (Parent.parent.right == Parent) Parent.parent.right = this
			}
	
		if (Parent.left == this) {
			this.left = Parent;
			this.right = Parent.right; 
			if (this.right) this.right.parent = this
			}
		else {
			this.right = Parent;
			this.left = Parent.left;
			if (this.left) this.left.parent = this
			}
	
			this.parent = Parent.parent
			Parent.left = childCopy.left;
			Parent.right = childCopy.right;
	
			if (Parent.left) Parent.left.parent = Parent
			if (Parent.right) Parent.right.parent = Parent
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


module.exports = Node;
