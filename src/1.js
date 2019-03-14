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

	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null
		}
		else if (this.right == node) {
			this.right = null
		}
		else if (node.parent != this) {
			throw('Node is not child of it');
		};
		}
	

	remove() {
		if (!this.parent) {
			return
		}
		else {	
			console.log(this.data);
		}
	}
			

	swapWithParent() {
		if (!this.parent) {
			return
		}
		if (this.parent.parent.left == this.parent) {
			this.parent.parent.left = this;
		}
		if (this.parent.parent.right == this.parent) {
			this.parent.parent.right = this;
		}
	}
}

var a = new Node(4, 24);
var b = new Node(3, 22);
a.appendChild(b);
console.log(b.parent);
b.remove();