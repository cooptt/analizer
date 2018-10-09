var RBTree = require('bintrees').RBTree;


class IdMap {

    constructor(){
        this._idcount = 0;
        this._map = new Map();
    }

    insert(item){
        this._map.set(this._idcount, item);
        this._idcount++;
        return this._idcount-1;
    }

    get(id){
        return this._map.get(id);
    }

    remove(id){
        var r = this._map.get(id);
        this._map.delete(id);
        return r;
    }

    nextId(){
        return this._idcount;
    }

    size(){
        return this._map.size;
    }
}

class User {
    constructor(userId) {
        this._id = userId;
        this._sellList = new Set(); // OfferIds
        this._buyList = new Set();  // OfferIds
    }

    addSellOffer(offerId){
        this._sellList.add(offerId);
    }

    addBuyOffer(offerId){
        this._buyList.add(offerId);
    }

    deleteOffer(offerId){
        this._sellList.delete(offerId);
        this._buyList.delete(offerId);
    }
}


class TreeNode{
    constructor(price){
        this._price = price;      // investigate function
        this._offers = new Set(); // OfferIds
    }

    addOffer(offerId) {
        this._offers.add(offerId); 
    }

    deleteOffer(offerId){
        this._offers.delete(offerId);
    }

    cmp(x) {
        return this._price - x._price;
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
    return a.cmp(b);
}

var greaterTreeNode = function(a,b) {
    return b.cmp(a);
}

class VideoGame {
    constructor(title, image){
        this.BUY = 0;
        this.SELL = 1;
        this._title = title;
        this._image = image;
        this._buyTree = new RBTree( lowerTreeNode );        // Tree of TreeNode
        this._sellTree = new RBTree( greaterTreeNode );     // Tree of TreeNode
    }

    addSellOffer(offerId, price){
        var node = new TreeNode(price);
        var res = this._sellTree.find(node);
        if( res===null){
            this._sellTree.insert(node);
        }
        var ans = this._sellTree.find(node);
        this._sellTree.find(node).addOffer(offerId);
    }

    addBuyOffer(offerId, price){
        var node = new TreeNode(price);
        var res = this._buyTree.find(node);
        if( res===null){
            this._buyTree.insert(node);
        }
        this._buyTree.find(node).addOffer(offerId);
    }

    deleteOffer(offerId, type, price){
        var node = new TreeNode(price);
        var res = null;
        if(type===this.BUY){ //Buy
            res = this._buyTree.find(node);
        }else if (type===this.SELL){
            res = this._selTree.find(node);
        }
        if( res!==null ){
            res.deleteOffer(offerId);
        }
    }
}


class Offer {
    constructor(userId, videoGameId, price, type) {
        this._userId = userId;
        this._videoGameId = videoGameId;
        this._price = price  // float
        this._type = type;  // 0: buy,  1: sell
    }

    getUserId(){
        return this._userId;
    }

    getVideoGameId(){
        return this._videoGameId;
    }

    getPrice(){
        return this._price;
    }

    getType(){
        this._type;
    }
}


exports.User = User;
exports.TreeNode = TreeNode;
exports.VideoGame = VideoGame;
exports.Offer = Offer;
exports.IdMap = IdMap;