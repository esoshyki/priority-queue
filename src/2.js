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
		if (!detached.left) {
			return
		}
		let lastInsertedNode = null
		if (this.parentNodes.length < 3) {
		lastInsertedNode = this.parentNodes[this.parentNodes.length-1]
		}
		else {
			lastInsertedNode = this.parentNodes.pop()
			if (lastInsertedNode.parent.priority > lastInsertedNode.priority) {
				this.parentNodes.unshift(lastInsertedNode.parent)
			}
		}

		console.log('lastdetached = ' + lastInsertedNode.priority)
		console.log(this.parentNodes[0].priority)
		if (lastInsertedNode) {
		lastInsertedNode.parent.removeChild(lastInsertedNode);
		this.root = lastInsertedNode;
		lastInsertedNode.left = detached.left;
		lastInsertedNode.right = detached.right;
		lastInsertedNode.parent = null;
		if (lastInsertedNode.left) { lastInsertedNode.left.parent = lastInsertedNode};
		if (lastInsertedNode.right) { lastInsertedNode.right.parent = lastInsertedNode};
		console.log(h.parentNodes.map(n=>n.priority));
		if (this.parentNodes.indexOf(lastInsertedNode) >= 1 && this.parentNodes.length == 2) {
			console.log('trueeeeee')
				if (lastInsertedNode.left && !lastInsertedNode.right) {
				this.parentNodes[0] = lastInsertedNode;
				this.parentNodes[1] = lastInsertedNode.left
			}
		}
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
			if (this.parentNodes.indexOf(node.parent) >= 0 && this.parentNodes.indexOf(node) >= 0) {
				var indexup = this.parentNodes.indexOf(node.parent);
				var indexdown = this.parentNodes.indexOf(node);
				this.parentNodes[indexup] = node;
				this.parentNodes[indexdown] = node.parent
			} 
			else if (this.parentNodes.indexOf(node.parent) < 0 && this.parentNodes.indexOf(node) >= 0) {
				var index = this.parentNodes.indexOf(node);
				this.parentNodes[index] = node.parent
			}
		}
		else {
			return
		}

		node.swapWithParent()
		this.shiftNodeUp(node)
	}


	shiftNodeDown(node) {
		if (!node) {
			return
		}
		var Child = null;

		if (node.left && node.left.priority > node.priority) {
			Child = node.left
		}
		if (node.right) {
			if (!Child && node.right.priority > node.priority) {
				Child = node.right
			}
			else {
				if (node.right.priority > node.priority && node.right.priority > Child.priority) {
					Child = node.right
				}
			}
		}

		if (!Child) {
			return
		}

		if (this.parentNodes.indexOf(Child) >= 0 && this.parentNodes.indexOf(node) < 0) {
			var index = (this.parentNodes.indexOf(Child));
			this.parentNodes[index] = node;
		}
		else if (this.parentNodes.indexOf(Child) >=0 && this.parentNodes.indexOf(node) >= 0) {
			var indexup = this.parentNodes.indexOf(node);
			var indexdown = this.parentNodes.indexOf(Child);
			this.parentNodes[indexup] = Child;
			this.parentNodes[indexdown] = node;
		}
		if (Child && !node.parent) {
			this.root = Child
		}
		Child.swapWithParent();
		
		this.shiftNodeDown(node)
			

	}
}
class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
		this.maxSize = maxSize }
		else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap;
 	}

	push(data, priority) {
		if (this.heap.size() >= this.maxSize) {
			throw('to much!')
		}
		this.heap.push(data, priority);

	}

	shift() {
		if (this.heap.isEmpty()) {
			throw('empty')
		}
		let returnedData = []
		for (var i=0; i<this.size; i++) {
		
		returnedData.push(recurs(this.heap))
	}
		return returnedData;
	
	}
	recurs(heap) {
		return heap.pop;
	}
	size() {
		return this.heap.size()
	}

	isEmpty() {
		return this.heap.isEmpty()
	}
}
q = new PriorityQueue();

const expectedData = [3, 5, 1, 0, 4, 2];
q.push(0, 10);
console.log(q.heap.parentNodes.map(n=>n.priority))
q.push(1, 15);
console.log(q.heap.parentNodes.map(n=>n.priority))
q.push(2, 4);
console.log(q.heap.parentNodes.map(n=>n.priority))
q.push(3, 17);
console.log(q.heap.parentNodes.map(n=>n.priority))
q.push(4, 6);
console.log(q.heap.parentNodes.map(n=>n.priority))
q.push(5, 17);
console.log(q.heap.parentNodes.map(n=>n.priority))


q.shift()
