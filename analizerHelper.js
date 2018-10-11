const RBTree = require('bintrees').RBTree;
const utils = require('./utils');
const IdMap = utils.IdMap;




class User {
    constructor(userId, loginServiceId) {
        this._userId = userId;
        this._loginServiceId = loginServiceId;
        this._sellList = new Set(); // OfferIds
        this._buyList = new Set();  // OfferIds
    }

    getUserId(){
        return this._userId;
    }

    getLoginServiceId(){
        return this._loginServiceId;
    }

    getProperties(){

    }

    getSellList(){
        return Array.from(this._sellList);
    }

    getBuyList(){
        return Array.from(this._buyList);
    }

    addSellOffer(offerId){
        this._sellList.add(offerId);
    }

    addBuyOffer(offerId){
        this._buyList.add(offerId);
    }

    updateProperties(properties){

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
    constructor(videoGameId, title, image){
        this.BUY = 0;
        this.SELL = 1;
        this._videoGameId = videoGameId;
        this._title = title;
        this._image = image;
        this._buyTree = new RBTree( lowerTreeNode );        // Tree of TreeNode
        this._sellTree = new RBTree( greaterTreeNode );     // Tree of TreeNode
    }

    getTitle(){
        return this._title;
    }

    getImage(){
        return this._image;
    }

    getBuyTree(){
        return this._buyTree;
    }

    getSellTree(){
        return this._selTree;
    }

    getProperties(){

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

    updateProperties(properties){
        
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
    constructor(offerId, userId, videoGameId, price, type) {
        this._offerId = offerId;
        this._userId = userId;
        this._videoGameId = videoGameId;
        this._price = price  // float
        this._type = type;  // 0: buy,  1: sell
    }

    getOfferId(){
        return this._offerId;
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

    getProperties(){

    }

    updateProperties(properties){
        
    }
}


exports.User = User;
exports.TreeNode = TreeNode;
exports.VideoGame = VideoGame;
exports.Offer = Offer;
exports.IdMap = IdMap;