

const analizerHelper = require("./analizerHelper");
const User = analizerHelper.User;
const TreeNode = analizerHelper.TreeNode;
const VideoGame = analizerHelper.VideoGame;
const Offer = analizerHelper.Offer;
const IdMap = analizerHelper.IdMap;

class Analizer {

    constructor(){ 
        this._catalogue = [];
        this._users = new IdMap();
        this._offers = new IdMap();
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
        var offer = new Offer(userId, videoGameId, price, 1);
        var offerId = this._offers.insert(offer);
        this.getUser(userId).addSellOffer(offerId);
        this.getVideoGame(videoGameId).addSellOffer(offerId, price);
    }

    addBuyOffer(userId, videoGameId, price) {
        var offer = new Offer(userId, videoGameId, price, 0);
        var offerId = this._offers.insert(offer);
        this.getUser(userId).addBuyOffer(offerId);
        this.getVideoGame(videoGameId).addBuyOffer(offerId, price);
    }

    deleteOffer(userId, offerId) {
        this.getUser(userId).deleteOffer(offerId);
    }

    deleteUser() {

    }
 
}


exports.Analizer = Analizer;
