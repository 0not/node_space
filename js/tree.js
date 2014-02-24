function Node(id, parents, children) {
	this.id       = id;  		// Required
	this.parents  = parents;
	this.children = children;
}

Node.prototype.addChild = function (node) {
	if (!this.children.hasOwnProperty(node.id))
		this.children[node.id] = node;
}

Node.prototype.removeChild = function (tree) {
	var id = tree;
	
	if (tree.hasOwnProperty("id"))
		id = tree.id;
		
	delete this.children[id];
}

Node.prototype.getChildren = function () {
	return this.children;
}

Node.prototype.getSiblings = function() {
	var siblings = {};
	
	for (var p in this.getParents()) {
		for (var s in p.getChildren()) {
			if (!siblings.hasOwnProperty(s.id))
				siblings[s.id] = s;
		}
		
		delete siblings[this.id];  // Don't return self
	}
	
	return siblings;
	
}

Node.prototype.getParents = function () {
	return this.parents;
}

var kent   = new Node("kent");
var kakala = new Node("kakala");
var kara   = new Node("kara", {kent, kakala});
var kam    = new Node("kam", {kent, kakala});