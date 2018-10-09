

const analizerHelper = require("./analizerHelper");
const User = analizerHelper.User;
const TreeNode = analizerHelper.TreeNode;
const VideoGame = analizerHelper.VideoGame;
const Offer = analizerHelper.Offer;
const IdMap = analizerHelper.IdMap;

class Analizer {

    constructor(){ 
        this._BUY = 0;
        this._SELL = 1;
        this._catalogue = [];
        this._users = new IdMap();
        this._offers = new IdMap();
    }


    getOffer(offerId){
        return this._offers.get(offerId);
    }

    loadCatalogue(){
        this.addVideoGame("God of War", "god_of_war.jpg");
        this.addVideoGame("Halo", "halo.jpg");
        this.addVideoGame("Call of Duty", "call_of_duty.jpg");
        this.addVideoGame("Crash Bandicoot", "crass_bandicoot.jpg");
    }

    addUser() {
        this._users.insert( new User(this._users.nextId()) );
    }

    getUser(userId) {
        return this._users.get(userId);
    }

    getCatalogue() {
        return this._catalogue;
    }

    getCatalogueSize(){
        return this._catalogue.length;
    }

    addVideoGame(title, image){
        this._catalogue.push(new VideoGame(title,image) );
    }

    getVideoGame(videoGameId) {
        return this._catalogue[videoGameId];
    }

    addSellOffer(userId, videoGameId, price) {
        var offer = new Offer(userId, videoGameId, price, this._SELL);
        var offerId = this._offers.insert(offer);
        this.getUser(userId).addSellOffer(offerId);
        this.getVideoGame(videoGameId).addSellOffer(offerId, price);
    }

    addBuyOffer(userId, videoGameId, price) {
        var offer = new Offer(userId, videoGameId, price, this._BUY);
        var offerId = this._offers.insert(offer);
        this.getUser(userId).addBuyOffer(offerId);
        this.getVideoGame(videoGameId).addBuyOffer(offerId, price);
    }

    deleteOffer(offerId) {
        var offer = this.getOffer(offerId);
        this.getUser(offer.getUserId()).deleteOffer(offerId);
        this.getVideoGame(offer.getVideoGameId()).deleteOffer(offerId, offer.getType(), offer.getPrice() );
    }

    createUserOffersList(offerIdList){
        userOffersList = [];
        for(var i=0;i<offerIdList.length;i++){
            offer = this.getOffer(offerIdList[i]);
            videoGame = this.getVideoGame(offer.getVideoGameId);
            userOffersList.push({
                offerId : offer.getOfferId(),
                title : videoGame.getTitle(),
                image : videoGame.getImage(),
                price : offer.getPrice(),
            });
        }
        return userOffersList;
    }

    getUserSellList(userId){
        var user = this.getUser(userId);
        sellList = user.getSellList();
        return createUserOffersList(sellList);
    }

    deleteUser() {

    }
 
}


exports.Analizer = Analizer;
