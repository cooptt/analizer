
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

    addVideoGame(title, image){
        this.catalogue.push(new VideoGame(title,image) );
    }

    getVideoGame(id) {
        return this.catalogue[id];
    }

    addSellOffer(userId, videoGameId, price) {
        var offer = new Offer(userId, videoGameId, price, 1);
        this.getUser(userId).addSellOffer(offer);
        this.getVideoGame(videoGameId).addSellOffer(offer);
    }

    addBuyOffer(userId, videoGameId, price) {
        var offer = new Offer(userId, videoGameId, price, 0);
        this.getUser(userId).addBuyOffer(offer);
        this.getVideoGame(videoGameId).addBuyOffer(offer);
    }

    deleteOffer(userId, offerId) {

    }

    deleteUser() {

    }
 
}


class User {
    constructor(id) {
        this.id = id;
        this.sellList = [] // Offer
        this.buyList = []  // Offer
    }

    addSellOffer(offer){
        this.sellList.push(offer);
    }

    addBuyOffer(offer){
        this.buyList.push(offer);
    }

    deleteSellOffer(offer){

    }
}


class TreeNode{
    constructor(price){
        this.price = price  // investigate function
        this.offers = [] // ids of users
    }

    addOffer(offer) {
        this.offers.push(offer)   
    }
}


var lowerTreeNode = function(a,b) {
    return a.price - b.price;
}

var greaterTreeNode = function(a,b) {
    return b.price - a.price;
}

class VideoGame {
    constructor(title, image){
        this.title = title;
        this.image = image;
        this.buyTree = new RBTree( lowerTreeNode );        // Tree of TreeNode
        this.sellTree = new RBTree( greaterTreeNode );     // Tree of TreeNode
    }

    addSellOffer(offer){
        var node = new TreeNode(offer.price);
        var res = this.sellTree.find(node);
        if( res===null){
            this.sellTree.insert(node);
        }
        this.sellTree.find(node).addOffer(offer);

    }

    addBuyOffer(offer){
        var node = new TreeNode(offer.price);
        var res = this.buyTree.find(node);
        if( res===null){
            this.buyTree.insert(node);
        }
        this.buyTree.find(node).addOffer(offer);
    }
}


class Offer {
    constructor(userId, videoGameId, price, type) {
        this.type = type;  // 0: buy,  1: sell
        this.price = price  // float
        this.videoGameId = videoGameId;
        this.userId = userId;
    }
}


var analizer = new Analizer()
analizer.addUser();
analizer.addVideoGame("God of War", "god_of_war.jpg");
analizer.addSellOffer(0,0,17);
analizer.addBuyOffer(0,0,18)
console.log(analizer.getUser(0))
console.log(analizer.getVideoGame(0).sellTree.min());
console.log(analizer.getVideoGame(0).buyTree.min());








