
var RBTree = require('bintrees').RBTree;

class Analizer {

    constructor(){
        this.catalogue = [];
        this.users = [];

    }

    addUser() {
    	this.users.push(new User(this.users.length));
    }

    getUser(id) {
    	return this.users[id];
    }

    getCatalogue() {
    	return this.catalogue;
    }

    getVideoGame(id) {
    	return this.catalogue[id];
    }

    addSellOffer(userId, videoGameId, price) {
    	var offer = new Offer(1, userId, videoGameId, price);
    	getUser(userId).addSellOffer(offer);
    	getVideoGame(videoGameId).addSellOffer(offer);
    }

    addBuyOffer(userId, videoGameId, price) {
    	var offer = new Offer(0, userId, videoGameId, price);
    	getUser(userId).addBuyOffer(offer);
    	getVideoGame(videoGameId).addBuyOffer(offer);
    }

    deleteOffer(userId, offerId) {

    }

    deleteUser() {

    }
 
}


class User {
    constructor(id) {
        this.id = id;
        this.sellList = new Set(); // Offer
        this.buyList = new Set();  // Offer
    }

    addSellOffer(offer){
    	this.sellList.add(offer);
    }

    addBuyOffer(offer){
    	this.buyList.add(offer);
    }
}


class TreeNode{
	constructor(price){
		this.price = round(price,2)  // investigate function
		this.users = new Set() // ids of users
	}
}


class VideoGame {
    constructor(title, image){
        this.title = title;
        this.image = image;
        this.buyTree = new RBTree( lowerTreeNode(a,b) )  		// Tree of TreeNode
        this.sellTree = new RBTree( greaterTreeNode(a,b) )		// Tree of TreeNode
    }

    addSellOffer(offer){

    }

    addBuyOffer(offer){
    	
    }
}


class Offer {
    constructor(userId, videoGameId, price, type) {
        this.type = type;  // 0: buy,  1: sell
        this.price = round(price);  // float
        this.videoGameId = videoGameId;
        this.userId = userId;
    }
}


var analizer = new Analizer()
analizer.addUser()
analizer.addUser()
analizer.addUser()
console.log(analizer.getUser(1))

