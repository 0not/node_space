function Node(id, parents, children) {
	this.id       = id;  		// Required
	this.parents  = new NodeGroup(parents);
	this.children = new NodeGroup(children);
	
	if (this.parents == null) {
		this.parents = new NodeGroup();
	} else {
		for (var p in this.parents.getMembers()) {
			this.parents.getMembers()[p].addChild(this);
		}
	}
	
	if (this.children == null) {
		this.children = new NodeGroup();
	} else {
		for (var c in this.children.getMembers()) {
			this.children.getMembers()[c].addParent(this);
		}
	}
}

Node.prototype.addChild = function (node) {
	this.children.add(node);
}

Node.prototype.removeChild = function (node) {
	this.children.remove(node);
}

Node.prototype.getChildren = function () {
	return this.children;
}

Node.prototype.getSiblings = function() {
	var siblings = new NodeGroup();
	
	for (var p in this.getParents().getMembers()) {
		for (var s in p.getMembers()) {
			siblings.add(s);
		}
		
		siblings.remove(this.id);  // Don't return self
	}
	
	return siblings;
}

Node.prototype.addParent = function (node) {
	this.parents.add(node);
}

Node.prototype.removeParent = function (node) {
	this.parents.remove(node);
}

Node.prototype.getParents = function () {
	return this.parents;
}

function NodeGroup(members) {
	this.members = {};
	
	if (members == null) {
		members = this.members;
	}
	if (members.constructor.name == "NodeGroup") {
		for (var m in members.getMembers()) {
			this.members[m.id] = m;
		}
	} else if (members.constructor.name == "Array") {
		for (var i = 0; i < members.length; i++) {
			this.members[members[i].id] = members[i];
		}
	} else { // assume already formatted
		this.members = members;
	}
}

NodeGroup.prototype.getMembers = function() {
	return this.members;
}

NodeGroup.prototype.add = function(node) {
	if (!this.members.hasOwnProperty(node.id))
		this.members[node.id] = node;
}

NodeGroup.prototype.remove = function(node) {
	var id = node;
	
	if (node.hasOwnProperty("id"))
		id = node.id;
		
	delete this.members[id];
}
/*
var kent    = new Node("kent");
var kakala  = new Node("kakala");
var parents = {kent: kent, kakala: kakala};
var evie    = new Node("evie");
var kara    = new Node("kara", parents, {evie: evie});

var amelie  = new Node("amelie", {kara: kara});
var kam     = new Node("kam", parents);

var ng = new NodeGroup([kent, kakala, kara, kam]);
*/