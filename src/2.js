
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
	let TrueParent = this.parent;
	let Parent = new Node;
	Parent.Clone(this.parent);
	let Child = new Node;
	Child.Clone(this);
	if (this.parent.parent) {
		let grandparent = this.parent.parent;
		if (grandparent.left == this.parent) {
			grandparent.left = this;
			this.parent = grandparent;
		}
		else if (grandparent.right == this.parent) {
			grandparent.right = this;
			this.parent = grandparent;
		}

	if (Parent.left == this ) {
		console.log('here')
		this.left = Parent;
		this.right = Parent.right;
		if (Parent.right) {
		Parent.right.parent = this;}
		Parent.parent = this;
	}
	else if (Parent.right == this) {
		this.right = Parent;
		this.left = Parent.left;
		if (Parent.left) {
		Parent.left.parent = this;}
		Parent.parent = this;
	}

	Parent.left = Child.left;
	if (Child.left) {
	Child.left.parent = Parent;
	}
	
	Parent.right = Child.right;
	if (Child.right) {
	Child.right.parent = Parent;
	}	
	}
	TrueParent = Parent;
	console.log(TrueParent)
}
Clone(node) {
	this.data = node.data;
	this.priority = node.priority;
	this.left = node.left;
	this.right = node.right;
	this.parent = node.parent;
	}

}

const root = new Node(8, 8);
const child = new Node(4, 4);
const grandson = new Node(2, 2);

root.appendChild(child);
child.appendChild(grandson);

grandson.swapWithParent();

console.log(child.parent == grandson)


