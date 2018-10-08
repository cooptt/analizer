
var RBTree = require('bintrees').RBTree;

class Analizer {

    constructor(){ 
        this.catalogue = [];
        this.users = [];
    }


    loadCatalogue(){
        this.addVideoGame("God of War", "god_of_war.jpg");
        this.addVideoGame("Halo", "halo.jpg");
        this.addVideoGame("Call of Duty", "call_of_duty.jpg");
        this.addVideoGame("Crash Bandicoot", "crass_bandicoot.jpg");
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


var basicTest = function(){
    var analizer = new Analizer()
    analizer.addUser();
    analizer.addVideoGame("God of War", "god_of_war.jpg");
    analizer.addSellOffer(0,0,17);
    analizer.addBuyOffer(0,0,18)
    console.log(analizer.getUser(0))
    console.log(analizer.getVideoGame(0).sellTree.min());
    console.log(analizer.getVideoGame(0).buyTree.min());
}


var testAddUsers = function() {
    var analizer = new Analizer();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    var result = true;
    if( analizer.users.length != 5 ){
        result = false;
    }
    console.log("testAddUsers: ",result);
}


var testOfferAddedToUsersLists = function() {
    var analizer = new Analizer();
    analizer.loadCatalogue();
    analizer.addUser();
    analizer.addBuyOffer(0,0,17);
    analizer.addBuyOffer(0,1,18);
    analizer.addBuyOffer(0,2,20);
    analizer.addSellOffer(0,2,19);
    analizer.addSellOffer(0,3,21);

    var result = true;

    if( analizer.getUser(0).buyList.length !==3){
        result = false;
    }

    if ( analizer.getUser(0).sellList.length !==2 ){
        result = false;
    }

    console.log("testOfferAddedToUsersLists: ",result);

}



var testOfferAddedToTrees = function(){
    var analizer = new Analizer();
    analizer.loadCatalogue();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();

    analizer.addBuyOffer(0,0,300);
    analizer.addBuyOffer(0,1,200);
    analizer.addSellOffer(0,2,600);
    analizer.addSellOffer(0,3,500);

    analizer.addBuyOffer(1,0,400);
    analizer.addBuyOffer(1,1,100);
    analizer.addSellOffer(1,2,300);
    analizer.addSellOffer(1,2,700);
}



testAddUsers();
testOfferAddedToUsersLists();










