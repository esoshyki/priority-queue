
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
	// Делаем клонов нода и родителя
	let Child = new Node;
	Child.Clone(this);
	let Parent = new Node;
	Parent.Clone(this.parent);
	let OtherChild = new Node;
	if (this.parent.left == this) {
	OtherChild.Clone(Parent.right);}
	else if (this.parent.right == this) {
	OtherChild.Clone(Parent.left);
	}
	console.log(OtherChild);
	// Если нод является левым ребенком родителя 
	if (this.parent.left == this) {
		/* Если у родителя есть правый потомок то присваиваем 
		клону правого потомка истинного родителя*/
		if (this.parent.right) {
		this.right = OtherChild;
		OtherChild.parent = this;
 };
		/* Присваивем клону левого потомка Parent */ 
		this.left = Parent;
		this.parent = Parent.parent;

	}
	else if (this.parent.right = this) {
		if (this.parent.left) {
			this.left = OtherChild;
			Parent.left.parent = this;
			OtherChild.parent = this;
		}
		this.right = Parent;
		this.parent = Parent.parent;

	}

	Parent.parent = this;
	Parent.left = Child.left;
	Parent.right = Child.right;
	if (Child.left != null) {Child.left.parent = Parent;}
	if (Child.right != null) {Child.right.parent = Parent}

/*	console.log(this) */

}
Clone(node) {
	this.data = node.data;
	this.priority = node.priority;
	this.left = node.left;
	this.right = node.right;
	this.parent = node.parent;
}

ParentRebase(node) {
	if (node.parent) {
		if (node.parent.left == node)
	{}
}
}

}

var newNode = new Node(4, 5);
var leftNode = new Node(1, 3)
var rightNode = new Node(2, 4);
var leftNodeLeftNode = new Node(3, 6);
var leftNodeRightNode = new Node(5, 7);


newNode.appendChild(leftNode);
newNode.appendChild(rightNode);
leftNode.appendChild(leftNodeLeftNode);
leftNode.appendChild(leftNodeRightNode);
leftNodeLeftNode.swapWithParent();



console.log("---------------------------");
console.log(leftNodeLeftNode.right);
/*
console.log('__________________________________')
console.log(newNode);
console.log(leftNode);
console.log('__________________________________')



console.log('__________________________________')
console.log(newNode);
console.log(leftNode);
console.log('__________________________________') */