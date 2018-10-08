
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

    getCatalogueSize(){
        return this.catalogue.length;
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


var printBST = function(tree){
    var it = tree.iterator();
    var item;
    while( (item=it.next()) !== null) {
        console.log(item);
    }
    console.log("\n");
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
        //console.log("videogame addselloffer: ");
        //console.log(offer);
        var node = new TreeNode(offer.price);
        var res = this.sellTree.find(node);
        if( res===null){
            this.sellTree.insert(node);
        }
        this.sellTree.find(node).addOffer(offer);
        //console.log(this.sellTree);

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
        this.userId = userId;
        this.videoGameId = videoGameId;
        this.price = price  // float
        this.type = type;  // 0: buy,  1: sell
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



var testOfferAddedToBuyTrees = function(){
    var analizer = new Analizer();
    analizer.loadCatalogue();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();

    analizer.addBuyOffer(0,0,300);
    analizer.addBuyOffer(1,0,700);
    analizer.addBuyOffer(2,0,500);
    analizer.addBuyOffer(3,0,700);

    analizer.addBuyOffer(0,1,200);
    analizer.addBuyOffer(1,1,100);
    analizer.addBuyOffer(2,1,100);
   
    var prices =[ [300,500,700], [100,200] ];
    var sizes = [ [1,1,2], [2,1] ];

    var result = true;

    for(var i=0; i<analizer.getCatalogueSize(); i++ ){
        var it = analizer.getVideoGame(i).buyTree.iterator();
        var node;
        var mcount = 0;
        while( (node=it.next()) !== null ){
            if(node.price!=prices[i][mcount]){
                result = false;
                console.log("Prices differ, orignal:",prices[i][mcount],", found:",node.price);
            }

            if(node.offers.length !== sizes[i][mcount] ){
                result = false;
            }

            mcount += 1;
        }
    }
    console.log("testOfferAddedToBuyTrees : ", result);
}

var testOfferAddedToSellTrees = function(){
    var analizer = new Analizer();
    analizer.loadCatalogue();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();
    analizer.addUser();

    analizer.addSellOffer(0,0,300);
    analizer.addSellOffer(1,0,700);
    analizer.addSellOffer(2,0,500);
    analizer.addSellOffer(3,0,700);

    analizer.addSellOffer(0,1,200);
    analizer.addSellOffer(1,1,100);
    analizer.addSellOffer(2,1,100);
   
    var prices =[ [700,500,300], [200,100] ];
    var sizes = [ [2,1,1], [1,2] ];

    var result = true;

    for(var i=0; i<analizer.getCatalogueSize(); i++ ){
        var it = analizer.getVideoGame(i).sellTree.iterator();
        var node;
        var mcount = 0;
        while( (node=it.next()) !== null ){
            if(node.price!=prices[i][mcount]){
                result = false;
                console.log("Prices differ, orignal:",prices[i][mcount],", found:",node.price);
            }

            if(node.offers.length !== sizes[i][mcount] ){
                result = false;
            }

            mcount += 1;
        }
    }
    console.log("testOfferAddedToSellTrees : ", result);
}



var runTests = function(){
    testAddUsers();
    testOfferAddedToUsersLists();
    testOfferAddedToBuyTrees();
    testOfferAddedToSellTrees();
}


runTests()










